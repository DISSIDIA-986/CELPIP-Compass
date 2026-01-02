// User preferences interface
export interface UserPreferences {
  dailyGoal?: number
  theme?: 'light' | 'dark' | 'system'
  language?: string
  notifications?: boolean
}

// Authentication types
export interface User {
  id: string
  email: string
  name: string
  password: string
  role?: string
  isActive?: boolean
  preferences?: UserPreferences
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
  expiresIn: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface TokenPayload {
  userId: string
  iat: number
  exp: number
}

export interface JwtService {
  generateAccessToken(userId: string): string
  generateRefreshToken(userId: string): string
  verifyAccessToken(token: string): TokenPayload | null
  verifyRefreshToken(token: string): TokenPayload | null
}