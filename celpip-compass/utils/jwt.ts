import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-min-32-chars';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN || '15');
const REFRESH_TOKEN_EXPIRES_IN = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '7') * 24 * 60 * 60; // 7 days in seconds

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class JWTService {
  static generateAccessToken(user: User): string {
    const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const options: SignOptions = {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN
    };

    return jwt.sign(payload, JWT_SECRET, options);
  }

  static generateRefreshToken(user: User): string {
    const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const options: SignOptions = {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    };

    return jwt.sign(payload, JWT_REFRESH_SECRET, options);
  }

  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      console.error('Access token verification failed');
      return null;
    }
  }

  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    } catch {
      console.error('Refresh token verification failed');
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as TokenPayload;
      if (!decoded || !decoded.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  static getTokenExpiration(token: string): Date | null {
    try {
      const decoded = jwt.decode(token) as TokenPayload;
      if (!decoded || !decoded.exp) return null;

      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }

  static revokeToken(token: string): void {
    // In a real implementation, you would add the token to a blacklist
    // For now, this is a placeholder for token revocation logic
    console.log('Token revoked:', token);
  }

  static generateTokenPair(user: User): {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
  } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    const accessTokenExpiresAt = this.getTokenExpiration(accessToken) || new Date();
    const refreshTokenExpiresAt = this.getTokenExpiration(refreshToken) || new Date();

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt
    };
  }

  // 实例方法别名 - 用于向后兼容
  generateTokenPair(user: User) {
    return JWTService.generateTokenPair(user);
  }

  verifyAccessToken(token: string) {
    return JWTService.verifyAccessToken(token);
  }

  verifyRefreshToken(token: string) {
    return JWTService.verifyRefreshToken(token);
  }
}

// 导出实例用于向后兼容
export const jwtService = new JWTService();