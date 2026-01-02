// Database client with conditional Prisma support
// Uses real PostgreSQL in production, mock database for development

import { User } from '@/types/auth';

// Check if we have a database URL configured
const hasDatabaseUrl = !!process.env.DATABASE_URL;

// Define database operation interfaces
interface FindUniqueUserArgs {
  where: {
    email?: string;
    id?: string;
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
    role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
    isActive?: boolean;
    preferences?: {
      create?: {
        language: string;
        theme: string;
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

// Mock database implementation for development without DATABASE_URL
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

  user = {
    findUnique: (args: FindUniqueUserArgs) => {
      const { where, include } = args;
      const user = this.users.find(u =>
        (where.email && u.email === where.email) ||
        (where.id && u.id === where.id)
      );

      if (!user) return Promise.resolve(null);

      const result = {
        ...user,
        preferences: include?.preferences ?
          this.preferences.find(p => p.userId === user.id) :
          undefined
      };

      return Promise.resolve(result);
    },

    create: (args: CreateUserArgs) => {
      const { data } = args;

      const newUser: User & { password: string } = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: (data.role?.toLowerCase() || 'student') as 'student' | 'teacher' | 'admin',
        isActive: data.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: data.password,
        preferences: data.preferences?.create ? {
          language: data.preferences.create.language as 'en' | 'zh',
          theme: data.preferences.create.theme as 'light' | 'dark',
          notifications: data.preferences.create.notifications,
          studyReminder: data.preferences.create.studyReminder
        } : undefined
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

      return Promise.resolve({
        ...newUser,
        preferences: data.preferences?.create
      });
    },

    update: (args: UpdateUserArgs) => {
      const { where, data } = args;
      const userIndex = this.users.findIndex(u => u.id === where.id);

      if (userIndex === -1) return Promise.resolve(null);

      const updatedUser = {
        ...this.users[userIndex],
        ...data,
        updatedAt: new Date()
      };

      this.users[userIndex] = updatedUser as User & { password: string };

      return Promise.resolve({
        ...updatedUser,
        preferences: this.preferences.find(p => p.userId === where.id)
      });
    }
  };

  card = {
    findMany: (_args: FindManyCardsArgs) => Promise.resolve([]),
    findUnique: (_args: { where: { id: string } }) => Promise.resolve(null),
    create: (_args: unknown) => Promise.resolve(null),
    update: (_args: unknown) => Promise.resolve(null),
    delete: (_args: unknown) => Promise.resolve(null)
  };

  progress = {
    findMany: (_args: FindManyProgressArgs) => Promise.resolve([]),
    upsert: (_args: unknown) => Promise.resolve(null)
  };

  review = {
    findMany: (_args: FindManyReviewsArgs) => Promise.resolve([]),
    create: (_args: unknown) => Promise.resolve(null)
  };

  $connect = () => Promise.resolve();
  $disconnect = () => Promise.resolve();
}

// Create database client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any;

if (hasDatabaseUrl) {
  // Production: Use real Prisma client
  // Dynamic import to avoid build errors when Prisma client isn't generated
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require('@prisma/client');

    const globalForPrisma = globalThis as unknown as { prisma: typeof PrismaClient | undefined };

    prisma = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma;
    }

    console.log('✅ Connected to PostgreSQL database');
  } catch (error) {
    console.error('❌ Failed to initialize Prisma client:', error);
    console.log('⚠️ Falling back to mock database');
    prisma = new MockDatabase();
  }
} else {
  // Development: Use mock database
  prisma = new MockDatabase();
  console.log('⚠️ Using mock database. Set DATABASE_URL for PostgreSQL.');
}

export { prisma };
export default prisma;
