import { PrismaClient, CardType, DifficultyLevel, CardStatus, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // =============================================
  // Seed Users
  // =============================================
  console.log('Creating users...')

  const adminPassword = await bcrypt.hash('admin123', 10)
  const studentPassword = await bcrypt.hash('student123', 10)
  const teacherPassword = await bcrypt.hash('teacher123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@celpip.com' },
    update: {},
    create: {
      email: 'admin@celpip.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN,
      isActive: true,
      preferences: {
        create: {
          language: 'en',
          theme: 'light',
          notifications: true,
          studyReminder: true,
          dailyGoal: 30,
        },
      },
    },
  })

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'John Student',
      password: studentPassword,
      role: Role.STUDENT,
      isActive: true,
      preferences: {
        create: {
          language: 'zh',
          theme: 'light',
          notifications: true,
          studyReminder: true,
          dailyGoal: 20,
        },
      },
    },
  })

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      name: 'Jane Teacher',
      password: teacherPassword,
      role: Role.TEACHER,
      isActive: true,
      preferences: {
        create: {
          language: 'en',
          theme: 'dark',
          notifications: true,
          studyReminder: false,
          dailyGoal: 60,
        },
      },
    },
  })

  console.log(`Created users: ${admin.email}, ${student.email}, ${teacher.email}`)

  // =============================================
  // Seed Sample Cards
  // =============================================
  console.log('Creating sample flashcards...')

  const sampleCards = [
    // === Writing Task 1: Email Writing ===
    {
      type: CardType.WRITING_TASK1,
      title: '向邻居投诉噪音问题',
      scenario: '邻居在夜间产生过多噪音，影响你的休息',
      tone: 'semi-formal',
      difficulty: DifficultyLevel.CLB8,
      status: CardStatus.NEW,
      essentialPhrases: {
        opening: [
          'I hope this message finds you well.',
          "I'm writing to discuss a matter that's been concerning me.",
          'I would appreciate it if we could address this issue.'
        ],
        purpose: [
          'The main reason for my message is to address the noise issue.',
          'I wanted to bring to your attention the excessive noise during evenings.',
          'My concern is about the disturbance this is causing.'
        ],
        details: [
          'The noise typically starts around 10 PM and continues until midnight.',
          "It's making it difficult for me to sleep and focus during work.",
          "I've noticed this has been happening for the past two weeks."
        ],
        closing: [
          'I would be grateful if we could find a solution to this matter.',
          'Thank you for your understanding and cooperation.',
          'I look forward to your response.'
        ]
      },
      upgrades: {
        vocabulary: {
          'noisy': ['excessive', 'disturbing', 'intrusive'],
          'problem': ['issue', 'concern', 'matter'],
          'make': ['cause', 'result in', 'lead to'],
          'stop': ['cease', 'discontinue', 'terminate']
        },
        structure: {
          "I'm worried about the noise.": "I'm deeply concerned about the excessive noise that has been occurring.",
          'Can you stop it?': 'I would greatly appreciate it if you could take measures to reduce the noise levels.',
          'This is annoying me.': 'This situation has become increasingly disruptive to my daily life.'
        }
      },
      practice: {
        question: 'Write an email to your neighbor about noise disturbance during evenings.',
        keyPoints: ['specific times', 'impact on you', 'requested solution', 'polite tone']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },
    {
      type: CardType.WRITING_TASK1,
      title: '请求维修公寓设施',
      scenario: '公寓的空调出现问题，需要及时维修',
      tone: 'formal',
      difficulty: DifficultyLevel.CLB9,
      status: CardStatus.NEW,
      essentialPhrases: {
        opening: [
          'Dear Property Manager,',
          'I am writing to report an issue with the air conditioning in my apartment.',
          'I would like to request maintenance services as soon as possible.'
        ],
        purpose: [
          'The air conditioning unit in my apartment has stopped functioning properly.',
          'This issue requires immediate attention due to the hot weather.',
          'I would like to schedule a repair appointment at your earliest convenience.'
        ],
        details: [
          'The AC unit is not blowing cold air and makes unusual noises.',
          'This problem started three days ago and has worsened since then.',
          'The temperature in my apartment has become uncomfortably high.'
        ],
        closing: [
          'Please contact me to arrange a time for your maintenance team to visit.',
          'Thank you for your prompt attention to this matter.',
          'I look forward to your response.'
        ]
      },
      upgrades: {
        vocabulary: {
          'broken': ['malfunctioning', 'defective', 'out of order'],
          'fix': ['repair', 'service', 'maintain'],
          'urgent': ['pressing', 'critical', 'immediate'],
          'appoint': ['schedule', 'arrange', 'set']
        },
        structure: {
          'The AC is broken.': 'The air conditioning unit has completely malfunctioned and requires professional repair.',
          'Please fix it soon.': 'I would appreciate it if you could arrange for maintenance services to be carried out promptly.',
          "It's very hot.": 'The current temperature conditions have made this situation increasingly uncomfortable.'
        }
      },
      practice: {
        question: 'Write an email to your property manager requesting AC repair.',
        keyPoints: ['problem description', 'urgency', 'requested action', 'contact information']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },

    // === Writing Task 2: Opinion Essay ===
    {
      type: CardType.WRITING_TASK2,
      title: '远程工作的优势',
      scenario: '讨论远程工作对员工和雇主的积极影响',
      tone: 'neutral',
      difficulty: DifficultyLevel.CLB8,
      status: CardStatus.NEW,
      essentialPhrases: {
        introduction: [
          'The concept of remote work has revolutionized traditional employment patterns.',
          'Working from home presents numerous compelling advantages for both employees and employers.',
          'This essay will explore the multifaceted benefits of telecommuting arrangements.'
        ],
        topicSentence: [
          'One primary advantage of remote work is the significant enhancement of work-life balance.',
          'The flexibility inherent in home-based employment contributes substantially to job satisfaction.',
          'From a productivity perspective, remote work offers unparalleled advantages.'
        ],
        supporting: [
          'Employees gain the ability to structure their day according to personal productivity peaks.',
          'The elimination of commuting time translates into substantial work-life improvements.',
          'Family responsibilities can be managed more effectively alongside professional commitments.'
        ],
        examples: [
          "For instance, parents can attend to children's needs without sacrificing work performance.",
          'A notable example is the increased time available for exercise and leisure activities.',
          'Studies have shown that remote workers report 25% higher satisfaction levels.'
        ],
        conclusion: [
          'In conclusion, the advantages of working from home extend beyond individual benefits.',
          'Therefore, organizations should consider implementing flexible work policies.',
          'Ultimately, remote work represents a paradigm shift in modern employment practices.'
        ]
      },
      upgrades: {
        vocabulary: {
          'good': ['advantageous', 'beneficial', 'favorable'],
          'important': ['crucial', 'essential', 'vital'],
          'many': ['numerous', 'multiple', 'abundant'],
          'flexibility': ['adaptability', 'versatility', 'pliability']
        },
        structure: {
          'Remote work is good.': 'Remote work offers substantial advantages for both employees and employers.',
          'It is important because...': 'This aspect is particularly significant due to its multifaceted impact on various stakeholders.',
          'Many people think...': 'Consequently, an increasing number of organizations are embracing this approach.'
        }
      },
      practice: {
        question: 'What are the advantages of working from home?',
        keyPoints: ['work-life balance', 'productivity', 'cost savings', 'flexibility']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },
    {
      type: CardType.WRITING_TASK2,
      title: '保护环境的重要性',
      scenario: '论述环境保护对可持续发展的重要性',
      tone: 'neutral',
      difficulty: DifficultyLevel.CLB9,
      status: CardStatus.NEW,
      essentialPhrases: {
        introduction: [
          'Environmental protection has emerged as one of the most pressing issues of our time.',
          'The preservation of our natural environment is crucial for the well-being of future generations.',
          'This essay examines the critical importance of environmental conservation for sustainable development.'
        ],
        topicSentence: [
          'First and foremost, environmental protection is essential for maintaining biodiversity.',
          'Furthermore, clean natural resources are fundamental to human health and survival.',
          'From an economic perspective, environmental sustainability offers long-term benefits.'
        ],
        supporting: [
          'The delicate balance of ecosystems supports all forms of life on Earth.',
          'Pollution and habitat destruction have reached unprecedented levels globally.',
          'Sustainable practices can help mitigate the adverse effects of climate change.'
        ],
        examples: [
          'For example, countries with strong environmental policies enjoy better public health outcomes.',
          'A compelling case is the rapid transition to renewable energy sources.',
          'Successful conservation efforts have demonstrated the feasibility of environmental protection.'
        ],
        conclusion: [
          'In summary, environmental protection represents a moral imperative for humanity.',
          'Therefore, immediate and concerted action is required from all sectors of society.',
          'Ultimately, our environmental stewardship will define our legacy to future generations.'
        ]
      },
      upgrades: {
        vocabulary: {
          'important': ['essential', 'critical', 'imperative'],
          'protect': ['conserve', 'preserve', 'safeguard'],
          'environment': ['ecosystem', 'habitat', 'natural world'],
          'future': ['subsequent', 'ensuing', 'prospective']
        },
        structure: {
          'Protecting the environment is important.': 'Environmental conservation represents a fundamental responsibility for all societies.',
          'We must act now because...': 'The urgency of this matter cannot be overstated given the rapidly deteriorating environmental conditions.',
          'This will help our future.': 'Such proactive measures will ensure a sustainable and habitable planet for generations to come.'
        }
      },
      practice: {
        question: 'Why is environmental protection important for sustainable development?',
        keyPoints: ['biodiversity', 'human health', 'economic benefits', 'future generations']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },

    // === Speaking Task ===
    {
      type: CardType.SPEAKING_TASK,
      title: '描述一次难忘的旅行经历',
      scenario: 'Speaking Task 5 - 描述个人经历',
      tone: 'informal',
      difficulty: DifficultyLevel.CLB7,
      status: CardStatus.NEW,
      essentialPhrases: {
        introduction: [
          'I would like to describe a memorable trip I took last year.',
          'One of the most memorable experiences in my life was my trip to Japan.',
          'This journey was particularly special because of the cultural experiences I had.'
        ],
        details: [
          'The most impressive aspect was visiting the ancient temples in Kyoto.',
          'What struck me most was the perfect blend of tradition and modernity.',
          'I was particularly fascinated by the Japanese approach to efficiency and precision.'
        ],
        feelings: [
          'I felt a sense of awe throughout my entire journey.',
          'The experience left me with a deep appreciation for different cultures.',
          'I came away feeling inspired and enriched by the experience.'
        ],
        conclusion: [
          'Overall, this trip was a transformative experience for me.',
          'The memories I made during this journey will stay with me forever.',
          'I would highly recommend this destination to anyone seeking cultural enrichment.'
        ]
      },
      upgrades: {
        vocabulary: {
          'beautiful': ['breathtaking', 'stunning', 'magnificent'],
          'interesting': ['fascinating', 'captivating', 'engaging'],
          'learned': ['discovered', 'acquired', 'gained'],
          'remember': ['cherish', 'treasure', 'value']
        },
        structure: {
          'It was very beautiful.': 'The scenery was absolutely breathtaking, with a perfect harmony of natural and man-made beauty.',
          'I learned a lot.': 'This experience provided me with invaluable insights into a different way of life and thinking.',
          'I will never forget it.': 'The memories and lessons from this journey have become an integral part of who I am.'
        }
      },
      practice: {
        question: 'Describe a memorable trip you have taken.',
        keyPoints: ['destination', 'experiences', 'feelings', 'impact']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },
    {
      type: CardType.SPEAKING_TASK,
      title: '讨论科技对日常生活的影响',
      scenario: 'Speaking Task 3 - 讨论观点',
      tone: 'neutral',
      difficulty: DifficultyLevel.CLB8,
      status: CardStatus.NEW,
      essentialPhrases: {
        introduction: [
          'Technology has transformed the way we live in countless ways.',
          'The impact of technology on our daily lives has been both profound and pervasive.',
          'I would like to discuss how technology has specifically affected modern living.'
        ],
        positiveAspects: [
          'Firstly, technology has made communication incredibly convenient and instant.',
          'Technology has also revolutionized access to information and education.',
          'Furthermore, modern technology has streamlined countless daily tasks.'
        ],
        negativeAspects: [
          'On the other hand, technology has led to decreased face-to-face interaction.',
          'There are also concerns about privacy and data security in the digital age.',
          'Many people argue that technology has contributed to a more sedentary lifestyle.'
        ],
        conclusion: [
          'In conclusion, technology represents a double-edged sword in modern life.',
          'The key is to find a healthy balance between technological benefits and human connection.',
          'Ultimately, technology should enhance rather than replace human experiences.'
        ]
      },
      upgrades: {
        vocabulary: {
          'change': ['transform', 'revolutionize', 'alter'],
          'good': ['beneficial', 'advantageous', 'positive'],
          'bad': ['detrimental', 'harmful', 'negative'],
          'balance': ['equilibrium', 'harmony', 'moderation']
        },
        structure: {
          'Technology changed my life.': 'Technology has fundamentally reshaped nearly every aspect of modern existence.',
          'It has good and bad sides.': 'While technology offers numerous benefits, it also presents significant challenges that must be addressed.',
          'We need balance.': 'Finding the appropriate balance between technological advancement and human values is crucial for our future.'
        }
      },
      practice: {
        question: 'Discuss how technology has changed daily life.',
        keyPoints: ['communication', 'information access', 'daily tasks', 'social impact']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },

    // === Listening Keyword ===
    {
      type: CardType.LISTENING_KEYWORD,
      title: '购物场景关键词',
      scenario: '听力对话中购物相关的关键词和表达',
      tone: 'neutral',
      difficulty: DifficultyLevel.CLB7,
      status: CardStatus.NEW,
      essentialPhrases: {
        price: [
          'How much does this cost?',
          'Is this on sale?',
          'Can you give me a discount?',
          "That's over my budget."
        ],
        size: [
          'Do you have this in a larger size?',
          'This is too tight/loose.',
          "What's the waist measurement?",
          'Does it come in different sizes?'
        ],
        quality: [
          'Is this made of real leather?',
          'How durable is this product?',
          "What's the return policy?",
          'Can I try it on first?'
        ],
        payment: [
          'Do you accept credit cards?',
          'Can I pay by installments?',
          'Is there a delivery charge?',
          'Can you gift-wrap this for me?'
        ]
      },
      upgrades: {
        vocabulary: {
          'expensive': ['costly', 'pricey', 'high-priced'],
          'cheap': ['inexpensive', 'affordable', 'economical'],
          'buy': ['purchase', 'acquire', 'obtain'],
          'money': ['funds', 'budget', 'finances']
        },
        structure: {
          'How much is it?': 'Could you please inform me about the current price of this item?',
          "It's too expensive.": 'Unfortunately, this exceeds my predetermined budget limit.',
          "I'll think about it.": 'I would like to consider this option further before making a final decision.'
        }
      },
      practice: {
        question: 'Listen for keywords related to shopping and price negotiation.',
        keyPoints: ['price inquiry', 'size questions', 'quality concerns', 'payment methods']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },
    {
      type: CardType.LISTENING_KEYWORD,
      title: '工作面试关键词',
      scenario: '听力对话中工作面试相关的关键词和表达',
      tone: 'neutral',
      difficulty: DifficultyLevel.CLB9,
      status: CardStatus.NEW,
      essentialPhrases: {
        experience: [
          'What experience do you have in this field?',
          'Tell me about your previous roles.',
          'How many years of experience do you have?',
          'Describe a challenging project you worked on.'
        ],
        skills: [
          'What technical skills do you possess?',
          'Are you familiar with software X?',
          'How would you rate your communication skills?',
          'Do you have any language certifications?'
        ],
        availability: [
          'When can you start working?',
          'Are you available to work overtime?',
          'Do you have any scheduling conflicts?',
          'Can you travel for business?'
        ],
        companyInterest: [
          'Why do you want to work here?',
          'What do you know about our company?',
          'How did you learn about this position?',
          'What attracted you to our organization?'
        ]
      },
      upgrades: {
        vocabulary: {
          'experience': ['background', 'expertise', 'proficiency'],
          'skill': ['capability', 'competence', 'mastery'],
          'qualify': ['meet requirements', 'be eligible', 'be suitable'],
          'achieve': ['accomplish', 'attain', 'fulfill']
        },
        structure: {
          'I have experience in...': 'My professional background includes extensive experience in [specific field] with demonstrated success in [key area].',
          'My skills are...': 'I possess strong skills in [skill 1], [skill 2], and [skill 3], which are directly relevant to this position.',
          'I want this job because...': 'I am particularly interested in this opportunity because of [specific reason], and I believe my background aligns perfectly with your requirements.'
        }
      },
      practice: {
        question: 'Listen for keywords related to job interviews.',
        keyPoints: ['experience questions', 'skill assessment', 'availability', 'motivation']
      },
      metadata: { ease: 2.5, interval: 0, repetitions: 0 },
      isPublic: true,
    },
  ]

  // Create cards (delete existing first to avoid duplicates)
  await prisma.card.deleteMany({
    where: { isPublic: true, userId: null }
  })

  for (const cardData of sampleCards) {
    await prisma.card.create({
      data: {
        ...cardData,
        nextReviewAt: new Date(),
      }
    })
  }

  console.log(`Created ${sampleCards.length} sample flashcards`)

  // =============================================
  // Summary
  // =============================================
  console.log('\n✅ Database seeded successfully!')
  console.log('Users created:')
  console.log(`  - Admin: admin@celpip.com / admin123`)
  console.log(`  - Student: student@example.com / student123`)
  console.log(`  - Teacher: teacher@example.com / teacher123`)
  console.log(`\nFlashcards created: ${sampleCards.length}`)
  console.log('  - Writing Task 1: 2 cards')
  console.log('  - Writing Task 2: 2 cards')
  console.log('  - Speaking Task: 2 cards')
  console.log('  - Listening Keyword: 2 cards')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
