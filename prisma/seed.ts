import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@celpip.com' },
    update: {},
    create: {
      email: 'admin@celpip.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
      preferences: {
        create: {
          language: 'en',
          theme: 'light',
          notifications: true,
          studyReminder: true,
        },
      },
    },
  });

  // Create sample student
  const studentPassword = await bcrypt.hash('student123', 10);

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'John Student',
      password: studentPassword,
      role: 'STUDENT',
      isActive: true,
      preferences: {
        create: {
          language: 'en',
          theme: 'light',
          notifications: true,
          studyReminder: true,
        },
      },
    },
  });

  // Create sample teacher
  const teacherPassword = await bcrypt.hash('teacher123', 10);

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      name: 'Jane Teacher',
      password: teacherPassword,
      role: 'TEACHER',
      isActive: true,
      preferences: {
        create: {
          language: 'en',
          theme: 'dark',
          notifications: true,
          studyReminder: false,
        },
      },
    },
  });

  // Create sample cards
  const sampleCards = [
    {
      question: 'What is the past tense of "go"?',
      answer: 'Went',
      example: 'I went to the store yesterday.',
      translation: '我昨天去了商店。',
      difficulty: 'EASY',
      category: 'Grammar',
      userId: student.id,
    },
    {
      question: 'How do you ask for directions politely?',
      answer: 'Could you please tell me how to get to...?',
      example: 'Could you please tell me how to get to the nearest subway station?',
      translation: '您能告诉我去最近的地铁站怎么走吗？',
      difficulty: 'MEDIUM',
      category: 'Conversation',
      userId: student.id,
    },
    {
      question: 'What is the difference between "borrow" and "lend"?',
      answer: 'Borrow means to take something temporarily, lend means to give something temporarily.',
      example: 'Can I borrow your pen? / Can I lend you my pen?',
      translation: 'Borrow是"借入"，Lend是"借出"。',
      difficulty: 'HARD',
      category: 'Vocabulary',
      userId: student.id,
    },
  ];

  for (const card of sampleCards) {
    await prisma.card.create({
      data: card,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('Users created:');
  console.log(`- Admin: admin@celpip.com / admin123`);
  console.log(`- Student: student@example.com / student123`);
  console.log(`- Teacher: teacher@example.com / teacher123`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });