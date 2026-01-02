import { User, RegisterRequest, AuthResponse } from '@/types/auth';

export class AuthService {
  private static mockUsers: User[] = [
    {
      id: '1',
      email: 'student@example.com',
      name: 'John Student',
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

  private static mockPasswords: Record<string, string> = {
    '1': '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVYITi', // password: password123
    '2': '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVYITi' // password: password123
  };

  static async login(email: string, password: string): Promise<AuthResponse | null> {
    try {
      // Find user by email (case-insensitive)
      const user = this.mockUsers.find(u =>
        u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user || !user.isActive) {
        return null;
      }

      // Verify password
      const isPasswordValid = await this.comparePassword(password);

      if (!isPasswordValid) {
        return null;
      }

      // Generate tokens (this would be done on the server)
      return {
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
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 900 // 15 minutes
      };
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse | null> {
    try {
      // Check if user already exists
      const existingUser = this.mockUsers.find(u =>
        u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        return null;
      }

      // Create new user
      const newUser: User = {
        id: (this.mockUsers.length + 1).toString(),
        email: userData.email,
        name: userData.name,
        role: 'student', // Default role
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        preferences: userData.preferences || {
          language: 'en',
          theme: 'light',
          notifications: true,
          studyReminder: true
        }
      };

      // Save user to mock database
      this.mockUsers.push(newUser);
      this.mockPasswords[newUser.id] = await this.hashPassword(userData.password);

      return {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          isActive: newUser.isActive,
          preferences: newUser.preferences
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 900 // 15 minutes
      };
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  static async getCurrentUser(userId: string): Promise<User | null> {
    const user = this.mockUsers.find(u => u.id === userId);
    return user ? { ...user } : null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.mockUsers.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...this.mockUsers[userIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.mockUsers[userIndex] = updatedUser;
    return { ...updatedUser };
  }

  static async logout(refreshToken: string): Promise<void> {
    // In a real implementation, you would revoke the refresh token
    console.log('Logout with refresh token:', refreshToken);
  }

  private static async hashPassword(password: string): Promise<string> {
    // Mock password hashing - in real app, use bcryptjs
    console.log('Hashing password for:', password);
    return `hashed-${password}`;
  }

  private static async comparePassword(password: string): Promise<boolean> {
    // Mock password comparison - in real app, use bcryptjs
    return password === 'password123'; // For demo purposes
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}