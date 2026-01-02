import { NextRequest, NextResponse } from 'next/server';
import { JWTService, TokenPayload } from '@/utils/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'MISSING_TOKEN',
              message: 'Authorization token is required'
            }
          },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      const payload = JWTService.verifyAccessToken(token);

      if (!payload) {
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

      // Create a new request with the user information attached
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = payload;

      return handler(authenticatedReq);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTH_ERROR',
            message: 'Authentication failed'
          }
        },
        { status: 401 }
      );
    }
  };
}

export async function requireAuth(req: AuthenticatedRequest): Promise<TokenPayload> {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing authorization token');
  }

  const token = authHeader.substring(7);
  const payload = JWTService.verifyAccessToken(token);

  if (!payload) {
    throw new Error('Invalid or expired token');
  }

  return payload;
}

export async function requireRole(req: AuthenticatedRequest, requiredRole: string): Promise<TokenPayload> {
  const payload = await requireAuth(req);

  if (payload.role !== requiredRole) {
    throw new Error(`Insufficient permissions. Required role: ${requiredRole}`);
  }

  return payload;
}

export async function requireAnyRole(req: AuthenticatedRequest, allowedRoles: string[]): Promise<TokenPayload> {
  const payload = await requireAuth(req);

  if (!allowedRoles.includes(payload.role)) {
    throw new Error(`Insufficient permissions. Required roles: ${allowedRoles.join(', ')}`);
  }

  return payload;
}