import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';
import { prisma } from '@/lib/database';
import { User, ApiResponse } from '@/types/auth';

// Get current user information
const getUserHandler = async (request: AuthenticatedRequest) => {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_TOKEN',
            message: 'Access token required'
          }
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Mock user data - in a real app, this would come from JWT verification
    const mockUserId = token === 'valid-mock-token' ? 'user-123' : null;

    if (!mockUserId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired access token'
          }
        },
        { status: 401 }
      );
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: mockUserId },
      include: { preferences: true }
    });

    if (!user) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      };
      return NextResponse.json(response, { status: 404 });
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

    return NextResponse.json<ApiResponse<{
      user: Omit<User, 'password'>;
      sessionInfo: {
        isValid: boolean;
        issuedAt: Date;
        expiresAt?: Date;
      };
    }>>(
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
          sessionInfo: {
            isValid: true,
            issuedAt: new Date(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
          }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
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

// Update user information
const updateUserHandler = async (request: AuthenticatedRequest) => {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_TOKEN',
            message: 'Access token required'
          }
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Mock user data - in a real app, this would come from JWT verification
    const mockUserId = token === 'valid-mock-token' ? 'user-123' : null;

    if (!mockUserId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired access token'
          }
        },
        { status: 401 }
      );
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: mockUserId },
      include: { preferences: true }
    });

    if (!user) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Get update data from request body
    const updateData = await request.json();

    // Validate update data
    const allowedUpdates = ['name', 'preferences'];
    const updates = Object.keys(updateData).filter(
      key => allowedUpdates.includes(key)
    );

    if (updates.length === 0) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'NO_UPDATES',
          message: 'No valid fields to update'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Prepare update data
    const updateUserData: { name?: string } = {};
    let updatePreferencesData: {
      language?: string;
      theme?: string;
      notifications?: boolean;
      studyReminder?: boolean;
    } | null = null;

    if (updates.includes('name')) {
      updateUserData.name = updateData.name;
    }

    if (updates.includes('preferences') && updateData.preferences) {
      updatePreferencesData = {
        ...(user.preferences || {}),
        ...updateData.preferences
      };
    }

    // Update user with transaction
    await prisma.user.update({
      where: { id: mockUserId },
      data: {
        ...updateUserData,
        ...(updatePreferencesData && {
          preferences: {
            upsert: {
              create: updatePreferencesData,
              update: updatePreferencesData
            }
          }
        })
      },
      include: { preferences: true }
    });

    // Find updated user
    const updatedUser = await prisma.user.findUnique({
      where: { id: mockUserId },
      include: { preferences: true }
    });

    if (!updatedUser) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found after update'
        }
      };
      return NextResponse.json(response, { status: 404 });
    }

    return NextResponse.json<ApiResponse<{
      user: Omit<User, 'password'>;
      updatedAt: Date;
    }>>(
      {
        success: true,
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            isActive: updatedUser.isActive,
            preferences: updatedUser.preferences
          },
          updatedAt: updatedUser.updatedAt
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update user error:', error);
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

// Export wrapped handlers with auth middleware
export const GET = withAuth(getUserHandler);
export const PUT = withAuth(updateUserHandler);