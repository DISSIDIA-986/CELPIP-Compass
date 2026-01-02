import { PrismaClient } from '@prisma/client'

// Create a mock Prisma client for testing
const createMockPrisma = () => ({
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
  // Add more mock methods as needed
})

export const prisma = createMockPrisma()
export default prisma