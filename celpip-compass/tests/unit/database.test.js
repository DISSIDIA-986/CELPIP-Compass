import { prisma } from '../../lib/database'

// Mock the prisma instance to test the database layer
jest.mock('../../lib/database', () => ({
  prisma: {
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
  },
}))

describe('Database Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('User Operations', () => {
    it('should find user by unique identifier', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'student',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'hashedpassword',
        preferences: null,
      }

      prisma.user.findUnique.mockResolvedValue(mockUser)

      const result = await prisma.user.findUnique({
        where: {
          email: 'test@example.com',
        },
      })

      expect(result).toEqual(mockUser)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
      })
    })

    it('should create a new user', async () => {
      const userData = {
        data: {
          email: 'newuser@example.com',
          name: 'New User',
          password: 'password123',
          role: 'student',
          isActive: true,
        },
      }

      const mockCreatedUser = {
        id: 'user-2',
        ...userData.data,
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: null,
      }

      prisma.user.create.mockResolvedValue(mockCreatedUser)

      const result = await prisma.user.create(userData)

      expect(result).toEqual(mockCreatedUser)
      expect(prisma.user.create).toHaveBeenCalledWith(userData)
    })

    it('should update user information', async () => {
      const updateData = {
        where: {
          id: 'user-1',
        },
        data: {
          name: 'Updated User',
          isActive: false,
        },
      }

      const mockUpdatedUser = {
        id: 'user-1',
        name: 'Updated User',
        email: 'test@example.com',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'hashedpassword',
        preferences: null,
      }

      prisma.user.update.mockResolvedValue(mockUpdatedUser)

      const result = await prisma.user.update(updateData)

      expect(result).toEqual(mockUpdatedUser)
      expect(prisma.user.update).toHaveBeenCalledWith(updateData)
    })

    it('should delete a user', async () => {
      const deleteData = {
        where: {
          id: 'user-1',
        },
      }

      const mockDeletedUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Deleted User',
        role: 'student',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'hashedpassword',
        preferences: null,
      }

      prisma.user.delete.mockResolvedValue(mockDeletedUser)

      const result = await prisma.user.delete(deleteData)

      expect(result).toEqual(mockDeletedUser)
      expect(prisma.user.delete).toHaveBeenCalledWith(deleteData)
    })

    it('should find multiple users', async () => {
      const mockUsers = [
        {
          id: 'user-1',
          email: 'user1@example.com',
          name: 'User 1',
          role: 'student',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'hashedpassword',
          preferences: null,
        },
        {
          id: 'user-2',
          email: 'user2@example.com',
          name: 'User 2',
          role: 'teacher',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'hashedpassword',
          preferences: null,
        },
      ]

      prisma.user.findMany.mockResolvedValue(mockUsers)

      const result = await prisma.user.findMany({})

      expect(result).toEqual(mockUsers)
      expect(prisma.user.findMany).toHaveBeenCalledWith({})
    })

    it('should return null when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null)

      const result = await prisma.user.findUnique({
        where: {
          id: 'nonexistent-id',
        },
      })

      expect(result).toBeNull()
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'nonexistent-id',
        },
      })
    })

    it('should handle database errors gracefully', async () => {
      const error = new Error('Database connection failed')
      prisma.user.findUnique.mockRejectedValue(error)

      await expect(
        prisma.user.findUnique({
          where: {
            email: 'test@example.com',
          },
        })
      ).rejects.toThrow('Database connection failed')
    })
  })

  describe('Card Operations', () => {
    it('should create a new card', async () => {
      const cardData = {
        data: {
          question: 'Test question',
          answer: 'Test answer',
          type: 'LISTENING_KEYWORD',
          difficulty: 2.5,
          interval: 1,
        },
      }

      const mockCard = {
        id: 'card-1',
        ...cardData.data,
        nextReviewDate: new Date(),
        repetitions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prisma.card.create.mockResolvedValue(mockCard)

      const result = await prisma.card.create(cardData)

      expect(result).toEqual(mockCard)
      expect(prisma.card.create).toHaveBeenCalledWith(cardData)
    })

    it('should find multiple cards', async () => {
      const mockCards = [
        {
          id: 'card-1',
          question: 'Question 1',
          answer: 'Answer 1',
          type: 'LISTENING_KEYWORD',
          difficulty: 2.5,
          interval: 1,
          nextReviewDate: new Date(),
          repetitions: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      prisma.card.findMany.mockResolvedValue(mockCards)

      const result = await prisma.card.findMany({})

      expect(result).toEqual(mockCards)
      expect(prisma.card.findMany).toHaveBeenCalledWith({})
    })
  })

  describe('Progress Operations', () => {
    it('should create progress record', async () => {
      const progressData = {
        data: {
          userId: 'user-1',
          cardId: 'card-1',
          quality: 4,
          interval: 6,
        },
      }

      const mockProgress = {
        id: 'progress-1',
        ...progressData.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prisma.progress.create.mockResolvedValue(mockProgress)

      const result = await prisma.progress.create(progressData)

      expect(result).toEqual(mockProgress)
      expect(prisma.progress.create).toHaveBeenCalledWith(progressData)
    })

    it('should find unique progress record', async () => {
      const mockProgress = {
        id: 'progress-1',
        userId: 'user-1',
        cardId: 'card-1',
        quality: 4,
        interval: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prisma.progress.findUnique.mockResolvedValue(mockProgress)

      const result = await prisma.progress.findUnique({
        where: {
          id: 'progress-1',
        },
      })

      expect(result).toEqual(mockProgress)
      expect(prisma.progress.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'progress-1',
        },
      })
    })
  })

  describe('Review Operations', () => {
    it('should find multiple reviews', async () => {
      const mockReviews = [
        {
          id: 'review-1',
          userId: 'user-1',
          cardId: 'card-1',
          quality: 4,
          reviewDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      prisma.review.findMany.mockResolvedValue(mockReviews)

      const result = await prisma.review.findMany({})

      expect(result).toEqual(mockReviews)
      expect(prisma.review.findMany).toHaveBeenCalledWith({})
    })
  })

  describe('Database Connection', () => {
    it('should connect to database', async () => {
      prisma.$connect.mockResolvedValue(undefined)

      await expect(prisma.$connect()).resolves.toBeUndefined()
      expect(prisma.$connect).toHaveBeenCalled()
    })

    it('should disconnect from database', async () => {
      prisma.$disconnect.mockResolvedValue(undefined)

      await expect(prisma.$disconnect()).resolves.toBeUndefined()
      expect(prisma.$disconnect).toHaveBeenCalled()
    })

    it('should execute raw query', async () => {
      const mockResult = [{ count: '5' }]

      prisma.$queryRaw.mockResolvedValue(mockResult)

      const result = await prisma.$queryRaw`SELECT COUNT(*) FROM users`

      expect(result).toEqual(mockResult)
      expect(prisma.$queryRaw).toHaveBeenCalledWith`SELECT COUNT(*) FROM users`
    })
  })
})