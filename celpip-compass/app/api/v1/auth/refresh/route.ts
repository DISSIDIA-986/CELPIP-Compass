import { NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@/utils/jwt';
import { User, AuthResponse, ApiResponse } from '@/types/auth';

// Create JWT service instance
const jwtService = new JWTService();

// Mock user database - in real app, this would be PostgreSQL
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    password: 'hashed-password-1', // In real app, this would be bcrypt hashed
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true,
      studyReminder: true
    }
  },
  {
    id: '2',
    email: 'teacher@example.com',
    name: 'Jane Teacher',
    password: 'hashed-password-2', // In real app, this would be bcrypt hashed
    role: 'teacher',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    preferences: {
      language: 'en',
      theme: 'dark',
      notifications: true,
      studyReminder: false
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie or body
    const refreshToken =
      request.cookies.get('refreshToken')?.value ||
      await request.json().then(body => body.refreshToken);

    if (!refreshToken) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'MISSING_REFRESH_TOKEN',
          message: 'Refresh token is required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Verify refresh token
    const payload = jwtService.verifyRefreshToken(refreshToken);

    if (!payload) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid or expired refresh token'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Check if user exists and is active
    const user = mockUsers.find(u => u.id === payload.userId);

    if (!user || !user.isActive) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found or account is disabled'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      jwtService.generateTokenPair(user);

    // Set secure cookies for new tokens
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
            preferences: user.preferences
          },
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn: Math.floor((accessTokenExpiresAt.getTime() - Date.now()) / 1000)
        }
      },
      { status: 200 }
    );

    // Update refresh token cookie
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: refreshTokenExpiresAt
    });

    // Update session cookie
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

    // Revoke old refresh token (in real app, you'd add it to a blacklist)
    // jwtService.revokeToken(refreshToken);

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
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