import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { JWTService } from '@/utils/jwt';
import { prisma } from '@/lib/database';
import { RegisterRequest, AuthResponse, ApiResponse } from '@/types/auth';

// Use RegisterRequest directly - preferences are already optional in the base interface
type RegisterRequestBody = RegisterRequest;

// Create JWT service instance
const jwtService = new JWTService();

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequestBody = await request.json();

    // Validate request body
    if (!body.email || !body.password || !body.name) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Email, password, and name are required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_EMAIL',
          message: 'Invalid email format'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate password strength
    if (body.password.length < 8) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'WEAK_PASSWORD',
          message: 'Password must be at least 8 characters long'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email.toLowerCase()
      }
    });

    if (existingUser) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'User with this email already exists'
        }
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(body.password, 10);

    // Create new user with transaction
    const newUser = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        name: body.name,
        password: hashedPassword,
        role: 'student', // Default role
        isActive: true,
        preferences: {
          create: {
            language: body.preferences?.language || 'en',
            theme: body.preferences?.theme || 'light',
            notifications: body.preferences?.notifications ?? true,
            studyReminder: body.preferences?.studyReminder ?? true
          }
        }
      },
      include: {
        preferences: true
      }
    });

    // Generate tokens
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      jwtService.generateTokenPair(newUser);

    // Set secure cookie for refresh token
    const response = NextResponse.json<ApiResponse<AuthResponse>>(
      {
        success: true,
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            isActive: newUser.isActive,
            preferences: newUser.preferences || {
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
      { status: 201 }
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
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
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
    console.error('Registration error:', error);
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