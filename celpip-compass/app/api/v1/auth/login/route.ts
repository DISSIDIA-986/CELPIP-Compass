import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { JWTService } from '@/utils/jwt';
import { prisma } from '@/lib/database';
import { LoginRequest, AuthResponse, ApiResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validate request body
    if (!body.email || !body.password) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Email and password are required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find user by email (case-insensitive)
    const user = prisma.findUniqueUser({
      where: {
        email: body.email.toLowerCase()
      },
      include: {
        preferences: true
      }
    });

    if (!user) {
      // Don't reveal if user exists for security
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    if (!user.isActive) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'ACCOUNT_DISABLED',
          message: 'Account is disabled'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate tokens
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      JWTService.generateTokenPair(user);

    // Set secure cookie for refresh token (if rememberMe is true)
    const response = NextResponse.json<ApiResponse<AuthResponse>>(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isActive: user.isActive,
            preferences: user.preferences || {
              language: 'en',
              theme: 'light',
              notifications: true,
              studyReminder: true
            }
          },
          accessToken,
          refreshToken,
          expiresIn: Math.floor((accessTokenExpiresAt.getTime() - Date.now()) / 1000)
        }
      },
      { status: 200 }
    );

    // Set refresh token in HttpOnly cookie for security
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: refreshTokenExpiresAt
    });

    // Set session cookie
    response.cookies.set('session', JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      expiresAt: accessTokenExpiresAt
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: accessTokenExpiresAt
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    };
    return NextResponse.json(response, { status: 500 });
  }
}