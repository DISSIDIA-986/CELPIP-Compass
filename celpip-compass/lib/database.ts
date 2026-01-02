// Database client for development
// In a real application, you would import { PrismaClient } from '../src/generated/prisma'
// and connect to a real PostgreSQL database

import { User } from '@/types/auth';

// Mock database implementation for development
// This will be replaced with real Prisma client when database is available
// Define database operation interfaces
interface FindUniqueUserArgs {
  where: {
    email: string;
  };
  include?: {
    preferences?: boolean;
  };
}

interface CreateUserArgs {
  data: {
    email: string;
    name: string;
    password: string;
    role?: 'student' | 'teacher' | 'admin';
    isActive?: boolean;
    preferences?: {
      create?: {
        language: 'en' | 'zh';
        theme: 'light' | 'dark';
        notifications: boolean;
        studyReminder: boolean;
      };
    };
  };
}

interface UpdateUserArgs {
  where: {
    id: string;
  };
  data: {
    [key: string]: string | number | boolean | Date | null;
  };
}

interface FindManyCardsArgs {
  [key: string]: unknown;
}

interface FindManyProgressArgs {
  [key: string]: unknown;
}

interface FindManyReviewsArgs {
  [key: string]: unknown;
}

class MockDatabase {
  private users: (User & { password: string })[] = [];
  private preferences: Array<{
    id: string;
    userId: string;
    language: string;
    theme: string;
    notifications: boolean;
    studyReminder: boolean;
  }> = [];

  findUniqueUser(args: FindUniqueUserArgs) {
    const { where, include } = args;
    const user = this.users.find(u => u.email === where.email);

    if (!user) return null;

    const result = {
      ...user,
      preferences: include?.preferences ?
        this.preferences.find(p => p.userId === user.id) :
        undefined
    };

    return result;
  }

  createUser(args: CreateUserArgs) {
    const { data } = args;

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role || 'student',
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: data.password, // Add password field
      preferences: data.preferences?.create
    };

    this.users.push(newUser);

    if (data.preferences?.create) {
      this.preferences.push({
        id: `pref-${Date.now()}`,
        userId: newUser.id,
        language: data.preferences.create.language,
        theme: data.preferences.create.theme,
        notifications: data.preferences.create.notifications,
        studyReminder: data.preferences.create.studyReminder
      });
    }

    return {
      ...newUser,
      preferences: data.preferences?.create
    };
  }

  updateUser(args: UpdateUserArgs) {
    const { where, data } = args;
    const userIndex = this.users.findIndex(u => u.id === where.id);

    if (userIndex === -1) return null;

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date()
    };

    this.users[userIndex] = updatedUser;

    return {
      ...updatedUser,
      preferences: this.preferences.find(p => p.userId === where.id)
    };
  }

  findManyCards(_args: FindManyCardsArgs) {
    // Return mock cards
    return [];
  }

  findManyProgress(_args: FindManyProgressArgs) {
    // Return mock progress
    return [];
  }

  findManyReviews(_args: FindManyReviewsArgs) {
    // Return mock reviews
    return [];
  }
}

// Export a mock database for development
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = new MockDatabase() as any;

// Log that we're using mock database
console.log('⚠️ Using mock database for development. Connect to PostgreSQL for production.');