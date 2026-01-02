// Create a mock Prisma client for development
// In a real app, this would connect to PostgreSQL
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  card: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  progress: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  learningPlan: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  flashcardSet: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}

// For development, use the mock
export const prisma = mockPrisma

export default prisma