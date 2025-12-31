import jwt from 'jsonwebtoken'

export interface TokenPayload {
  userId: string
  iat: number
  exp: number
}

export class JWTService {
  private readonly secret: string
  private readonly refreshSecret: string
  private readonly accessTokenExpiry: string
  private readonly refreshTokenExpiry: string

  constructor() {
    this.secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production'
    this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m'
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d'
  }

  generateAccessToken(userId: string): string {
    const expiresInMinutes = this.parseExpiry(this.accessTokenExpiry)
    return jwt.sign(
      { userId },
      this.secret,
      { expiresIn: expiresInMinutes }
    )
  }

  generateRefreshToken(userId: string): string {
    const expiresInMinutes = this.parseExpiry(this.refreshTokenExpiry)
    return jwt.sign(
      { userId },
      this.refreshSecret,
      { expiresIn: expiresInMinutes }
    )
  }

  private parseExpiry(expiry: string): number {
    if (expiry.endsWith('m')) {
      return parseInt(expiry.slice(0, -1))
    } else if (expiry.endsWith('h')) {
      return parseInt(expiry.slice(0, -1)) * 60
    } else if (expiry.endsWith('d')) {
      return parseInt(expiry.slice(0, -1)) * 24 * 60
    }
    return parseInt(expiry)
  }

  verifyAccessToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload
      return decoded
    } catch (error) {
      return null
    }
  }

  verifyRefreshToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as TokenPayload
      return decoded
    } catch (error) {
      return null
    }
  }

  generateTokenPair(user: any) {
    const accessToken = this.generateAccessToken(user.id)
    const refreshToken = this.generateRefreshToken(user.id)

    const accessTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt
    }
  }
}

export const jwtService = new JWTService()