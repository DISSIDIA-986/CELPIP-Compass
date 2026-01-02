import { AuthService } from '../../src/services/auth-service';
import jwt from 'jsonwebtoken';

// Create a mock prisma instance
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  card: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  progress: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  review: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $use: jest.fn(),
  $transaction: jest.fn(),
  $on: jest.fn(),
  $executeRaw: jest.fn(),
  $queryRaw: jest.fn(),
  $executeRawUnsafe: jest.fn(),
  $queryRawUnsafe: jest.fn(),
}

// Mock the path alias and database module
jest.mock('@/lib/database', () => ({
  ...mockPrisma,
  __esModule: true,
  default: mockPrisma,
}));

// Get the mocked database
const mockedDatabase = require('@/lib/database');
const { prisma } = mockedDatabase;

describe('Authentication Service', () => {
  let authService

  beforeEach(() => {
    // Create a new instance for each test
    authService = new AuthService()
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Email Validation', () => {
    it('should validate correct email format', () => {
      expect(authService.validateEmail('test@example.com')).toBe(true);
      expect(authService.validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email format', () => {
      expect(authService.validateEmail('invalid-email')).toBe(false);
      expect(authService.validateEmail('test@')).toBe(false);
      expect(authService.validateEmail('@domain.com')).toBe(false);
      expect(authService.validateEmail('')).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should accept strong password', () => {
      const result = authService.validatePassword('Password123!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject short password', () => {
      const result = authService.validatePassword('123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('should reject password without uppercase', () => {
      const result = authService.validatePassword('password123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without lowercase', () => {
      const result = authService.validatePassword('PASSWORD123!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject password without number', () => {
      const result = authService.validatePassword('Password!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject password without special character', () => {
      const result = authService.validatePassword('Password123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character (!@#$%^&*)');
    });
  });

  describe('Password Hashing and Comparison', () => {
    it('should hash password correctly', async () => {
      const password = 'Password123!';
      const hash = await authService.hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0); // Should have some hash
    });

    it('should compare password correctly', async () => {
      const password = 'Password123!';
      const hash = await authService.hashPassword(password);

      const isValid = await authService.comparePassword(password, hash);
      expect(isValid).toBe(true);

      const isInvalid = await authService.comparePassword('wrongpassword', hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('Token Generation and Verification', () => {
    it('should generate access token', () => {
      const token = authService.generateAccessToken('user-123');
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should generate refresh token', () => {
      const token = authService.generateRefreshToken('user-123');
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify valid access token', () => {
      const token = authService.generateAccessToken('user-123');
      const decoded = authService.verifyAccessToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe('user-123');
    });

    it('should reject invalid access token', () => {
      const decoded = authService.verifyAccessToken('invalid-token');
      expect(decoded).toBeNull();
    });

    it('should handle expired access token', async () => {
      // Create a token that expires immediately
      process.env.JWT_SECRET = 'test-secret';
      const token = jwt.sign({ userId: 'user-123' }, 'test-secret', { expiresIn: '0ms' });

      // Wait for token to expire
      await new Promise(resolve => setTimeout(resolve, 10));

      const decoded = authService.verifyAccessToken(token);
      expect(decoded).toBeNull();
    });
  });

  describe('Login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        password: '$2a$10$hashedpassword',
      };

      const hashedPassword = await authService.hashPassword(loginData.password);
      const userWithHash = { ...mockUser, password: hashedPassword };

      prisma.user.findUnique.mockResolvedValue(userWithHash);

      const result = await authService.login(loginData);

      expect(result.user.id).toBe('user-1');
      expect(result.user.email).toBe('test@example.com');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user.password).toBeUndefined();
    });

    it('should reject invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      prisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.login(loginData)).rejects.toThrow('Invalid credentials');
    });

    it('should reject wrong password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        password: '$2a$10$hashedpassword',
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(authService.login(loginData)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('Register', () => {
    it('should register new user', async () => {
      const registerData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'Password123!',
      };

      const mockUser = {
        id: 'user-2',
        email: registerData.email,
        name: registerData.name,
        password: 'hashedpassword',
      };

      prisma.user.findUnique.mockResolvedValue(null); // No existing user
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await authService.register(registerData);

      expect(result.user.id).toBe('user-2');
      expect(result.user.email).toBe(registerData.email);
      expect(result.user.name).toBe(registerData.name);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      const registerData = {
        email: 'existing@example.com',
        name: 'Existing User',
        password: 'Password123!',
      };

      prisma.findUnique.mockResolvedValue({ id: 'user-1', email: registerData.email });

      await expect(authService.register(registerData)).rejects.toThrow('User with this email already exists');
    });

    it('should reject invalid email', async () => {
      const registerData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'Password123!',
      };

      await expect(authService.register(registerData)).rejects.toThrow('Invalid email format');
    });

    it('should reject weak password', async () => {
      const registerData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'weak',
      };

      await expect(authService.register(registerData)).rejects.toThrow('Password validation failed');
    });
  });

  describe('Token Refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const refreshToken = authService.generateRefreshToken('user-123');
      const newToken = await authService.refreshToken(refreshToken);

      expect(newToken.accessToken).toBeDefined();
      expect(typeof newToken.accessToken).toBe('string');
    });

    it('should reject invalid refresh token', async () => {
      await expect(authService.refreshToken('invalid-token')).rejects.toThrow('Invalid refresh token');
    });
  });
});