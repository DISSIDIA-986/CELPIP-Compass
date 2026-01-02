import { NextRequest, NextResponse } from 'next/server'

// Extended request interface that includes user information
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role?: string
  }
}

// Authentication middleware factory
export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Get the access token from the Authorization header
      const authHeader = req.headers.get('authorization')

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
        )
      }

      const token = authHeader.substring(7) // Remove 'Bearer ' prefix

      // In a real implementation, you would verify the JWT token here
      // For now, we'll just extract the user ID from a mock payload
      // TODO: Implement actual JWT verification with the JWT service

      // Mock user data - in a real app, this would come from token verification
      const mockUserId = token === 'valid-mock-token' ? 'user-123' : null

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
        )
      }

      // Create extended request with user information
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.user = {
        id: mockUserId,
        email: 'mock@example.com',
        role: 'user'
      }

      // Call the original handler with the authenticated request
      return await handler(authenticatedReq)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTH_ERROR',
            message: 'Authentication failed'
          }
        },
        { status: 401 }
      )
    }
  }
}