import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/database'

export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  accessToken: string
  refreshToken: string
}

export class AuthService {
  private readonly JWT_SECRET: string
  private readonly REFRESH_TOKEN_SECRET: string
  private readonly ACCESS_TOKEN_EXPIRY: string
  private readonly REFRESH_TOKEN_EXPIRY: string

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key'
    this.ACCESS_TOKEN_EXPIRY = '15m'
    this.REFRESH_TOKEN_EXPIRY = '7d'
  }

  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  /**
   * Compare a password with a hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * Generate an access token
   */
  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: this.ACCESS_TOKEN_EXPIRY })
  }

  /**
   * Generate a refresh token
   */
  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRY })
  }

  /**
   * Verify an access token
   */
  verifyAccessToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as { userId: string }
    } catch {
      return null
    }
  }

  /**
   * Verify a refresh token
   */
  verifyRefreshToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as { userId: string }
    } catch {
      return null
    }
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validate password strength
   */
  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Validate input
    if (!this.validateEmail(userData.email)) {
      throw new Error('Invalid email format')
    }

    const passwordValidation = this.validatePassword(userData.password)
    if (!passwordValidation.isValid) {
      throw new Error(`Password validation failed: ${passwordValidation.errors.join(', ')}`)
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password and create user
    const hashedPassword = await this.hashPassword(userData.password)
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
      },
    })

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id)
    const refreshToken = this.generateRefreshToken(user.id)

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    }
  }

  /**
   * Login user with credentials
   */
  async login(loginData: LoginRequest): Promise<AuthResponse> {
    // Validate input
    if (!this.validateEmail(loginData.email)) {
      throw new Error('Invalid email format')
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(loginData.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user.id)
    const refreshToken = this.generateRefreshToken(user.id)

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const decoded = this.verifyRefreshToken(refreshToken)

    if (!decoded) {
      throw new Error('Invalid refresh token')
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const newAccessToken = this.generateAccessToken(user.id)

    return { accessToken: newAccessToken }
  }

  /**
   * Logout user (revoke refresh token)
   */
  async logout(userId: string): Promise<void> {
    // In a real implementation, you would store revoked tokens in Redis
    // For now, this is a placeholder
    console.log(`User ${userId} logged out`)
  }
}

export const authService = new AuthService()