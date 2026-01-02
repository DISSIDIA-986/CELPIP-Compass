import { Flashcard, CardType, CardStatus, DifficultyLevel } from '@/types/flashcards';

// Helper function to create base card with default values
const createCard = (
  id: string,
  type: CardType,
  title: string,
  scenario: string,
  difficulty: DifficultyLevel,
  tone: string,
  essentialPhrases: Record<string, string[]>,
  upgrades: { vocabulary: Record<string, string[]>; structure: Record<string, string> },
  practice: { question: string; keyPoints: string[] }
): Flashcard => ({
  id,
  type,
  title,
  scenario,
  tone,
  difficulty,
  status: CardStatus.NEW,
  essentialPhrases,
  upgrades,
  practice,
  reviewCount: 0,
  correctCount: 0,
  averageQualityScore: 0.00,
  totalStudyTime: 0,
  createdAt: new Date('2025-12-29T08:00:00Z'),
  updatedAt: new Date('2025-12-29T08:00:00Z'),
  isDeleted: false,
  metadata: {
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date('2025-12-29T08:00:00Z')
  },
  lastReviewedAt: undefined,
  nextReviewAt: new Date('2025-12-29T08:00:00Z')
});

export const sampleFlashcards: Flashcard[] = [
  // ========================================
  // === WRITING TASK 1: 邮件写作 (15张) ===
  // ========================================

  // 1. 投诉类 - 噪音投诉
  createCard(
    'writing-task1-complaint-noise',
    CardType.WRITING_TASK1,
    '向邻居投诉噪音问题',
    '邻居在夜间产生过多噪音，影响你的休息',
    DifficultyLevel.CLB8,
    'semi-formal',
    {
      opening: [
        'I hope this message finds you well.',
        'I\'m writing to discuss a matter that\'s been concerning me.',
        'I would appreciate it if we could address this issue.'
      ],
      purpose: [
        'The main reason for my message is to address the noise issue.',
        'I wanted to bring to your attention the excessive noise during evenings.',
        'My concern is about the disturbance this is causing.'
      ],
      details: [
        'The noise typically starts around 10 PM and continues until midnight.',
        'It\'s making it difficult for me to sleep and focus during work.',
        'I\'ve noticed this has been happening for the past two weeks.'
      ],
      closing: [
        'I would be grateful if we could find a solution to this matter.',
        'Thank you for your understanding and cooperation.',
        'I look forward to your response.'
      ]
    },
    {
      vocabulary: {
        'noisy': ['excessive', 'disturbing', 'intrusive'],
        'problem': ['issue', 'concern', 'matter'],
        'make': ['cause', 'result in', 'lead to'],
        'stop': ['cease', 'discontinue', 'reduce']
      },
      structure: {
        'I\'m worried about the noise.': 'I\'m deeply concerned about the excessive noise that has been occurring.',
        'Can you stop it?': 'I would greatly appreciate it if you could take measures to reduce the noise levels.',
        'This is annoying me.': 'This situation has become increasingly disruptive to my daily life.'
      }
    },
    {
      question: 'Write an email to your neighbor about noise disturbance during evenings.',
      keyPoints: ['specific times', 'impact on you', 'requested solution', 'polite tone']
    }
  ),

  // 2. 投诉类 - 产品投诉
  createCard(
    'writing-task1-complaint-product',
    CardType.WRITING_TASK1,
    '投诉购买的有缺陷产品',
    '你购买的电子产品在保修期内出现故障，需要退款或换货',
    DifficultyLevel.CLB9,
    'formal',
    {
      opening: [
        'Dear Customer Service Team,',
        'I am writing to express my dissatisfaction with a recent purchase.',
        'I hope you can assist me with an issue regarding my order.'
      ],
      purpose: [
        'I am contacting you regarding Order #12345, placed on [date].',
        'The product I received is defective and does not function as advertised.',
        'I would like to request a full refund or replacement.'
      ],
      details: [
        'The device stopped working after only two days of normal use.',
        'I have attempted the troubleshooting steps in the manual without success.',
        'The warranty card indicates that repairs should be covered for one year.'
      ],
      closing: [
        'Please let me know how to proceed with the return process.',
        'I would appreciate a prompt response to resolve this matter.',
        'Thank you for your attention to this issue.'
      ]
    },
    {
      vocabulary: {
        'broken': ['defective', 'malfunctioning', 'faulty'],
        'want': ['request', 'seek', 'demand'],
        'bad': ['unsatisfactory', 'substandard', 'unacceptable'],
        'quickly': ['promptly', 'expeditiously', 'at your earliest convenience']
      },
      structure: {
        'The product is broken.': 'The product has proven to be defective and fails to perform its intended function.',
        'I want my money back.': 'I am requesting a full refund in accordance with your return policy.',
        'Please fix this fast.': 'I would appreciate your prompt attention to this matter.'
      }
    },
    {
      question: 'Write an email to customer service about a defective electronic product.',
      keyPoints: ['order details', 'problem description', 'requested resolution', 'warranty mention']
    }
  ),

  // 3. 请求类 - 维修请求
  createCard(
    'writing-task1-request-repair',
    CardType.WRITING_TASK1,
    '请求维修公寓设施',
    '公寓的空调出现问题，需要及时维修',
    DifficultyLevel.CLB8,
    'formal',
    {
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
        'I am available on weekdays after 5 PM and all day on weekends.'
      ]
    },
    {
      vocabulary: {
        'broken': ['malfunctioning', 'defective', 'out of order'],
        'fix': ['repair', 'service', 'restore'],
        'urgent': ['pressing', 'critical', 'immediate'],
        'soon': ['promptly', 'without delay', 'at your earliest convenience']
      },
      structure: {
        'The AC is broken.': 'The air conditioning unit has completely malfunctioned and requires professional repair.',
        'Please fix it soon.': 'I would appreciate it if you could arrange for maintenance services to be carried out promptly.',
        'It\'s very hot.': 'The current temperature conditions have made this situation increasingly uncomfortable.'
      }
    },
    {
      question: 'Write an email to your property manager requesting AC repair.',
      keyPoints: ['problem description', 'urgency explanation', 'available times', 'polite request']
    }
  ),

  // 4. 请求类 - 休假请求
  createCard(
    'writing-task1-request-leave',
    CardType.WRITING_TASK1,
    '向经理请求休假',
    '你需要请两周假期去处理家庭事务',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'Dear [Manager\'s Name],',
        'I am writing to formally request time off from work.',
        'I hope this email finds you well.'
      ],
      purpose: [
        'I would like to request two weeks of annual leave starting from [date].',
        'I need to take this time off to attend to important family matters.',
        'I have ensured that my current projects will not be affected during my absence.'
      ],
      details: [
        'I have already completed all urgent tasks assigned to me.',
        'I have briefed my colleague [Name] on ongoing projects.',
        'I will remain reachable via email for any emergencies.'
      ],
      closing: [
        'I would be grateful if you could approve this request.',
        'Please let me know if you need any additional information.',
        'Thank you for considering my request.'
      ]
    },
    {
      vocabulary: {
        'ask': ['request', 'seek approval for', 'submit a request for'],
        'need': ['require', 'necessitate', 'must have'],
        'time off': ['leave of absence', 'annual leave', 'vacation time'],
        'work': ['responsibilities', 'duties', 'assignments']
      },
      structure: {
        'I want to take vacation.': 'I am writing to formally request annual leave for the period of [dates].',
        'I need time for family.': 'Due to pressing family matters, I need to take time away from work.',
        'My work will be done.': 'I have made arrangements to ensure all my responsibilities are covered during my absence.'
      }
    },
    {
      question: 'Write an email to your manager requesting two weeks of leave.',
      keyPoints: ['specific dates', 'reason for leave', 'coverage plan', 'professional tone']
    }
  ),

  // 5. 请求类 - 信息请求
  createCard(
    'writing-task1-request-info',
    CardType.WRITING_TASK1,
    '向大学请求课程信息',
    '你想了解某大学研究生课程的详细信息',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'Dear Admissions Office,',
        'I am writing to inquire about the Master\'s program in Computer Science.',
        'I would be grateful if you could provide me with more information.'
      ],
      purpose: [
        'I am interested in applying for the upcoming fall semester.',
        'I would like to learn more about the program structure and requirements.',
        'Could you please send me detailed information about the curriculum?'
      ],
      details: [
        'I am particularly interested in the specialization in artificial intelligence.',
        'I would also like to know about scholarship opportunities for international students.',
        'Could you provide information on application deadlines and required documents?'
      ],
      closing: [
        'I look forward to hearing from you.',
        'Thank you for your assistance.',
        'Please feel free to contact me if you need any additional information.'
      ]
    },
    {
      vocabulary: {
        'know': ['inquire about', 'learn about', 'obtain information regarding'],
        'want': ['wish', 'would like', 'am interested in'],
        'send': ['provide', 'forward', 'share'],
        'course': ['program', 'curriculum', 'academic offering']
      },
      structure: {
        'I want to know about the course.': 'I am writing to inquire about the comprehensive details of the program.',
        'Please send me information.': 'I would be grateful if you could provide me with detailed information regarding the curriculum.',
        'When is the deadline?': 'Could you kindly inform me of the application deadlines and required documentation?'
      }
    },
    {
      question: 'Write an email to a university requesting information about a graduate program.',
      keyPoints: ['program of interest', 'specific questions', 'polite inquiry', 'contact information']
    }
  ),

  // 6. 建议类 - 改进建议
  createCard(
    'writing-task1-suggestion-workplace',
    CardType.WRITING_TASK1,
    '向公司提出改进建议',
    '你有一个可以提高团队效率的想法，想向经理建议',
    DifficultyLevel.CLB9,
    'formal',
    {
      opening: [
        'Dear [Manager\'s Name],',
        'I am writing to share a suggestion that could benefit our team.',
        'I hope you will consider this proposal for improving our workflow.'
      ],
      purpose: [
        'I would like to propose implementing a new project management tool.',
        'I believe this change could significantly improve our team\'s productivity.',
        'This suggestion is based on my observations over the past six months.'
      ],
      details: [
        'Currently, our team spends excessive time on coordination and status updates.',
        'A centralized platform would streamline communication and task tracking.',
        'I have researched several options that would fit within our budget.'
      ],
      closing: [
        'I would welcome the opportunity to discuss this proposal in more detail.',
        'Please let me know if you would like me to prepare a formal presentation.',
        'Thank you for considering my suggestion.'
      ]
    },
    {
      vocabulary: {
        'idea': ['proposal', 'suggestion', 'recommendation'],
        'better': ['improved', 'enhanced', 'optimized'],
        'problem': ['challenge', 'inefficiency', 'bottleneck'],
        'solve': ['address', 'resolve', 'overcome']
      },
      structure: {
        'I have an idea.': 'I would like to present a proposal that could address a current challenge in our workflow.',
        'This will make things better.': 'Implementing this solution would significantly enhance our team\'s efficiency and collaboration.',
        'Let me know what you think.': 'I would greatly appreciate the opportunity to discuss this proposal at your convenience.'
      }
    },
    {
      question: 'Write an email to your manager suggesting a workplace improvement.',
      keyPoints: ['clear proposal', 'benefits explained', 'supporting evidence', 'willingness to elaborate']
    }
  ),

  // 7. 道歉类 - 错过会议
  createCard(
    'writing-task1-apology-meeting',
    CardType.WRITING_TASK1,
    '为错过重要会议道歉',
    '你因紧急情况错过了与客户的重要会议',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'Dear [Client\'s Name],',
        'I am writing to sincerely apologize for missing our meeting yesterday.',
        'Please accept my deepest apologies for any inconvenience this may have caused.'
      ],
      purpose: [
        'Unfortunately, I was unable to attend due to a family emergency.',
        'I understand the importance of the meeting and regret not being there.',
        'I take full responsibility for any disruption this may have caused to your schedule.'
      ],
      details: [
        'I have already reviewed the meeting notes provided by my colleague.',
        'I am fully prepared to discuss the project at your earliest convenience.',
        'I have rearranged my schedule to ensure this will not happen again.'
      ],
      closing: [
        'I hope we can reschedule at a time that works for you.',
        'Thank you for your understanding.',
        'I look forward to making up for this inconvenience.'
      ]
    },
    {
      vocabulary: {
        'sorry': ['apologize', 'regret', 'express regret for'],
        'miss': ['fail to attend', 'be absent from', 'be unable to attend'],
        'problem': ['inconvenience', 'disruption', 'setback'],
        'again': ['in the future', 'going forward', 'henceforth']
      },
      structure: {
        'I\'m sorry I missed the meeting.': 'I sincerely apologize for my unexpected absence from our scheduled meeting.',
        'Something came up.': 'Due to unforeseen circumstances beyond my control, I was unable to attend.',
        'It won\'t happen again.': 'I have taken steps to ensure that such an occurrence will not repeat in the future.'
      }
    },
    {
      question: 'Write an email apologizing for missing an important client meeting.',
      keyPoints: ['sincere apology', 'brief explanation', 'make-up plan', 'prevention measures']
    }
  ),

  // 8. 感谢类 - 感谢推荐
  createCard(
    'writing-task1-thanks-recommendation',
    CardType.WRITING_TASK1,
    '感谢教授的推荐信',
    '你的教授为你写了研究生申请推荐信',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'Dear Professor [Name],',
        'I am writing to express my sincere gratitude for your support.',
        'I wanted to thank you for taking the time to write a recommendation letter for me.'
      ],
      purpose: [
        'Your recommendation played a crucial role in my graduate school application.',
        'I am thrilled to inform you that I have been accepted to [University].',
        'This achievement would not have been possible without your endorsement.'
      ],
      details: [
        'I particularly appreciate the time you invested in highlighting my research abilities.',
        'Your detailed letter helped me stand out among other applicants.',
        'I am grateful for your mentorship throughout my undergraduate years.'
      ],
      closing: [
        'I hope to make you proud in my future academic endeavors.',
        'Thank you once again for your invaluable support.',
        'I will keep you updated on my progress.'
      ]
    },
    {
      vocabulary: {
        'thank': ['express gratitude', 'appreciate', 'be grateful for'],
        'help': ['support', 'assistance', 'endorsement'],
        'important': ['crucial', 'invaluable', 'instrumental'],
        'happy': ['thrilled', 'delighted', 'pleased']
      },
      structure: {
        'Thank you for helping me.': 'I am deeply grateful for your invaluable support and assistance.',
        'Your letter was important.': 'Your recommendation letter played a pivotal role in my successful application.',
        'I got accepted!': 'I am thrilled to share the wonderful news that I have been accepted to the program.'
      }
    },
    {
      question: 'Write a thank-you email to a professor who wrote a recommendation letter.',
      keyPoints: ['specific gratitude', 'positive outcome', 'impact acknowledgment', 'future commitment']
    }
  ),

  // 9. 邀请类 - 活动邀请
  createCard(
    'writing-task1-invitation-event',
    CardType.WRITING_TASK1,
    '邀请同事参加团队聚会',
    '你正在组织一个团队庆祝活动，需要邀请所有成员',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'Hi Team,',
        'I hope this email finds you well!',
        'I\'m excited to share some news with you.'
      ],
      purpose: [
        'I am organizing a team celebration to mark our successful project completion.',
        'We would like to invite you to join us for this special occasion.',
        'This is a great opportunity to celebrate our achievements together.'
      ],
      details: [
        'The event will be held on Friday, December 15th, at 6 PM.',
        'We have reserved a private room at Riverside Restaurant.',
        'Dinner and drinks will be covered by the company.'
      ],
      closing: [
        'Please RSVP by Wednesday so we can finalize the reservation.',
        'Feel free to reach out if you have any dietary restrictions.',
        'Looking forward to celebrating with you!'
      ]
    },
    {
      vocabulary: {
        'party': ['celebration', 'gathering', 'event'],
        'come': ['attend', 'join us', 'participate'],
        'fun': ['enjoyable', 'memorable', 'festive'],
        'tell me': ['RSVP', 'confirm your attendance', 'let me know']
      },
      structure: {
        'We\'re having a party.': 'We are delighted to invite you to a team celebration in honor of our recent success.',
        'Please come!': 'We sincerely hope you can join us for this special occasion.',
        'Tell me if you can come.': 'Kindly confirm your attendance by [date] so we can make appropriate arrangements.'
      }
    },
    {
      question: 'Write an email inviting colleagues to a team celebration event.',
      keyPoints: ['event details', 'date/time/location', 'what\'s included', 'RSVP request']
    }
  ),

  // 10. 询问类 - 服务询问
  createCard(
    'writing-task1-inquiry-service',
    CardType.WRITING_TASK1,
    '询问银行服务详情',
    '你想开设一个商业账户，需要了解相关服务和要求',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'Dear Banking Services Team,',
        'I am writing to inquire about your business banking services.',
        'I would appreciate some information regarding opening a commercial account.'
      ],
      purpose: [
        'I am planning to start a small business and need a suitable banking solution.',
        'I would like to understand the requirements for opening a business account.',
        'Could you please provide details about your business account options?'
      ],
      details: [
        'Specifically, I am interested in accounts with low monthly fees.',
        'I would also like to know about online banking features and transaction limits.',
        'Additionally, what documents are required for the application process?'
      ],
      closing: [
        'I would appreciate if someone could contact me to discuss these options.',
        'Thank you for your assistance.',
        'I look forward to hearing from you soon.'
      ]
    },
    {
      vocabulary: {
        'ask': ['inquire', 'seek information about', 'request details on'],
        'need': ['require', 'am looking for', 'am interested in'],
        'cost': ['fees', 'charges', 'pricing'],
        'get': ['obtain', 'acquire', 'receive']
      },
      structure: {
        'I want to know about your services.': 'I am writing to inquire about the comprehensive range of services you offer.',
        'What do I need to open an account?': 'Could you kindly outline the documentation and requirements for account opening?',
        'How much does it cost?': 'I would appreciate detailed information regarding the associated fees and charges.'
      }
    },
    {
      question: 'Write an email to a bank inquiring about business account options.',
      keyPoints: ['purpose stated', 'specific questions', 'contact request', 'professional tone']
    }
  ),

  // ==========================================
  // === WRITING TASK 2: 观点论证 (10张) ===
  // ==========================================

  // 1. 远程工作
  createCard(
    'writing-task2-remote-work',
    CardType.WRITING_TASK2,
    '远程工作的优势',
    '调查问题：你认为公司应该允许员工远程工作吗？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'The debate over remote work has intensified in recent years.',
        'I firmly believe that companies should allow employees to work remotely.',
        'This essay will explore the compelling reasons supporting remote work policies.'
      ],
      reason1: [
        'First and foremost, remote work significantly improves work-life balance.',
        'Employees can better manage their personal responsibilities alongside work.',
        'The elimination of commuting saves valuable time that can be used productively.'
      ],
      reason2: [
        'Furthermore, remote work often leads to increased productivity.',
        'Employees can work in environments that suit their individual preferences.',
        'Studies have shown that remote workers often accomplish more in less time.'
      ],
      counterargument: [
        'While some argue that remote work reduces collaboration,',
        'Modern technology provides numerous tools for effective virtual communication.',
        'Video conferencing and collaboration platforms have made remote teamwork seamless.'
      ],
      conclusion: [
        'In conclusion, the benefits of remote work far outweigh its potential drawbacks.',
        'Companies that embrace flexible work policies will attract and retain top talent.',
        'Therefore, organizations should seriously consider implementing remote work options.'
      ]
    },
    {
      vocabulary: {
        'good': ['advantageous', 'beneficial', 'favorable'],
        'important': ['crucial', 'essential', 'vital'],
        'flexibility': ['adaptability', 'versatility', 'work-life integration'],
        'productive': ['efficient', 'effective', 'high-performing']
      },
      structure: {
        'Remote work is good.': 'Remote work offers substantial advantages for both employees and employers.',
        'People work better at home.': 'Employees often demonstrate enhanced productivity when working in their preferred environment.',
        'Companies should allow it.': 'Organizations would benefit significantly from implementing comprehensive remote work policies.'
      }
    },
    {
      question: 'Should companies allow employees to work remotely? Give your opinion with reasons.',
      keyPoints: ['clear stance', 'work-life balance', 'productivity benefits', 'address counterarguments']
    }
  ),

  // 2. 环境保护
  createCard(
    'writing-task2-environment',
    CardType.WRITING_TASK2,
    '保护环境的重要性',
    '调查问题：政府应该优先考虑环境保护还是经济发展？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'The tension between environmental protection and economic development remains a critical global issue.',
        'I believe that environmental protection should be prioritized, though not at the complete expense of economic growth.',
        'This response will examine why sustainable practices benefit both the environment and the economy.'
      ],
      reason1: [
        'First and foremost, environmental degradation poses existential threats to human survival.',
        'Climate change, pollution, and biodiversity loss directly impact public health and food security.',
        'Ignoring these issues will result in far greater economic costs in the long term.'
      ],
      reason2: [
        'Additionally, the green economy presents tremendous opportunities for growth.',
        'Investments in renewable energy create jobs and stimulate innovation.',
        'Countries leading in environmental technology are gaining competitive advantages.'
      ],
      counterargument: [
        'Critics argue that strict environmental regulations harm economic competitiveness.',
        'However, evidence suggests that sustainable practices actually improve long-term profitability.',
        'Companies with strong environmental commitments often outperform their competitors.'
      ],
      conclusion: [
        'In conclusion, environmental protection and economic prosperity are not mutually exclusive.',
        'Governments must adopt policies that promote sustainable development.',
        'The future depends on our ability to balance these two critical priorities.'
      ]
    },
    {
      vocabulary: {
        'important': ['essential', 'critical', 'imperative'],
        'protect': ['preserve', 'conserve', 'safeguard'],
        'problem': ['challenge', 'crisis', 'threat'],
        'future': ['subsequent generations', 'long-term prospects', 'coming decades']
      },
      structure: {
        'Environment is important.': 'Environmental conservation represents a fundamental responsibility for all societies.',
        'We need to act now.': 'The urgency of this matter cannot be overstated given the rapidly deteriorating environmental conditions.',
        'Both are possible.': 'Economic development and environmental protection can and must coexist through sustainable practices.'
      }
    },
    {
      question: 'Should government prioritize environmental protection or economic development?',
      keyPoints: ['clear position', 'environmental benefits', 'economic opportunities', 'balanced view']
    }
  ),

  // 3. 科技与教育
  createCard(
    'writing-task2-tech-education',
    CardType.WRITING_TASK2,
    '科技在教育中的作用',
    '调查问题：学校应该更多地使用科技来教学吗？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Technology has transformed nearly every aspect of modern life, including education.',
        'I support the increased integration of technology in schools, with appropriate safeguards.',
        'This essay will discuss the benefits and considerations of technology in education.'
      ],
      reason1: [
        'Technology enables personalized learning experiences for students.',
        'Adaptive software can identify individual strengths and weaknesses.',
        'Students can learn at their own pace and receive immediate feedback.'
      ],
      reason2: [
        'Furthermore, technology prepares students for the modern workplace.',
        'Digital literacy is now an essential skill across virtually all professions.',
        'Exposure to technology in school helps students develop crucial 21st-century skills.'
      ],
      counterargument: [
        'Some educators worry that technology may distract students or reduce social interaction.',
        'However, well-designed implementation addresses these concerns effectively.',
        'Teachers can use technology to enhance, rather than replace, traditional teaching methods.'
      ],
      conclusion: [
        'In conclusion, technology offers significant benefits for educational outcomes.',
        'Schools should thoughtfully integrate technology while maintaining human connection.',
        'The goal should be to use technology as a tool that empowers both teachers and students.'
      ]
    },
    {
      vocabulary: {
        'help': ['facilitate', 'enhance', 'support'],
        'learn': ['acquire knowledge', 'develop skills', 'gain proficiency'],
        'use': ['utilize', 'implement', 'integrate'],
        'better': ['improved', 'enhanced', 'superior']
      },
      structure: {
        'Technology helps students.': 'Educational technology facilitates personalized and effective learning experiences.',
        'Kids need to learn about computers.': 'Digital literacy has become an indispensable skill for success in the modern workforce.',
        'Teachers should use technology.': 'Educators should thoughtfully integrate technology to enhance their teaching methodologies.'
      }
    },
    {
      question: 'Should schools use more technology in teaching? Share your opinion.',
      keyPoints: ['personalized learning', 'workplace preparation', 'address concerns', 'balanced implementation']
    }
  ),

  // 4. 公共交通
  createCard(
    'writing-task2-public-transit',
    CardType.WRITING_TASK2,
    '改善公共交通',
    '调查问题：城市应该投资改善公共交通还是建设更多道路？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Urban transportation infrastructure is crucial for city development and quality of life.',
        'I strongly believe that cities should prioritize public transit over road expansion.',
        'This essay will examine the reasons supporting investment in public transportation.'
      ],
      reason1: [
        'Public transit reduces traffic congestion more effectively than building new roads.',
        'Adding roads often leads to induced demand, ultimately worsening traffic.',
        'Efficient public transit can move more people using less space and resources.'
      ],
      reason2: [
        'Moreover, public transportation is significantly better for the environment.',
        'Buses and trains produce fewer emissions per passenger than private vehicles.',
        'This supports cities\' goals to reduce carbon footprints and combat climate change.'
      ],
      counterargument: [
        'Opponents argue that people prefer the convenience of personal vehicles.',
        'However, high-quality public transit can be equally convenient and often faster.',
        'Many world-class cities demonstrate that excellent transit attracts riders from all backgrounds.'
      ],
      conclusion: [
        'In conclusion, investing in public transit offers the best return for urban transportation.',
        'Cities should develop comprehensive networks that serve diverse communities.',
        'Such investments will create more livable, sustainable, and equitable cities.'
      ]
    },
    {
      vocabulary: {
        'traffic': ['congestion', 'gridlock', 'vehicle flow'],
        'better': ['superior', 'preferable', 'advantageous'],
        'environment': ['ecosystem', 'natural surroundings', 'atmosphere'],
        'money': ['investment', 'funding', 'financial resources']
      },
      structure: {
        'Public transit is better.': 'Public transportation offers superior benefits compared to road expansion.',
        'It helps the environment.': 'Transit systems significantly reduce urban carbon emissions and environmental impact.',
        'Cities should invest in buses and trains.': 'Municipal governments should prioritize funding for comprehensive public transit networks.'
      }
    },
    {
      question: 'Should cities invest in public transit or more roads?',
      keyPoints: ['reduced congestion', 'environmental benefits', 'address preference concerns', 'livability']
    }
  ),

  // 5. 社交媒体影响
  createCard(
    'writing-task2-social-media',
    CardType.WRITING_TASK2,
    '社交媒体的影响',
    '调查问题：社交媒体对社会的影响是积极的还是消极的？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'Social media has fundamentally transformed how we communicate and access information.',
        'While acknowledging its challenges, I believe social media\'s overall impact is positive.',
        'This essay will analyze both the benefits and drawbacks of social media platforms.'
      ],
      reason1: [
        'Social media has democratized information and given voice to marginalized groups.',
        'Important social movements have been organized and amplified through these platforms.',
        'People can now easily connect with others who share their interests and experiences.'
      ],
      reason2: [
        'Furthermore, social media provides valuable tools for businesses and education.',
        'Small businesses can reach customers without expensive traditional advertising.',
        'Educational content is freely available to learners around the world.'
      ],
      counterargument: [
        'Critics correctly point out concerns about misinformation and mental health impacts.',
        'However, these issues can be addressed through better platform design and media literacy.',
        'The problems are not inherent to social media but rather how it is sometimes used.'
      ],
      conclusion: [
        'In conclusion, social media has brought significant positive changes to society.',
        'We must continue working to maximize benefits while minimizing negative effects.',
        'With responsible use, social media remains a powerful tool for connection and progress.'
      ]
    },
    {
      vocabulary: {
        'good': ['positive', 'beneficial', 'constructive'],
        'bad': ['negative', 'detrimental', 'harmful'],
        'change': ['transform', 'revolutionize', 'reshape'],
        'connect': ['engage', 'communicate', 'interact']
      },
      structure: {
        'Social media is good for society.': 'Social media platforms have contributed positively to societal connectivity and information access.',
        'There are some problems.': 'While certain challenges exist, these issues can be effectively addressed through proper measures.',
        'We should use it responsibly.': 'Society must develop frameworks for responsible and beneficial use of these platforms.'
      }
    },
    {
      question: 'Is social media\'s impact on society positive or negative?',
      keyPoints: ['democratization of information', 'business/education tools', 'address concerns', 'balanced conclusion']
    }
  ),

  // 6. 健康生活方式
  createCard(
    'writing-task2-healthy-lifestyle',
    CardType.WRITING_TASK2,
    '政府促进健康生活',
    '调查问题：政府是否应该采取措施促进国民健康生活方式？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Public health has become an increasingly important policy consideration.',
        'I believe governments should actively promote healthy lifestyles among citizens.',
        'This essay will discuss why government intervention in public health is justified and beneficial.'
      ],
      reason1: [
        'Unhealthy lifestyles create enormous costs for healthcare systems.',
        'Prevention is significantly more cost-effective than treating chronic diseases.',
        'Government investment in health promotion ultimately reduces public spending.'
      ],
      reason2: [
        'Additionally, many people lack access to information about healthy living.',
        'Government campaigns can educate the public about nutrition, exercise, and mental health.',
        'Public parks, recreational facilities, and healthy food initiatives improve community health.'
      ],
      counterargument: [
        'Some argue that lifestyle choices should remain purely personal decisions.',
        'However, government programs can provide options without restricting personal freedom.',
        'Information and accessible resources empower people to make better choices.'
      ],
      conclusion: [
        'In conclusion, governments have both the responsibility and capability to promote public health.',
        'Well-designed programs respect individual choice while improving population health outcomes.',
        'Such initiatives create healthier, more productive societies.'
      ]
    },
    {
      vocabulary: {
        'healthy': ['wholesome', 'beneficial', 'health-promoting'],
        'help': ['assist', 'support', 'facilitate'],
        'cost': ['expenditure', 'expense', 'financial burden'],
        'choice': ['decision', 'option', 'preference']
      },
      structure: {
        'Government should help people be healthy.': 'Governments have a responsibility to facilitate healthy lifestyle choices among citizens.',
        'It saves money.': 'Investment in preventive health measures yields significant long-term cost savings.',
        'People can still make their own choices.': 'These programs enhance individual autonomy by providing information and accessible options.'
      }
    },
    {
      question: 'Should governments take measures to promote healthy lifestyles?',
      keyPoints: ['healthcare costs', 'education and resources', 'personal freedom', 'societal benefits']
    }
  ),

  // 7. 城市生活 vs 乡村生活
  createCard(
    'writing-task2-city-vs-rural',
    CardType.WRITING_TASK2,
    '城市生活与乡村生活',
    '调查问题：年轻人应该在城市还是乡村生活？',
    DifficultyLevel.CLB7,
    'neutral',
    {
      introduction: [
        'The choice between urban and rural living is one that many young people face.',
        'For most young people, I believe city living offers more advantages during early career stages.',
        'This essay will examine the benefits of urban living for young adults.'
      ],
      reason1: [
        'Cities offer significantly more career opportunities and professional growth potential.',
        'Major industries, companies, and networking events are concentrated in urban areas.',
        'Young people can explore different paths and advance their careers more quickly.'
      ],
      reason2: [
        'Urban areas also provide diverse social and cultural experiences.',
        'Young people can meet others from various backgrounds and expand their perspectives.',
        'Entertainment, educational, and social activities are more abundant in cities.'
      ],
      counterargument: [
        'Rural living offers lower costs and closer connection to nature.',
        'However, remote work is making it possible to enjoy rural benefits while working urban jobs.',
        'Young people can always relocate to quieter areas later in life.'
      ],
      conclusion: [
        'In conclusion, city living generally offers more advantages for young people starting their careers.',
        'The opportunities for professional and personal growth are difficult to match in rural areas.',
        'Young adults should consider their specific goals when making this important decision.'
      ]
    },
    {
      vocabulary: {
        'job': ['career opportunity', 'professional position', 'employment prospect'],
        'meet people': ['network', 'socialize', 'make connections'],
        'expensive': ['costly', 'high-priced', 'premium'],
        'quiet': ['peaceful', 'tranquil', 'serene']
      },
      structure: {
        'Cities have more jobs.': 'Urban areas offer significantly greater career opportunities and professional development potential.',
        'You can meet many people.': 'Cities provide excellent networking opportunities and diverse social experiences.',
        'The countryside is cheaper and quieter.': 'Rural areas offer more affordable living costs and a peaceful environment.'
      }
    },
    {
      question: 'Should young people live in cities or rural areas?',
      keyPoints: ['career opportunities', 'social experiences', 'acknowledge rural benefits', 'career stage consideration']
    }
  ),

  // 8. 传统文化保护
  createCard(
    'writing-task2-culture-preservation',
    CardType.WRITING_TASK2,
    '保护传统文化',
    '调查问题：在全球化时代保护传统文化是否重要？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'Globalization has created unprecedented cultural exchange but also threatens local traditions.',
        'I firmly believe that preserving traditional cultures is both important and achievable.',
        'This essay will explore why cultural preservation matters in our interconnected world.'
      ],
      reason1: [
        'Traditional cultures represent irreplaceable repositories of human knowledge and wisdom.',
        'Indigenous practices often contain valuable insights about sustainable living and community.',
        'Once lost, these traditions cannot be recreated or recovered.'
      ],
      reason2: [
        'Cultural diversity enriches the global community and drives innovation.',
        'Different perspectives lead to creative solutions to shared problems.',
        'A world with only one dominant culture would be significantly impoverished.'
      ],
      counterargument: [
        'Some argue that cultural change is natural and should not be artificially prevented.',
        'However, preservation does not mean preventing change but rather ensuring continuity.',
        'Communities can embrace modernity while maintaining connection to their heritage.'
      ],
      conclusion: [
        'In conclusion, traditional cultures deserve active protection and support.',
        'Governments, communities, and individuals all have roles to play in preservation efforts.',
        'We can create a future that values both global connection and local tradition.'
      ]
    },
    {
      vocabulary: {
        'important': ['vital', 'essential', 'invaluable'],
        'protect': ['preserve', 'safeguard', 'maintain'],
        'lose': ['disappear', 'vanish', 'become extinct'],
        'change': ['evolve', 'transform', 'adapt']
      },
      structure: {
        'We should protect old traditions.': 'The preservation of traditional cultures represents a vital responsibility for contemporary society.',
        'These things can disappear.': 'Without active protection, invaluable cultural heritage may be permanently lost.',
        'Different cultures are good.': 'Cultural diversity enriches human civilization and fosters innovation.'
      }
    },
    {
      question: 'Is it important to preserve traditional cultures in the age of globalization?',
      keyPoints: ['irreplaceable knowledge', 'diversity value', 'balance with change', 'preservation methods']
    }
  ),

  // ==========================================
  // === SPEAKING TASK 1-8: 口语任务 (20张) ===
  // ==========================================

  // Speaking Task 1: Giving Advice (3张)
  createCard(
    'speaking-task1-advice-career',
    CardType.SPEAKING_TASK,
    '职业建议：换工作',
    'Speaking Task 1 - 给出建议：你的朋友正在考虑换工作，给他/她一些建议',
    DifficultyLevel.CLB8,
    'informal',
    {
      introduction: [
        'That\'s a big decision, and I\'m glad you\'re thinking it through carefully.',
        'Changing jobs can be exciting but also stressful, so let me share some thoughts.',
        'I have a few suggestions that might help you make this important decision.'
      ],
      advice1: [
        'First, I would strongly recommend evaluating your current situation objectively.',
        'Think about what specifically is making you want to leave your current job.',
        'Sometimes the grass looks greener on the other side, but it might not be.'
      ],
      advice2: [
        'Second, you should research the new opportunity thoroughly before making any decisions.',
        'Look into the company culture, growth prospects, and work-life balance.',
        'Speaking with current or former employees can give you valuable insights.'
      ],
      advice3: [
        'Finally, consider the financial implications carefully.',
        'Make sure you have savings to cover any transition period.',
        'Don\'t jump until you have a solid offer in hand.'
      ],
      closing: [
        'Whatever you decide, trust your instincts and believe in yourself.',
        'I\'m here to support you through this process.',
        'Good luck with your decision!'
      ]
    },
    {
      vocabulary: {
        'job': ['position', 'career opportunity', 'professional role'],
        'think': ['consider', 'evaluate', 'reflect on'],
        'important': ['crucial', 'significant', 'essential'],
        'careful': ['thorough', 'diligent', 'meticulous']
      },
      structure: {
        'You should think carefully.': 'I would strongly recommend taking time to carefully evaluate all aspects of this decision.',
        'Look for other jobs.': 'You might want to explore what opportunities are available in the market.',
        'Be sure before you quit.': 'It would be wise to secure a new position before leaving your current job.'
      }
    },
    {
      question: 'Your friend is considering changing jobs. Give them advice.',
      keyPoints: ['evaluate current situation', 'research new opportunity', 'financial planning', 'supportive tone']
    }
  ),

  createCard(
    'speaking-task1-advice-study',
    CardType.SPEAKING_TASK,
    '学习建议：提高英语',
    'Speaking Task 1 - 给出建议：你的朋友想提高英语水平，给他/她一些建议',
    DifficultyLevel.CLB7,
    'informal',
    {
      introduction: [
        'I\'m so glad you\'re motivated to improve your English!',
        'There are many effective ways to enhance your language skills.',
        'Let me share some strategies that have worked for me and others I know.'
      ],
      advice1: [
        'First, I suggest immersing yourself in English as much as possible.',
        'Watch English movies, listen to podcasts, and read books in English.',
        'The more exposure you have, the more natural the language will become.'
      ],
      advice2: [
        'Another helpful approach is to practice speaking regularly.',
        'Find a conversation partner or join a language exchange group.',
        'Don\'t be afraid to make mistakes – that\'s how you learn!'
      ],
      advice3: [
        'Also, consider keeping a vocabulary journal.',
        'Write down new words you encounter and review them regularly.',
        'Try to use these words in your daily conversations or writing.'
      ],
      closing: [
        'Remember, learning a language takes time and patience.',
        'Celebrate your progress along the way.',
        'You\'ll be amazed at how much you can improve with consistent practice!'
      ]
    },
    {
      vocabulary: {
        'learn': ['acquire', 'develop', 'master'],
        'practice': ['rehearse', 'drill', 'exercise'],
        'better': ['improved', 'enhanced', 'advanced'],
        'help': ['assist', 'support', 'facilitate']
      },
      structure: {
        'You should watch English movies.': 'I would recommend immersing yourself in English media such as films and podcasts.',
        'Talk to people in English.': 'Regular conversation practice with native speakers or fellow learners can significantly accelerate your progress.',
        'Don\'t be scared to make mistakes.': 'Embrace mistakes as valuable learning opportunities rather than setbacks.'
      }
    },
    {
      question: 'Your friend wants to improve their English. Give them advice.',
      keyPoints: ['immersion strategies', 'speaking practice', 'vocabulary building', 'encouragement']
    }
  ),

  // Speaking Task 2: Personal Experience
  createCard(
    'speaking-task2-experience-travel',
    CardType.SPEAKING_TASK,
    '个人经历：难忘旅行',
    'Speaking Task 2 - 描述个人经历：描述一次令你难忘的旅行',
    DifficultyLevel.CLB7,
    'informal',
    {
      introduction: [
        'I would like to describe a memorable trip I took last year to Japan.',
        'This journey was particularly special because it was my first time in Asia.',
        'The experience completely exceeded my expectations in every way.'
      ],
      details: [
        'I spent two weeks exploring Tokyo, Kyoto, and Osaka.',
        'The most impressive aspect was the perfect blend of ancient traditions and modern technology.',
        'I was fascinated by how clean and efficient everything was.'
      ],
      feelings: [
        'What struck me most was the kindness of the Japanese people.',
        'I felt completely safe walking around even late at night.',
        'The experience gave me a deep appreciation for Japanese culture.'
      ],
      impact: [
        'This trip changed my perspective on many things.',
        'I became more interested in Japanese cuisine, history, and language.',
        'I\'m now planning to return and explore more of the country.'
      ],
      conclusion: [
        'Overall, this trip was one of the best experiences of my life.',
        'The memories I made will stay with me forever.',
        'I would highly recommend visiting Japan to anyone who has the opportunity.'
      ]
    },
    {
      vocabulary: {
        'beautiful': ['breathtaking', 'stunning', 'magnificent'],
        'interesting': ['fascinating', 'captivating', 'intriguing'],
        'good': ['exceptional', 'outstanding', 'remarkable'],
        'remember': ['cherish', 'treasure', 'hold dear']
      },
      structure: {
        'It was very beautiful.': 'The scenery was absolutely breathtaking, featuring a harmonious blend of natural and architectural beauty.',
        'I learned a lot.': 'This experience provided me with invaluable insights into a different culture and way of life.',
        'I will never forget it.': 'The memories and impressions from this journey have become an integral part of who I am.'
      }
    },
    {
      question: 'Describe a memorable trip you have taken.',
      keyPoints: ['destination details', 'specific experiences', 'feelings and reactions', 'lasting impact']
    }
  ),

  // Speaking Task 3: Describing a Scene
  createCard(
    'speaking-task3-scene-park',
    CardType.SPEAKING_TASK,
    '场景描述：公园活动',
    'Speaking Task 3 - 描述场景：描述图片中公园里人们的活动',
    DifficultyLevel.CLB7,
    'neutral',
    {
      overview: [
        'This image shows a lively scene in what appears to be a large urban park.',
        'There are many people enjoying various activities on a beautiful sunny day.',
        'The park seems to be a popular gathering place for the community.'
      ],
      foreground: [
        'In the foreground, I can see a family having a picnic on a blanket.',
        'They appear to be enjoying lunch together with sandwiches and fruit.',
        'A young child is playing with a small dog nearby.'
      ],
      middleground: [
        'Moving further back, there are people playing frisbee on the grass.',
        'A jogger is running along a paved path that winds through the park.',
        'Several people are sitting on benches, reading or chatting with friends.'
      ],
      background: [
        'In the background, you can see tall trees providing shade.',
        'There\'s also a pond where some people appear to be feeding ducks.',
        'The city skyline is visible in the distance.'
      ],
      atmosphere: [
        'The overall atmosphere seems relaxed and peaceful.',
        'Everyone appears to be enjoying the nice weather.',
        'It looks like a perfect day to spend time outdoors.'
      ]
    },
    {
      vocabulary: {
        'see': ['observe', 'notice', 'spot'],
        'people': ['individuals', 'folks', 'visitors'],
        'nice': ['pleasant', 'lovely', 'agreeable'],
        'big': ['spacious', 'expansive', 'large']
      },
      structure: {
        'There are many people.': 'The scene depicts numerous individuals engaged in various recreational activities.',
        'It looks nice outside.': 'The weather conditions appear to be ideal for outdoor leisure activities.',
        'People are having fun.': 'The visitors seem to be thoroughly enjoying their time in this pleasant setting.'
      }
    },
    {
      question: 'Describe what you see in this picture of a park.',
      keyPoints: ['systematic description', 'use spatial language', 'describe activities', 'convey atmosphere']
    }
  ),

  // Speaking Task 4: Making Predictions
  createCard(
    'speaking-task4-prediction-tech',
    CardType.SPEAKING_TASK,
    '预测未来：科技发展',
    'Speaking Task 4 - 做出预测：你认为10年后科技会如何改变我们的生活？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Technology is evolving at an unprecedented pace.',
        'I believe the next decade will bring transformative changes to our daily lives.',
        'Let me share my predictions about how technology might shape our future.'
      ],
      prediction1: [
        'I predict that artificial intelligence will become much more integrated into our daily routines.',
        'AI assistants will probably handle many tasks we currently do ourselves.',
        'This could include everything from scheduling to shopping to health monitoring.'
      ],
      prediction2: [
        'Transportation is likely to undergo a massive transformation.',
        'Self-driving cars will probably become commonplace in major cities.',
        'We might also see the emergence of flying taxis for urban transportation.'
      ],
      prediction3: [
        'Healthcare will likely become more personalized and preventive.',
        'Wearable devices will continuously monitor our health and predict issues.',
        'Telemedicine may become the primary way we consult with doctors.'
      ],
      conclusion: [
        'Of course, these predictions come with both opportunities and challenges.',
        'We\'ll need to address issues like privacy and job displacement.',
        'Overall, I\'m cautiously optimistic about the technological future ahead.'
      ]
    },
    {
      vocabulary: {
        'change': ['transform', 'revolutionize', 'reshape'],
        'think': ['predict', 'anticipate', 'foresee'],
        'maybe': ['perhaps', 'possibly', 'potentially'],
        'become': ['evolve into', 'develop into', 'progress to']
      },
      structure: {
        'Things will be different.': 'We can anticipate significant transformations in virtually every aspect of daily life.',
        'I think AI will be important.': 'Artificial intelligence will likely play an increasingly pivotal role in our society.',
        'There might be problems.': 'These advancements will inevitably present certain challenges that society must address.'
      }
    },
    {
      question: 'How do you think technology will change our lives in the next 10 years?',
      keyPoints: ['specific predictions', 'multiple areas', 'acknowledge uncertainty', 'balanced view']
    }
  ),

  // Speaking Task 5: Comparing and Persuading
  createCard(
    'speaking-task5-compare-transport',
    CardType.SPEAKING_TASK,
    '比较说服：交通方式',
    'Speaking Task 5 - 比较并说服：比较公共交通和私家车，说服你的朋友使用公共交通',
    DifficultyLevel.CLB8,
    'informal',
    {
      introduction: [
        'I understand you\'re considering how to commute to your new job.',
        'Let me compare public transit with driving and explain why I think transit is better for you.',
        'I believe public transportation offers several compelling advantages.'
      ],
      comparison: [
        'While driving offers flexibility, it comes with significant costs.',
        'Gas, insurance, parking, and maintenance add up to thousands of dollars yearly.',
        'Public transit, on the other hand, is much more affordable.'
      ],
      advantage1: [
        'One major benefit is that you can use your commute time productively.',
        'On the bus or train, you can read, work, or even relax.',
        'When driving, you\'re completely focused on the road and traffic.'
      ],
      advantage2: [
        'Public transit is also much better for the environment.',
        'By choosing transit, you\'re reducing your carbon footprint.',
        'This is something we should all consider given climate concerns.'
      ],
      persuasion: [
        'I really think you should give public transit a try for at least a month.',
        'You might be surprised by how convenient and stress-free it can be.',
        'Many people who switch end up preferring it over driving.'
      ]
    },
    {
      vocabulary: {
        'better': ['preferable', 'superior', 'more advantageous'],
        'cheap': ['affordable', 'economical', 'cost-effective'],
        'good for': ['beneficial for', 'advantageous for', 'favorable for'],
        'try': ['consider', 'give a chance to', 'experiment with']
      },
      structure: {
        'Public transit is cheaper.': 'Public transportation offers significant cost savings compared to private vehicle ownership.',
        'You can do other things.': 'Commuting by transit allows you to utilize travel time productively.',
        'You should try it.': 'I would strongly encourage you to experience public transit firsthand before making a final decision.'
      }
    },
    {
      question: 'Compare public transit and driving. Persuade your friend to use public transit.',
      keyPoints: ['fair comparison', 'multiple benefits', 'address concerns', 'strong persuasion']
    }
  ),

  // Speaking Task 6: Dealing with a Difficult Situation
  createCard(
    'speaking-task6-difficult-neighbor',
    CardType.SPEAKING_TASK,
    '处理困境：邻居问题',
    'Speaking Task 6 - 处理困难情境：你的邻居总是把音乐开得很大声，该如何与他们沟通',
    DifficultyLevel.CLB8,
    'semi-formal',
    {
      opening: [
        'Hi, I hope I\'m not catching you at a bad time.',
        'I wanted to have a quick word with you about something.',
        'I hope you don\'t mind me bringing this up.'
      ],
      problem: [
        'I\'ve noticed that the music from your apartment has been quite loud lately.',
        'It\'s been making it difficult for me to sleep and concentrate on my work.',
        'I understand that you enjoy music, and I respect that.'
      ],
      request: [
        'I was wondering if it would be possible to turn down the volume, especially after 9 PM.',
        'Perhaps we could agree on quiet hours that work for both of us.',
        'I\'d really appreciate your cooperation on this.'
      ],
      offer: [
        'If the walls are thin, maybe we could look into some soundproofing solutions together.',
        'I\'m happy to discuss this further if you have any concerns or suggestions.',
        'I want to find a solution that works for both of us.'
      ],
      closing: [
        'Thank you so much for understanding.',
        'I really appreciate you taking the time to listen.',
        'Let\'s work together to make this living situation comfortable for everyone.'
      ]
    },
    {
      vocabulary: {
        'loud': ['excessive volume', 'high noise level', 'disruptive sound'],
        'bother': ['disturb', 'inconvenience', 'affect'],
        'help': ['cooperation', 'understanding', 'consideration'],
        'quiet': ['reasonable volume', 'moderate sound level', 'peaceful']
      },
      structure: {
        'Your music is too loud.': 'I\'ve noticed the music volume has been quite high, which has affected my daily routine.',
        'Can you turn it down?': 'Would you be willing to keep the volume at a more moderate level during certain hours?',
        'Let\'s figure this out.': 'I\'m confident we can find an arrangement that accommodates both of our needs.'
      }
    },
    {
      question: 'How would you speak to a neighbor about their loud music?',
      keyPoints: ['polite approach', 'explain impact', 'make specific request', 'offer compromise']
    }
  ),

  // Speaking Task 7: Expressing Opinions
  createCard(
    'speaking-task7-opinion-social-media',
    CardType.SPEAKING_TASK,
    '表达观点：社交媒体',
    'Speaking Task 7 - 表达观点：社交媒体对年轻人是利大于弊还是弊大于利？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'Social media has become an integral part of young people\'s lives.',
        'This is a complex issue with valid arguments on both sides.',
        'In my view, the impact depends largely on how social media is used.'
      ],
      positives: [
        'On the positive side, social media enables young people to connect with others globally.',
        'It provides platforms for self-expression and creativity.',
        'Many young people have built communities and even businesses through social media.'
      ],
      negatives: [
        'However, there are legitimate concerns about negative effects.',
        'Excessive use can lead to anxiety, depression, and body image issues.',
        'The constant comparison with others can damage self-esteem.'
      ],
      personalView: [
        'Personally, I believe the key is moderation and media literacy.',
        'Young people need guidance on using social media healthily.',
        'Parents and educators should help them develop critical thinking skills.'
      ],
      conclusion: [
        'In conclusion, social media is a tool that can be used positively or negatively.',
        'With proper education and self-awareness, the benefits can outweigh the drawbacks.',
        'We shouldn\'t ban social media but teach responsible use.'
      ]
    },
    {
      vocabulary: {
        'good': ['beneficial', 'advantageous', 'positive'],
        'bad': ['harmful', 'detrimental', 'negative'],
        'important': ['crucial', 'essential', 'significant'],
        'think': ['believe', 'consider', 'maintain']
      },
      structure: {
        'Social media has good and bad sides.': 'Social media presents both opportunities and challenges for young people.',
        'Young people use it too much.': 'Excessive engagement with social platforms can have negative consequences on mental health.',
        'Parents should help.': 'Parental guidance and media literacy education are essential for healthy social media use.'
      }
    },
    {
      question: 'Is social media more beneficial or harmful for young people? Express your opinion.',
      keyPoints: ['acknowledge complexity', 'discuss both sides', 'give personal view', 'suggest solutions']
    }
  ),

  // Speaking Task 8: Describing an Unusual Situation
  createCard(
    'speaking-task8-unusual-airport',
    CardType.SPEAKING_TASK,
    '描述异常情况：机场延误',
    'Speaking Task 8 - 描述异常情况：描述一次在机场遇到航班严重延误的经历',
    DifficultyLevel.CLB8,
    'informal',
    {
      setting: [
        'Last summer, I had a really frustrating experience at the airport.',
        'I was flying from Toronto to Vancouver for a family reunion.',
        'What was supposed to be a simple 5-hour journey turned into a nightmare.'
      ],
      problem: [
        'When I arrived at the airport, I discovered my flight was delayed by 6 hours.',
        'A severe thunderstorm had disrupted air traffic across the region.',
        'The departure board kept showing further delays as the hours passed.'
      ],
      reaction: [
        'At first, I was incredibly frustrated and anxious about missing events.',
        'The airport was packed with similarly stranded passengers.',
        'I called my family to let them know and tried to remain calm.'
      ],
      solution: [
        'I decided to make the best of the situation.',
        'I found a quiet corner, bought some food, and caught up on work.',
        'Eventually, I even struck up conversations with other delayed passengers.'
      ],
      conclusion: [
        'The flight finally departed around midnight.',
        'While it was exhausting, I learned that some things are beyond our control.',
        'Now I always plan for potential delays when traveling.'
      ]
    },
    {
      vocabulary: {
        'late': ['delayed', 'postponed', 'behind schedule'],
        'angry': ['frustrated', 'irritated', 'exasperated'],
        'wait': ['remain', 'stay', 'endure'],
        'finally': ['eventually', 'ultimately', 'at last']
      },
      structure: {
        'My flight was late.': 'My flight experienced significant delays due to unforeseen weather conditions.',
        'I was very angry.': 'The situation initially left me feeling extremely frustrated and anxious.',
        'I waited a long time.': 'I spent several hours in the airport terminal waiting for updates.'
      }
    },
    {
      question: 'Describe an unusual situation when your flight was severely delayed.',
      keyPoints: ['set the scene', 'explain the problem', 'describe your reaction', 'share resolution']
    }
  ),

  // ==========================================
  // === LISTENING: 听力关键词和策略 (12张) ===
  // ==========================================

  // Listening Part 1: Problem Solving
  createCard(
    'listening-part1-problem-solving',
    CardType.LISTENING_KEYWORD,
    '听力Part 1：问题解决关键词',
    'Listening Part 1 - 识别问题和解决方案的关键词和表达',
    DifficultyLevel.CLB7,
    'neutral',
    {
      problemIdentification: [
        'The issue/problem is that...',
        'We\'re having trouble with...',
        'Something seems to be wrong with...',
        'I\'m concerned about...'
      ],
      suggestionPhrases: [
        'Why don\'t we try...?',
        'Have you considered...?',
        'One option would be to...',
        'What if we...?'
      ],
      agreementPhrases: [
        'That sounds like a good idea.',
        'I think that would work.',
        'Let\'s go with that plan.',
        'That makes sense to me.'
      ],
      disagreementPhrases: [
        'I\'m not sure that would work because...',
        'The problem with that is...',
        'Actually, I was thinking...',
        'That might not be the best approach.'
      ]
    },
    {
      vocabulary: {
        'problem': ['issue', 'challenge', 'difficulty'],
        'solution': ['resolution', 'answer', 'fix'],
        'suggest': ['propose', 'recommend', 'advise'],
        'agree': ['concur', 'accept', 'support']
      },
      structure: {
        'What\'s the problem?': 'Could you please clarify the specific issue we\'re dealing with?',
        'Let\'s fix it.': 'Let\'s work together to find an appropriate solution.',
        'Good idea!': 'That\'s a sensible approach that should address the issue effectively.'
      }
    },
    {
      question: 'Identify problem-solving keywords in conversations.',
      keyPoints: ['problem signals', 'suggestion phrases', 'agreement markers', 'decision indicators']
    }
  ),

  // Listening Part 2: Daily Life Conversation
  createCard(
    'listening-part2-daily-life',
    CardType.LISTENING_KEYWORD,
    '听力Part 2：日常对话关键词',
    'Listening Part 2 - 日常生活场景的关键词：购物、预约、服务',
    DifficultyLevel.CLB7,
    'neutral',
    {
      shopping: [
        'How much does this cost?',
        'Is this on sale?',
        'Can I try this on?',
        'Do you have this in a different size/color?'
      ],
      appointments: [
        'I\'d like to schedule an appointment.',
        'When is the earliest available time?',
        'I need to reschedule my appointment.',
        'Can you fit me in today?'
      ],
      services: [
        'How long will this take?',
        'What does the service include?',
        'Is there a warranty?',
        'Can I get a receipt?'
      ],
      payment: [
        'Do you accept credit cards?',
        'Can I pay in installments?',
        'Is there a deposit required?',
        'What\'s the total with tax?'
      ]
    },
    {
      vocabulary: {
        'buy': ['purchase', 'get', 'acquire'],
        'cheap': ['affordable', 'economical', 'budget-friendly'],
        'book': ['schedule', 'reserve', 'arrange'],
        'pay': ['settle', 'remit', 'cover']
      },
      structure: {
        'How much is it?': 'Could you please inform me of the price for this item?',
        'I want to make an appointment.': 'I would like to schedule an appointment at your earliest convenience.',
        'Can I pay by card?': 'Do you accept credit or debit card payments?'
      }
    },
    {
      question: 'Listen for keywords in daily life conversations.',
      keyPoints: ['transaction vocabulary', 'time expressions', 'service-related terms', 'payment methods']
    }
  ),

  // Listening Part 3: Information
  createCard(
    'listening-part3-information',
    CardType.LISTENING_KEYWORD,
    '听力Part 3：信息获取关键词',
    'Listening Part 3 - 从说明性对话中提取信息的关键词',
    DifficultyLevel.CLB8,
    'neutral',
    {
      instructionMarkers: [
        'First, you need to...',
        'Make sure you...',
        'Don\'t forget to...',
        'The most important thing is...'
      ],
      sequenceWords: [
        'To begin with...',
        'After that...',
        'Next...',
        'Finally...'
      ],
      emphasisPhrases: [
        'It\'s essential that...',
        'Please note that...',
        'Keep in mind...',
        'Pay special attention to...'
      ],
      clarificationPhrases: [
        'In other words...',
        'What I mean is...',
        'To clarify...',
        'Specifically...'
      ]
    },
    {
      vocabulary: {
        'important': ['crucial', 'essential', 'vital'],
        'next': ['subsequently', 'following that', 'afterward'],
        'remember': ['keep in mind', 'bear in mind', 'note'],
        'must': ['have to', 'need to', 'required to']
      },
      structure: {
        'First, do this.': 'The initial step involves completing the following procedure.',
        'Don\'t forget!': 'It is essential that you remember this important point.',
        'This is important.': 'Please pay particular attention to this crucial detail.'
      }
    },
    {
      question: 'Identify information markers in instructional content.',
      keyPoints: ['sequence words', 'emphasis signals', 'instruction markers', 'clarification phrases']
    }
  ),

  // Listening Part 4: News Item
  createCard(
    'listening-part4-news',
    CardType.LISTENING_KEYWORD,
    '听力Part 4：新闻关键词',
    'Listening Part 4 - 新闻报道中的关键词和结构',
    DifficultyLevel.CLB8,
    'neutral',
    {
      newsIntroduction: [
        'According to a recent report...',
        'A study has found that...',
        'Officials announced today that...',
        'Breaking news...'
      ],
      sourceReferences: [
        'Experts say...',
        'Researchers believe...',
        'Government data shows...',
        'Sources indicate...'
      ],
      impactPhrases: [
        'This will affect...',
        'The consequences include...',
        'As a result...',
        'This means that...'
      ],
      futurePredictions: [
        'It is expected that...',
        'This trend is likely to...',
        'In the coming months...',
        'Future projections suggest...'
      ]
    },
    {
      vocabulary: {
        'report': ['study', 'survey', 'investigation'],
        'increase': ['rise', 'growth', 'surge'],
        'decrease': ['decline', 'drop', 'reduction'],
        'change': ['shift', 'transition', 'transformation']
      },
      structure: {
        'The news says...': 'According to the latest reports...',
        'More people are doing this.': 'Statistics indicate a significant increase in...',
        'This might happen.': 'Analysts predict that this trend will continue...'
      }
    },
    {
      question: 'Identify key elements in news reports.',
      keyPoints: ['source references', 'main facts', 'impact statements', 'predictions']
    }
  ),

  // Listening Part 5: Discussion
  createCard(
    'listening-part5-discussion',
    CardType.LISTENING_KEYWORD,
    '听力Part 5：讨论关键词',
    'Listening Part 5 - 多人讨论中追踪观点和立场的关键词',
    DifficultyLevel.CLB9,
    'neutral',
    {
      opinionMarkers: [
        'In my opinion...',
        'I believe that...',
        'From my perspective...',
        'The way I see it...'
      ],
      agreementExpressions: [
        'I completely agree with...',
        'That\'s exactly what I think.',
        'You make a valid point.',
        'I couldn\'t agree more.'
      ],
      disagreementExpressions: [
        'I see your point, but...',
        'I respectfully disagree because...',
        'That\'s one way to look at it, however...',
        'I\'m not entirely convinced that...'
      ],
      transitionPhrases: [
        'Moving on to another point...',
        'On the other hand...',
        'However...',
        'In contrast to that...'
      ]
    },
    {
      vocabulary: {
        'agree': ['concur', 'support', 'endorse'],
        'disagree': ['object', 'differ', 'dispute'],
        'point': ['argument', 'perspective', 'viewpoint'],
        'however': ['nevertheless', 'nonetheless', 'yet']
      },
      structure: {
        'I think...': 'From my perspective, the situation is...',
        'I agree with you.': 'Your argument makes a compelling case, and I share your view.',
        'But I think differently.': 'While I understand your perspective, I would offer an alternative viewpoint.'
      }
    },
    {
      question: 'Track speakers\' opinions in group discussions.',
      keyPoints: ['opinion markers', 'speaker changes', 'agreement/disagreement', 'topic transitions']
    }
  ),

  // Listening Part 6: Viewpoints
  createCard(
    'listening-part6-viewpoints',
    CardType.LISTENING_KEYWORD,
    '听力Part 6：观点对比关键词',
    'Listening Part 6 - 识别和比较不同观点的关键词',
    DifficultyLevel.CLB9,
    'neutral',
    {
      positionMarkers: [
        'The first speaker argues that...',
        'Another perspective is that...',
        'Some people believe...',
        'Critics contend that...'
      ],
      supportingEvidence: [
        'Research supports this view because...',
        'This is demonstrated by...',
        'Evidence suggests that...',
        'For example...'
      ],
      counterarguments: [
        'On the contrary...',
        'However, opponents argue...',
        'A different view holds that...',
        'Critics of this position say...'
      ],
      evaluationPhrases: [
        'The strongest argument is...',
        'A weakness in this position is...',
        'The evidence clearly shows...',
        'Both sides have merit, but...'
      ]
    },
    {
      vocabulary: {
        'support': ['advocate', 'champion', 'back'],
        'oppose': ['contest', 'challenge', 'refute'],
        'evidence': ['proof', 'data', 'findings'],
        'conclude': ['determine', 'establish', 'deduce']
      },
      structure: {
        'One person says this, another says that.': 'While some advocate for one approach, others maintain an opposing viewpoint.',
        'The proof shows...': 'The available evidence strongly supports the conclusion that...',
        'I think the first person is right.': 'The first argument presents more compelling reasoning because...'
      }
    },
    {
      question: 'Compare and evaluate different viewpoints in discussions.',
      keyPoints: ['identify positions', 'note evidence', 'track counterarguments', 'evaluate strength']
    }
  ),

  // Workplace Listening
  createCard(
    'listening-workplace-meeting',
    CardType.LISTENING_KEYWORD,
    '职场听力：会议关键词',
    '职场场景 - 会议讨论中的关键词和表达',
    DifficultyLevel.CLB8,
    'formal',
    {
      agendaItems: [
        'The purpose of today\'s meeting is...',
        'The first item on the agenda is...',
        'Let\'s move on to...',
        'Before we conclude...'
      ],
      assignmentPhrases: [
        'Who would like to take the lead on...?',
        'Can you handle...?',
        'I\'ll need you to...',
        'The deadline for this is...'
      ],
      decisionPhrases: [
        'So we\'ve agreed that...',
        'The decision is to...',
        'Going forward, we will...',
        'Let\'s finalize...'
      ],
      followUpPhrases: [
        'We\'ll need to revisit this...',
        'Let\'s schedule a follow-up...',
        'Please report back by...',
        'I\'ll send out the minutes...'
      ]
    },
    {
      vocabulary: {
        'meeting': ['conference', 'session', 'gathering'],
        'discuss': ['address', 'review', 'examine'],
        'decide': ['determine', 'resolve', 'conclude'],
        'task': ['assignment', 'responsibility', 'action item']
      },
      structure: {
        'Let\'s talk about...': 'The next item we need to address is...',
        'You should do this.': 'Could you take responsibility for this action item?',
        'When is it due?': 'What is the expected completion date for this deliverable?'
      }
    },
    {
      question: 'Identify key elements in workplace meetings.',
      keyPoints: ['agenda items', 'task assignments', 'decisions made', 'follow-up actions']
    }
  ),

  // Academic Listening
  createCard(
    'listening-academic-lecture',
    CardType.LISTENING_KEYWORD,
    '学术听力：讲座关键词',
    '学术场景 - 讲座和演讲中的关键词和结构',
    DifficultyLevel.CLB9,
    'formal',
    {
      topicIntroduction: [
        'Today we\'ll be examining...',
        'The focus of this lecture is...',
        'I\'d like to begin by discussing...',
        'This brings us to the question of...'
      ],
      mainPoints: [
        'There are three key aspects to consider...',
        'The primary factors include...',
        'Let me highlight the main points...',
        'The essential elements are...'
      ],
      examples: [
        'For instance...',
        'A good example of this is...',
        'To illustrate this point...',
        'Consider the case of...'
      ],
      conclusions: [
        'In summary...',
        'To conclude...',
        'The key takeaway is...',
        'What we\'ve learned today...'
      ]
    },
    {
      vocabulary: {
        'discuss': ['examine', 'analyze', 'explore'],
        'important': ['significant', 'crucial', 'noteworthy'],
        'example': ['instance', 'illustration', 'case study'],
        'conclude': ['summarize', 'wrap up', 'finalize']
      },
      structure: {
        'Today we\'ll learn about...': 'In this lecture, we will examine the key aspects of...',
        'Here\'s an example.': 'To illustrate this concept, consider the following case...',
        'To summarize...': 'In conclusion, the main points we\'ve covered include...'
      }
    },
    {
      question: 'Identify lecture structure and key information.',
      keyPoints: ['topic introduction', 'main points', 'supporting examples', 'conclusions']
    }
  ),

  // ==========================================
  // === GRAMMAR AND VOCABULARY (8张) ===
  // ==========================================

  createCard(
    'vocab-connectors-contrast',
    CardType.LISTENING_KEYWORD,
    '连接词：对比和转折',
    '写作和口语中表示对比和转折的连接词和表达',
    DifficultyLevel.CLB8,
    'neutral',
    {
      simpleContrast: [
        'but',
        'yet',
        'while',
        'whereas'
      ],
      formalContrast: [
        'however',
        'nevertheless',
        'nonetheless',
        'on the other hand'
      ],
      concession: [
        'although',
        'even though',
        'despite',
        'in spite of'
      ],
      unexpectedResult: [
        'surprisingly',
        'unexpectedly',
        'contrary to expectations',
        'against all odds'
      ]
    },
    {
      vocabulary: {
        'but': ['however', 'yet', 'nevertheless'],
        'although': ['even though', 'despite the fact that', 'notwithstanding'],
        'opposite': ['contrary', 'converse', 'inverse'],
        'different': ['distinct', 'contrasting', 'divergent']
      },
      structure: {
        'It\'s good but expensive.': 'While the product offers excellent quality, it comes at a premium price.',
        'Although it\'s hard, I\'ll try.': 'Despite the significant challenges involved, I am committed to pursuing this goal.',
        'However, there are problems.': 'Nevertheless, certain issues warrant careful consideration.'
      }
    },
    {
      question: 'Use contrast connectors to improve your writing and speaking.',
      keyPoints: ['simple vs formal', 'concession', 'unexpected results', 'sentence variety']
    }
  ),

  createCard(
    'vocab-connectors-addition',
    CardType.LISTENING_KEYWORD,
    '连接词：添加和举例',
    '写作和口语中表示添加信息和举例的连接词',
    DifficultyLevel.CLB7,
    'neutral',
    {
      simpleAddition: [
        'and',
        'also',
        'too',
        'as well'
      ],
      formalAddition: [
        'furthermore',
        'moreover',
        'in addition',
        'additionally'
      ],
      examples: [
        'for example',
        'for instance',
        'such as',
        'to illustrate'
      ],
      emphasis: [
        'especially',
        'particularly',
        'in particular',
        'notably'
      ]
    },
    {
      vocabulary: {
        'also': ['furthermore', 'moreover', 'in addition'],
        'example': ['instance', 'illustration', 'case in point'],
        'especially': ['particularly', 'specifically', 'notably'],
        'like': ['such as', 'including', 'namely']
      },
      structure: {
        'I also think...': 'Furthermore, it is worth considering that...',
        'For example, ...': 'To illustrate this point, consider the following scenario...',
        'This is especially important.': 'This aspect warrants particular attention due to its significance.'
      }
    },
    {
      question: 'Use addition and example connectors to develop your ideas.',
      keyPoints: ['building arguments', 'giving examples', 'showing emphasis', 'formal alternatives']
    }
  ),

  createCard(
    'vocab-connectors-cause-effect',
    CardType.LISTENING_KEYWORD,
    '连接词：因果关系',
    '写作和口语中表示因果关系的连接词和表达',
    DifficultyLevel.CLB8,
    'neutral',
    {
      causeMarkers: [
        'because',
        'since',
        'as',
        'due to'
      ],
      effectMarkers: [
        'therefore',
        'consequently',
        'as a result',
        'thus'
      ],
      resultPhrases: [
        'This leads to...',
        'This results in...',
        'This causes...',
        'This contributes to...'
      ],
      conditionalPhrases: [
        'If... then...',
        'Provided that...',
        'Assuming that...',
        'In the event that...'
      ]
    },
    {
      vocabulary: {
        'because': ['since', 'as', 'given that'],
        'so': ['therefore', 'consequently', 'hence'],
        'cause': ['result in', 'lead to', 'bring about'],
        'if': ['provided that', 'assuming', 'on condition that']
      },
      structure: {
        'Because of this, ...': 'Owing to these circumstances, the following outcomes have emerged.',
        'So, it\'s important.': 'Consequently, this matter warrants serious consideration.',
        'If this happens, then...': 'Should this scenario materialize, the likely consequence would be...'
      }
    },
    {
      question: 'Use cause and effect connectors to explain relationships.',
      keyPoints: ['cause markers', 'effect markers', 'result phrases', 'conditional expressions']
    }
  ),

  createCard(
    'vocab-opinion-phrases',
    CardType.LISTENING_KEYWORD,
    '观点表达短语',
    '在写作和口语中表达个人观点的各种方式',
    DifficultyLevel.CLB8,
    'neutral',
    {
      directOpinion: [
        'I think/believe that...',
        'In my opinion...',
        'From my point of view...',
        'As far as I\'m concerned...'
      ],
      strongOpinion: [
        'I am convinced that...',
        'I firmly believe that...',
        'I am confident that...',
        'There is no doubt that...'
      ],
      tentativeOpinion: [
        'It seems to me that...',
        'I would suggest that...',
        'It could be argued that...',
        'One might say that...'
      ],
      generalOpinion: [
        'Many people believe...',
        'It is widely accepted that...',
        'It is commonly thought that...',
        'Some experts argue that...'
      ]
    },
    {
      vocabulary: {
        'think': ['believe', 'consider', 'maintain'],
        'sure': ['certain', 'convinced', 'confident'],
        'maybe': ['perhaps', 'possibly', 'arguably'],
        'people say': ['it is argued', 'it is claimed', 'it is suggested']
      },
      structure: {
        'I think...': 'From my perspective, the situation warrants careful consideration.',
        'I\'m sure that...': 'I am firmly convinced that this approach is the most effective.',
        'Maybe this is true.': 'It could reasonably be argued that there is merit to this position.'
      }
    },
    {
      question: 'Express opinions with appropriate phrases for different situations.',
      keyPoints: ['direct vs indirect', 'strong vs tentative', 'personal vs general', 'formal register']
    }
  ),

  // Advanced Vocabulary
  createCard(
    'vocab-academic-verbs',
    CardType.LISTENING_KEYWORD,
    '学术动词替换',
    '将基础动词替换为学术水平的动词以提高写作分数',
    DifficultyLevel.CLB9,
    'formal',
    {
      analysisVerbs: [
        'analyze → examine, investigate, scrutinize',
        'show → demonstrate, illustrate, indicate',
        'prove → establish, verify, substantiate',
        'suggest → imply, intimate, insinuate'
      ],
      changeVerbs: [
        'change → transform, modify, alter',
        'improve → enhance, optimize, ameliorate',
        'reduce → diminish, minimize, mitigate',
        'increase → amplify, augment, escalate'
      ],
      argumentVerbs: [
        'say → assert, contend, maintain',
        'disagree → dispute, challenge, refute',
        'support → advocate, endorse, uphold',
        'oppose → contest, counter, rebut'
      ],
      processVerbs: [
        'do → execute, implement, undertake',
        'make → create, produce, generate',
        'use → utilize, employ, apply',
        'get → obtain, acquire, procure'
      ]
    },
    {
      vocabulary: {
        'say': ['assert', 'contend', 'maintain'],
        'show': ['demonstrate', 'illustrate', 'reveal'],
        'get': ['obtain', 'acquire', 'secure'],
        'make': ['create', 'generate', 'produce']
      },
      structure: {
        'The study shows that...': 'The research demonstrates a significant correlation between...',
        'This will help improve...': 'This intervention will substantially enhance...',
        'Many people disagree with...': 'Numerous scholars dispute the validity of...'
      }
    },
    {
      question: 'Replace basic verbs with academic alternatives.',
      keyPoints: ['analysis verbs', 'change verbs', 'argument verbs', 'appropriate context']
    }
  ),

  createCard(
    'vocab-hedging-language',
    CardType.LISTENING_KEYWORD,
    '谨慎表达语言',
    '学术写作中的谨慎表达和限定语',
    DifficultyLevel.CLB9,
    'formal',
    {
      modalVerbs: [
        'may, might, could',
        'would, should',
        'can, could',
        'will (rarely in academic writing)'
      ],
      hedgingPhrases: [
        'It appears that...',
        'This suggests that...',
        'Evidence indicates that...',
        'Research tends to show that...'
      ],
      quantityHedges: [
        'most, many, some, few',
        'approximately, roughly, about',
        'generally, typically, usually',
        'often, sometimes, occasionally'
      ],
      limitationPhrases: [
        'to some extent',
        'in most cases',
        'under certain circumstances',
        'with some exceptions'
      ]
    },
    {
      vocabulary: {
        'always': ['generally', 'typically', 'in most cases'],
        'never': ['rarely', 'seldom', 'infrequently'],
        'all': ['most', 'the majority of', 'many'],
        'certain': ['probable', 'likely', 'possible']
      },
      structure: {
        'This is true.': 'This appears to be the case in the majority of instances.',
        'Everyone agrees.': 'There is considerable consensus among experts regarding...',
        'This always happens.': 'This outcome tends to occur under typical circumstances.'
      }
    },
    {
      question: 'Use hedging language for academic and professional writing.',
      keyPoints: ['modal verbs', 'hedging phrases', 'quantity hedges', 'avoiding absolutes']
    }
  ),

  // ==========================================
  // === WRITING TASK 1 扩展卡片 (Batch 1) ===
  // ==========================================

  // 请求类 - 请假申请
  createCard(
    'writing-task1-request-leave',
    CardType.WRITING_TASK1,
    '向经理申请休假',
    '你需要请假一周参加家庭活动，向经理发送请假邮件',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'I am writing to formally request time off from work.',
        'I would like to request your approval for annual leave.',
        'I hope this email finds you well. I am reaching out regarding a leave request.'
      ],
      purpose: [
        'I am requesting one week of annual leave from [start date] to [end date].',
        'I would like to take time off to attend an important family event.',
        'This leave is necessary for personal family commitments.'
      ],
      details: [
        'I will ensure all my current projects are completed or properly handed over.',
        'I have arranged for [colleague name] to cover my responsibilities during my absence.',
        'I will remain reachable via email for any urgent matters.'
      ],
      closing: [
        'I would be grateful if you could approve this request.',
        'Please let me know if you require any additional information.',
        'Thank you for considering my request.'
      ]
    },
    {
      vocabulary: {
        'ask': ['request', 'seek approval for', 'apply for'],
        'important': ['significant', 'essential', 'vital'],
        'cover': ['handle', 'manage', 'take responsibility for'],
        'give': ['provide', 'submit', 'offer']
      },
      structure: {
        'I want to take time off.': 'I would like to formally request annual leave for the specified period.',
        'My coworker can do my work.': 'I have arranged for a qualified colleague to manage my responsibilities in my absence.',
        'Call me if you need me.': 'I will remain accessible via email for any urgent matters requiring my attention.'
      }
    },
    {
      question: 'Write an email to your manager requesting one week of annual leave.',
      keyPoints: ['specific dates', 'reason for leave', 'coverage arrangements', 'professional tone']
    }
  ),

  // 请求类 - 信息查询
  createCard(
    'writing-task1-request-information',
    CardType.WRITING_TASK1,
    '向公司查询服务信息',
    '你想参加一个健身中心的课程，发邮件询问课程详情和费用',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to inquire about the fitness classes offered at your center.',
        'I recently learned about your facility and would like more information.',
        'I am interested in joining your fitness center and have a few questions.'
      ],
      purpose: [
        'I would like to know more about the group fitness classes you offer.',
        'Could you please provide details about membership options and pricing?',
        'I am particularly interested in yoga and spinning classes.'
      ],
      details: [
        'What are the class schedules for beginners?',
        'Are there any introductory offers for new members?',
        'Is equipment included in the membership fee?'
      ],
      closing: [
        'I look forward to hearing from you soon.',
        'Please feel free to contact me if you need any further information.',
        'Thank you for your time and assistance.'
      ]
    },
    {
      vocabulary: {
        'want to know': ['would like to inquire about', 'am interested in learning about'],
        'how much': ['pricing', 'cost', 'rates'],
        'when': ['schedule', 'timing', 'availability'],
        'stuff': ['equipment', 'facilities', 'amenities']
      },
      structure: {
        'What classes do you have?': 'I would appreciate information about the range of classes available.',
        'How much does it cost?': 'Could you kindly provide details regarding membership fees and pricing options?',
        'When can I come?': 'What are the operating hours and class schedules?'
      }
    },
    {
      question: 'Write an email to a fitness center asking about their classes and membership.',
      keyPoints: ['specific questions', 'show interest', 'request details', 'polite inquiries']
    }
  ),

  // 邀请类 - 活动邀请
  createCard(
    'writing-task1-invitation-event',
    CardType.WRITING_TASK1,
    '邀请同事参加送别派对',
    '一位同事即将离职，你想邀请其他同事参加送别派对',
    DifficultyLevel.CLB7,
    'informal',
    {
      opening: [
        'I hope you are doing well!',
        'I wanted to reach out with some exciting news.',
        'As you may know, our colleague Sarah is leaving the company next week.'
      ],
      purpose: [
        'I am organizing a farewell party for her and would love for you to join us.',
        'We are planning a small gathering to celebrate her time with us.',
        'I think it would be wonderful to give her a proper send-off.'
      ],
      details: [
        'The party will be held on Friday, March 15th at 6 PM.',
        'We will meet at The Blue Café on Main Street.',
        'Please let me know by Wednesday if you can make it so I can finalize the reservations.'
      ],
      closing: [
        'It would be great to see you there!',
        'I hope you can join us for this special occasion.',
        'Please feel free to reach out if you have any questions.'
      ]
    },
    {
      vocabulary: {
        'party': ['gathering', 'celebration', 'get-together'],
        'come': ['attend', 'join us', 'be present'],
        'tell me': ['let me know', 'confirm', 'RSVP'],
        'fun': ['enjoyable', 'memorable', 'special']
      },
      structure: {
        'Can you come to the party?': 'I would be delighted if you could join us for this special occasion.',
        'Tell me if you can come.': 'Please confirm your attendance by Wednesday.',
        'It will be fun!': 'It promises to be a memorable evening celebrating Sarah\'s contributions.'
      }
    },
    {
      question: 'Write an email inviting colleagues to a farewell party.',
      keyPoints: ['occasion explained', 'date/time/location', 'RSVP deadline', 'friendly tone']
    }
  ),

  // 道歉类 - 缺席道歉
  createCard(
    'writing-task1-apology-absence',
    CardType.WRITING_TASK1,
    '为缺席会议道歉',
    '你因突发情况错过了重要的团队会议，需要向经理道歉',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to sincerely apologize for my absence from yesterday\'s team meeting.',
        'Please accept my apologies for not attending the scheduled meeting.',
        'I deeply regret that I was unable to participate in the important discussion yesterday.'
      ],
      purpose: [
        'Due to an unexpected family emergency, I was unable to attend.',
        'Unfortunately, a sudden personal matter required my immediate attention.',
        'I understand the importance of this meeting and regret missing it.'
      ],
      details: [
        'I have already reviewed the meeting minutes and action items.',
        'I will follow up with relevant colleagues to ensure I am up to speed.',
        'I am committed to completing any tasks assigned to me during the meeting.'
      ],
      closing: [
        'I assure you this will not happen again.',
        'Please let me know if there is anything I can do to make up for my absence.',
        'Thank you for your understanding.'
      ]
    },
    {
      vocabulary: {
        'sorry': ['apologize', 'regret', 'express remorse'],
        'miss': ['be absent from', 'fail to attend', 'unable to participate'],
        'problem': ['emergency', 'urgent matter', 'unforeseen circumstance'],
        'again': ['in the future', 'going forward', 'henceforth']
      },
      structure: {
        'I\'m sorry I missed the meeting.': 'I sincerely apologize for my absence from yesterday\'s important team meeting.',
        'I had a problem.': 'An unexpected personal emergency required my immediate attention.',
        'It won\'t happen again.': 'I am committed to ensuring this does not occur in the future.'
      }
    },
    {
      question: 'Write an email apologizing to your manager for missing a meeting.',
      keyPoints: ['sincere apology', 'brief explanation', 'steps to catch up', 'commitment']
    }
  ),

  // 感谢类 - 感谢推荐
  createCard(
    'writing-task1-thank-recommendation',
    CardType.WRITING_TASK1,
    '感谢前上司的推荐信',
    '你的前上司为你写了一封推荐信，帮助你获得了新工作',
    DifficultyLevel.CLB8,
    'semi-formal',
    {
      opening: [
        'I wanted to take a moment to express my heartfelt gratitude.',
        'I am writing to thank you for your generous recommendation.',
        'I hope this email finds you well. I have some wonderful news to share.'
      ],
      purpose: [
        'Thanks to your recommendation letter, I have been offered the marketing position at ABC Company.',
        'Your endorsement played a significant role in helping me secure this opportunity.',
        'I truly appreciate you taking the time to write such a thoughtful reference.'
      ],
      details: [
        'The hiring manager specifically mentioned how impressed they were with your letter.',
        'I will start my new role on April 1st and am very excited about this opportunity.',
        'The skills and values you mentioned in the letter directly aligned with what they were seeking.'
      ],
      closing: [
        'I am deeply grateful for your support throughout my career.',
        'I hope to stay in touch and perhaps repay the kindness someday.',
        'Thank you once again for believing in me.'
      ]
    },
    {
      vocabulary: {
        'thank': ['express gratitude', 'appreciate', 'acknowledge'],
        'help': ['support', 'assistance', 'endorsement'],
        'got the job': ['secured the position', 'received an offer', 'was appointed'],
        'nice': ['thoughtful', 'generous', 'kind']
      },
      structure: {
        'Thanks for the letter.': 'I am deeply grateful for the thoughtful recommendation letter you provided.',
        'I got the job!': 'I am delighted to inform you that I have been offered the position.',
        'It really helped.': 'Your endorsement played an instrumental role in securing this opportunity.'
      }
    },
    {
      question: 'Write an email thanking your former supervisor for a recommendation letter.',
      keyPoints: ['sincere thanks', 'good news shared', 'specific appreciation', 'maintain relationship']
    }
  ),

  // 建议类 - 工作流程改进
  createCard(
    'writing-task1-suggestion-process',
    CardType.WRITING_TASK1,
    '向经理提出流程改进建议',
    '你发现了可以提高团队效率的方法，想向经理提出建议',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to share some observations about our current workflow.',
        'I have been thinking about ways to improve our team\'s efficiency.',
        'I hope you don\'t mind me sharing some suggestions regarding our processes.'
      ],
      purpose: [
        'I believe we could significantly reduce processing time by implementing a new system.',
        'I would like to suggest adopting project management software for our team.',
        'I have identified an opportunity to streamline our reporting procedures.'
      ],
      details: [
        'Currently, we spend approximately 5 hours weekly on manual status updates.',
        'Using a tool like Asana or Trello could automate much of this process.',
        'Based on my research, similar teams have seen a 30% improvement in productivity.'
      ],
      closing: [
        'I would be happy to prepare a detailed proposal if you are interested.',
        'I am available to discuss this further at your convenience.',
        'Thank you for considering my suggestion.'
      ]
    },
    {
      vocabulary: {
        'idea': ['suggestion', 'proposal', 'recommendation'],
        'better': ['more efficient', 'improved', 'optimized'],
        'waste time': ['inefficient', 'time-consuming', 'labor-intensive'],
        'try': ['implement', 'adopt', 'introduce']
      },
      structure: {
        'I have an idea.': 'I would like to propose a suggestion for improving our current workflow.',
        'We waste a lot of time.': 'Our current process involves significant time-consuming manual tasks.',
        'This will make things better.': 'Implementing this solution could substantially enhance our team\'s productivity.'
      }
    },
    {
      question: 'Write an email suggesting a workflow improvement to your manager.',
      keyPoints: ['clear suggestion', 'current problem', 'proposed solution', 'benefits']
    }
  ),

  // 投诉类 - 服务投诉
  createCard(
    'writing-task1-complaint-service',
    CardType.WRITING_TASK1,
    '投诉餐厅糟糕的服务',
    '你在餐厅有一次非常不愉快的用餐体验，想向经理投诉',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to express my disappointment with a recent dining experience.',
        'I feel compelled to bring to your attention an incident that occurred last Saturday.',
        'As a regular customer of your establishment, I was very disappointed by my recent visit.'
      ],
      purpose: [
        'The service I received on March 10th fell far below acceptable standards.',
        'Several issues during my visit made the experience extremely unsatisfactory.',
        'I believe you should be aware of the problems I encountered.'
      ],
      details: [
        'We waited 45 minutes for our food despite the restaurant being only half full.',
        'When the food arrived, my order was incorrect and the meal was cold.',
        'The waiter was dismissive when I raised these concerns.'
      ],
      closing: [
        'I trust you will take appropriate action to address these issues.',
        'I would appreciate a response regarding how you plan to prevent such incidents.',
        'I hope my feedback helps improve the experience for future customers.'
      ]
    },
    {
      vocabulary: {
        'bad': ['unsatisfactory', 'substandard', 'disappointing'],
        'slow': ['delayed', 'prolonged', 'excessive wait'],
        'wrong': ['incorrect', 'inaccurate', 'mistaken'],
        'rude': ['dismissive', 'unprofessional', 'discourteous']
      },
      structure: {
        'The service was bad.': 'The quality of service fell significantly below reasonable expectations.',
        'We waited too long.': 'The wait time was excessive and unreasonable given the circumstances.',
        'The waiter was rude.': 'The staff member\'s response was dismissive and unprofessional.'
      }
    },
    {
      question: 'Write an email complaining about poor service at a restaurant.',
      keyPoints: ['specific incidents', 'impact on experience', 'professional tone', 'desired outcome']
    }
  ),

  // 推荐类 - 推荐员工
  createCard(
    'writing-task1-recommendation-employee',
    CardType.WRITING_TASK1,
    '推荐同事升职',
    '你认为某位同事表现出色，值得升职，向人力资源部门推荐',
    DifficultyLevel.CLB9,
    'formal',
    {
      opening: [
        'I am writing to recommend John Chen for the Senior Analyst position.',
        'I would like to formally endorse a colleague for consideration in the upcoming promotion cycle.',
        'It is my pleasure to recommend an exceptional team member for advancement.'
      ],
      purpose: [
        'John has consistently demonstrated outstanding performance and leadership qualities.',
        'His contributions to our department have been invaluable over the past three years.',
        'I believe he possesses all the qualities necessary for senior-level responsibilities.'
      ],
      details: [
        'He successfully led the Q3 project that increased revenue by 25%.',
        'His problem-solving abilities and analytical skills are exceptional.',
        'John has mentored three junior team members, helping them develop professionally.'
      ],
      closing: [
        'I strongly believe John would excel in a senior role.',
        'Please feel free to contact me if you require any additional information.',
        'I wholeheartedly recommend him for this promotion.'
      ]
    },
    {
      vocabulary: {
        'good': ['exceptional', 'outstanding', 'exemplary'],
        'work': ['contributions', 'achievements', 'accomplishments'],
        'help': ['mentor', 'guide', 'support'],
        'should be promoted': ['deserves advancement', 'merits promotion', 'is qualified for']
      },
      structure: {
        'He is a good worker.': 'He has consistently demonstrated exceptional performance and dedication.',
        'He helped the team a lot.': 'His contributions have been invaluable to our team\'s success.',
        'He should be promoted.': 'I strongly believe he merits consideration for this advancement opportunity.'
      }
    },
    {
      question: 'Write an email recommending a colleague for promotion.',
      keyPoints: ['specific achievements', 'relevant skills', 'leadership examples', 'strong endorsement']
    }
  ),

  // 申请类 - 志愿者申请
  createCard(
    'writing-task1-application-volunteer',
    CardType.WRITING_TASK1,
    '申请成为社区志愿者',
    '你想在当地社区中心做志愿者，写邮件申请',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to express my interest in volunteering at your community center.',
        'I recently learned about your volunteer program and would love to participate.',
        'I am eager to contribute my time and skills to your organization.'
      ],
      purpose: [
        'I am particularly interested in helping with the youth literacy program.',
        'I believe my background in education would be valuable to your programs.',
        'I have always been passionate about community service and making a difference.'
      ],
      details: [
        'I have five years of experience working with children as a teacher\'s assistant.',
        'I am available on weekends and two evenings during the week.',
        'I hold a valid police background check and First Aid certification.'
      ],
      closing: [
        'I would be honored to contribute to your important work.',
        'Please let me know if there are any additional requirements or next steps.',
        'Thank you for considering my application.'
      ]
    },
    {
      vocabulary: {
        'want to help': ['wish to contribute', 'am eager to assist', 'would like to volunteer'],
        'good at': ['experienced in', 'skilled at', 'proficient in'],
        'free time': ['availability', 'schedule flexibility', 'available hours'],
        'like': ['passionate about', 'committed to', 'dedicated to']
      },
      structure: {
        'I want to volunteer.': 'I am writing to express my keen interest in joining your volunteer program.',
        'I am good at working with kids.': 'I have extensive experience and demonstrated skill in working with children.',
        'I can work on weekends.': 'I have flexible availability on weekends and select evenings.'
      }
    },
    {
      question: 'Write an email applying to volunteer at a community center.',
      keyPoints: ['specific interest area', 'relevant experience', 'availability', 'enthusiasm']
    }
  ),

  // 通知类 - 地址变更通知
  createCard(
    'writing-task1-notice-address',
    CardType.WRITING_TASK1,
    '通知银行地址变更',
    '你搬家了，需要通知银行更新你的地址信息',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'I am writing to inform you of a change in my residential address.',
        'I would like to request an update to my account information.',
        'Please be advised that I have recently relocated to a new address.'
      ],
      purpose: [
        'Effective April 1st, my new address will be as follows.',
        'I kindly request that all future correspondence be sent to my new address.',
        'Please update my records to reflect this change.'
      ],
      details: [
        'My account number is 123456789.',
        'New address: 456 Oak Avenue, Unit 12, Vancouver, BC V6B 2W3.',
        'Previous address: 123 Maple Street, Apt 5, Vancouver, BC V6A 1B2.'
      ],
      closing: [
        'Please confirm receipt of this request.',
        'If you require any verification or documentation, please let me know.',
        'Thank you for your prompt attention to this matter.'
      ]
    },
    {
      vocabulary: {
        'moved': ['relocated', 'changed residence', 'transferred'],
        'new': ['updated', 'current', 'revised'],
        'change': ['update', 'modification', 'amendment'],
        'tell': ['inform', 'notify', 'advise']
      },
      structure: {
        'I moved to a new place.': 'I would like to inform you that I have relocated to a new residence.',
        'Please send mail to my new address.': 'I kindly request that all future correspondence be directed to my updated address.',
        'Let me know if you got this.': 'Please confirm receipt of this notification at your earliest convenience.'
      }
    },
    {
      question: 'Write an email to your bank informing them of your address change.',
      keyPoints: ['clear purpose', 'account information', 'old and new addresses', 'confirmation request']
    }
  ),

  // ==========================================
  // === WRITING TASK 1 扩展卡片 (Batch 2) ===
  // ==========================================

  // 取消类 - 取消预订
  createCard(
    'writing-task1-cancel-reservation',
    CardType.WRITING_TASK1,
    '取消酒店预订',
    '因行程变更，你需要取消下周的酒店预订',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'I am writing to request the cancellation of my upcoming hotel reservation.',
        'I regret to inform you that I need to cancel my booking.',
        'Due to unforeseen circumstances, I must cancel my reservation.'
      ],
      purpose: [
        'I would like to cancel my reservation for March 20-23, 2025.',
        'My booking confirmation number is HTL789456.',
        'The reservation was made under the name [Your Name].'
      ],
      details: [
        'Unfortunately, my business trip has been postponed indefinitely.',
        'I understand your cancellation policy and am within the free cancellation window.',
        'If possible, I would appreciate a full refund to my original payment method.'
      ],
      closing: [
        'Please confirm the cancellation and refund details at your earliest convenience.',
        'I apologize for any inconvenience this may cause.',
        'Thank you for your understanding and assistance.'
      ]
    },
    {
      vocabulary: {
        'cancel': ['terminate', 'revoke', 'annul'],
        'booking': ['reservation', 'arrangement', 'appointment'],
        'money back': ['refund', 'reimbursement', 'credit'],
        'plans changed': ['circumstances changed', 'unforeseen events', 'schedule conflict']
      },
      structure: {
        'I need to cancel my booking.': 'I am writing to request the cancellation of my reservation.',
        'Can I get my money back?': 'I would appreciate confirmation regarding the refund process.',
        'My plans changed.': 'Due to unforeseen circumstances, I am unable to proceed with my original plans.'
      }
    },
    {
      question: 'Write an email to a hotel to cancel your reservation.',
      keyPoints: ['reservation details', 'reason for cancellation', 'refund request', 'apology']
    }
  ),

  // 工作查询 - 询问工作机会
  createCard(
    'writing-task1-job-inquiry',
    CardType.WRITING_TASK1,
    '询问公司工作机会',
    '你对一家公司很感兴趣，想询问是否有合适的工作机会',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to inquire about potential employment opportunities at your company.',
        'I have long admired your organization and am interested in joining your team.',
        'I am reaching out to express my interest in pursuing a career with your company.'
      ],
      purpose: [
        'I am particularly interested in positions within your marketing department.',
        'With my background in digital marketing, I believe I could contribute to your team.',
        'I would appreciate any information about current or upcoming openings.'
      ],
      details: [
        'I have five years of experience in marketing with a focus on social media strategy.',
        'I have attached my resume for your review.',
        'I am available for an interview at your convenience.'
      ],
      closing: [
        'I would be grateful for the opportunity to discuss how I might contribute to your organization.',
        'Thank you for considering my inquiry.',
        'I look forward to hearing from you.'
      ]
    },
    {
      vocabulary: {
        'job': ['position', 'opportunity', 'role'],
        'interested': ['keen', 'eager', 'enthusiastic'],
        'experience': ['background', 'expertise', 'qualifications'],
        'good at': ['skilled in', 'proficient in', 'experienced with']
      },
      structure: {
        'Do you have any jobs?': 'I am writing to inquire about potential employment opportunities.',
        'I want to work here.': 'I would be honored to contribute my skills to your organization.',
        'I have worked in marketing for 5 years.': 'I bring five years of comprehensive marketing experience.'
      }
    },
    {
      question: 'Write an email inquiring about job opportunities at a company.',
      keyPoints: ['express interest', 'relevant qualifications', 'specific department', 'professional tone']
    }
  ),

  // 感谢类 - 面试后感谢
  createCard(
    'writing-task1-thank-interview',
    CardType.WRITING_TASK1,
    '面试后发送感谢信',
    '你刚完成一个工作面试，想发送感谢邮件给面试官',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'Thank you for taking the time to meet with me today.',
        'I wanted to express my sincere appreciation for the interview opportunity.',
        'It was a pleasure speaking with you about the Marketing Manager position.'
      ],
      purpose: [
        'I am even more excited about the opportunity after learning more about the role.',
        'Our conversation confirmed my strong interest in joining your team.',
        'The company culture and values you described align perfectly with my own.'
      ],
      details: [
        'I was particularly intrigued by the upcoming product launch you mentioned.',
        'I am confident my experience with digital campaigns would add value to this initiative.',
        'I am prepared to bring fresh ideas and dedicated effort to this position.'
      ],
      closing: [
        'Please do not hesitate to contact me if you need any additional information.',
        'I look forward to the possibility of working together.',
        'Thank you again for this wonderful opportunity.'
      ]
    },
    {
      vocabulary: {
        'thanks': ['gratitude', 'appreciation', 'thankfulness'],
        'excited': ['enthusiastic', 'eager', 'keen'],
        'talked about': ['discussed', 'explored', 'covered'],
        'good fit': ['well-suited', 'ideal match', 'compatible']
      },
      structure: {
        'Thanks for the interview.': 'I sincerely appreciate the opportunity to discuss the position with you.',
        'I really want this job.': 'Our conversation has strengthened my enthusiasm for this opportunity.',
        'Call me if you need more info.': 'Please feel free to contact me should you require any additional information.'
      }
    },
    {
      question: 'Write a thank-you email to an interviewer after a job interview.',
      keyPoints: ['express gratitude', 'reaffirm interest', 'reference specific discussion', 'professional close']
    }
  ),

  // 报告类 - 设施问题报告
  createCard(
    'writing-task1-report-facility',
    CardType.WRITING_TASK1,
    '向物业报告设施问题',
    '你公寓的暖气系统出现故障，需要报告给物业管理',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to report a maintenance issue in my apartment.',
        'I need to bring to your attention a problem with the heating system.',
        'I am contacting you regarding an urgent repair needed in Unit 305.'
      ],
      purpose: [
        'The heating system in my apartment has stopped working properly.',
        'Despite multiple attempts to adjust the thermostat, the apartment remains cold.',
        'This issue requires immediate attention as temperatures are dropping.'
      ],
      details: [
        'The problem started three days ago and has gotten progressively worse.',
        'I have checked the thermostat settings and changed the filter, but the issue persists.',
        'My apartment temperature is currently around 15°C, which is uncomfortably cold.'
      ],
      closing: [
        'I would appreciate if a technician could be sent as soon as possible.',
        'Please let me know when I can expect someone to address this issue.',
        'Thank you for your prompt attention to this matter.'
      ]
    },
    {
      vocabulary: {
        'broken': ['malfunctioning', 'not working properly', 'defective'],
        'fix': ['repair', 'resolve', 'address'],
        'cold': ['uncomfortably low temperature', 'inadequate heating'],
        'soon': ['promptly', 'at your earliest convenience', 'urgently']
      },
      structure: {
        'The heater is broken.': 'The heating system has malfunctioned and is not functioning properly.',
        'Please fix it soon.': 'I would appreciate prompt attention to this repair matter.',
        'It\'s very cold.': 'The current temperature in my apartment is uncomfortably low.'
      }
    },
    {
      question: 'Write an email to building management reporting a heating problem.',
      keyPoints: ['describe problem', 'explain urgency', 'what you\'ve tried', 'request action']
    }
  ),

  // 请求类 - 延期请求
  createCard(
    'writing-task1-request-extension',
    CardType.WRITING_TASK1,
    '请求项目截止日期延期',
    '由于不可预见的情况，你需要请求项目延期提交',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to request an extension for the quarterly report deadline.',
        'I hope this email finds you well. I need to discuss the upcoming project deadline.',
        'I apologize for the short notice, but I must request additional time for my submission.'
      ],
      purpose: [
        'Due to unexpected technical difficulties, I require a one-week extension.',
        'I am requesting that the deadline be moved from March 15th to March 22nd.',
        'This additional time would allow me to ensure the quality of my work.'
      ],
      details: [
        'The data migration issues we encountered last week set back our timeline significantly.',
        'I have completed approximately 80% of the report and need just a few more days.',
        'I want to ensure accuracy and thoroughness rather than submit incomplete work.'
      ],
      closing: [
        'I understand if this is not possible and will do my best to meet the original deadline.',
        'I would be grateful for your understanding in this matter.',
        'Please let me know your decision at your earliest convenience.'
      ]
    },
    {
      vocabulary: {
        'more time': ['extension', 'additional time', 'deadline adjustment'],
        'problem': ['difficulty', 'obstacle', 'setback'],
        'finish': ['complete', 'finalize', 'conclude'],
        'sorry': ['apologize', 'regret', 'understand']
      },
      structure: {
        'I need more time.': 'I am requesting an extension to the current deadline.',
        'We had problems.': 'Unforeseen technical difficulties have impacted our timeline.',
        'I\'m almost done.': 'I have made substantial progress and am near completion.'
      }
    },
    {
      question: 'Write an email requesting a deadline extension for a project.',
      keyPoints: ['clear request', 'valid reason', 'proposed new deadline', 'professional tone']
    }
  ),

  // 退换类 - 商品退换
  createCard(
    'writing-task1-return-exchange',
    CardType.WRITING_TASK1,
    '请求退换有缺陷的商品',
    '你购买的电子产品有制造缺陷，需要申请退换',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing regarding a product I recently purchased from your store.',
        'I would like to request an exchange for a defective item.',
        'I am contacting you about a problem with my recent purchase.'
      ],
      purpose: [
        'The wireless headphones I purchased on March 1st have a manufacturing defect.',
        'The right earpiece produces a constant buzzing sound.',
        'I would like to exchange this item for a functioning replacement.'
      ],
      details: [
        'My order number is #ORD-2025-78543.',
        'I have only used the product twice and have kept all original packaging.',
        'I have attached photos of the receipt and the product for your reference.'
      ],
      closing: [
        'Please advise on the return procedure and next steps.',
        'I would appreciate a prompt resolution to this matter.',
        'Thank you for your assistance.'
      ]
    },
    {
      vocabulary: {
        'broken': ['defective', 'faulty', 'malfunctioning'],
        'change': ['exchange', 'replace', 'swap'],
        'bought': ['purchased', 'acquired', 'ordered'],
        'problem': ['issue', 'defect', 'fault']
      },
      structure: {
        'It doesn\'t work right.': 'The product has a manufacturing defect that affects its functionality.',
        'I want a new one.': 'I would like to exchange this item for a properly functioning replacement.',
        'Here\'s my receipt.': 'I have enclosed proof of purchase for your records.'
      }
    },
    {
      question: 'Write an email requesting to exchange a defective product.',
      keyPoints: ['describe defect', 'order details', 'desired resolution', 'documentation']
    }
  ),

  // 求助类 - 技术支持
  createCard(
    'writing-task1-help-technical',
    CardType.WRITING_TASK1,
    '向IT部门请求技术支持',
    '你的工作电脑出现软件问题，需要IT支持',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to request technical assistance with my work computer.',
        'I am experiencing a software issue that requires IT support.',
        'I need help resolving a problem with my company laptop.'
      ],
      purpose: [
        'My computer has been running extremely slowly since the recent software update.',
        'Several programs crash frequently, disrupting my work.',
        'I have tried basic troubleshooting but the problem persists.'
      ],
      details: [
        'The issue started after the system update on Monday.',
        'Programs like Excel and Teams freeze and crash multiple times daily.',
        'I have already tried restarting the computer and clearing temporary files.'
      ],
      closing: [
        'Could someone from IT please look at my computer at their earliest convenience?',
        'I am available at my desk most of the day if someone needs access.',
        'Thank you for your help with this matter.'
      ]
    },
    {
      vocabulary: {
        'slow': ['sluggish', 'unresponsive', 'lagging'],
        'crash': ['freeze', 'malfunction', 'stop responding'],
        'tried': ['attempted', 'endeavored', 'made efforts'],
        'help': ['assistance', 'support', 'aid']
      },
      structure: {
        'My computer is slow.': 'My workstation is experiencing significant performance issues.',
        'Programs keep crashing.': 'Multiple applications are freezing and crashing frequently.',
        'I need help.': 'I would appreciate technical assistance at your earliest convenience.'
      }
    },
    {
      question: 'Write an email to IT support requesting help with computer problems.',
      keyPoints: ['describe issue', 'when it started', 'what you tried', 'availability']
    }
  ),

  // 询问类 - 政策查询
  createCard(
    'writing-task1-inquiry-policy',
    CardType.WRITING_TASK1,
    '询问公司休假政策',
    '你是新员工，想了解公司的年假和病假政策',
    DifficultyLevel.CLB7,
    'formal',
    {
      opening: [
        'I am writing to inquire about the company\'s leave policies.',
        'As a new employee, I would like to understand our vacation and sick leave benefits.',
        'Could you please provide information regarding our leave entitlements?'
      ],
      purpose: [
        'I would like clarification on the annual leave allocation for new employees.',
        'I am particularly interested in understanding how vacation days accumulate.',
        'Could you explain the procedure for requesting time off?'
      ],
      details: [
        'Specifically, I would like to know how many vacation days I am entitled to in my first year.',
        'I am also curious about the policy for carrying over unused vacation days.',
        'Additionally, what is the process for reporting sick leave?'
      ],
      closing: [
        'I would appreciate any guidance you can provide.',
        'Is there an employee handbook I could reference for more details?',
        'Thank you for your time and assistance.'
      ]
    },
    {
      vocabulary: {
        'vacation': ['annual leave', 'paid time off', 'holiday entitlement'],
        'sick days': ['sick leave', 'medical leave', 'illness absence'],
        'get': ['receive', 'be entitled to', 'accrue'],
        'ask': ['inquire', 'request information', 'seek clarification']
      },
      structure: {
        'How many vacation days do I get?': 'I would like to inquire about my annual leave entitlement.',
        'What about sick days?': 'Could you also clarify the sick leave policy?',
        'How do I ask for time off?': 'What is the proper procedure for requesting leave?'
      }
    },
    {
      question: 'Write an email to HR asking about company leave policies.',
      keyPoints: ['specific questions', 'new employee context', 'polite inquiry', 'request resources']
    }
  ),

  // 投诉类 - 邻居宠物投诉
  createCard(
    'writing-task1-complaint-pet',
    CardType.WRITING_TASK1,
    '向物业投诉邻居宠物问题',
    '邻居的狗经常在公共区域排泄且无人清理',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to bring to your attention a recurring issue in our building.',
        'I regret having to file this complaint, but the situation requires your intervention.',
        'I would like to report a matter that affects all residents in our complex.'
      ],
      purpose: [
        'The pet waste problem in our building common areas has become unacceptable.',
        'A resident\'s dog frequently leaves waste in the hallways and courtyard.',
        'Despite building rules, this pet waste is rarely cleaned up by the owner.'
      ],
      details: [
        'I have observed this occurring at least three times this week alone.',
        'The affected areas include the lobby entrance and the garden pathway.',
        'Other residents have also expressed concern about this ongoing issue.'
      ],
      closing: [
        'I would appreciate if management could remind residents of building pet policies.',
        'Perhaps additional signage or fines could help address this problem.',
        'Thank you for addressing this matter promptly.'
      ]
    },
    {
      vocabulary: {
        'dirty': ['unsanitary', 'unhygienic', 'contaminated'],
        'problem': ['issue', 'concern', 'matter'],
        'always': ['frequently', 'repeatedly', 'consistently'],
        'fix': ['address', 'resolve', 'remedy']
      },
      structure: {
        'There\'s dog poop everywhere.': 'Pet waste is frequently left uncleaned in common areas.',
        'The owner never cleans up.': 'The responsible party has consistently neglected proper cleanup.',
        'Please make them stop.': 'I request that management take appropriate action to address this issue.'
      }
    },
    {
      question: 'Write an email to building management about a pet waste problem.',
      keyPoints: ['specific incidents', 'impact on residents', 'suggested solutions', 'request action']
    }
  ),

  // 申请类 - 会员申请
  createCard(
    'writing-task1-application-membership',
    CardType.WRITING_TASK1,
    '申请加入专业协会',
    '你想加入一个专业协会以拓展职业网络',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to apply for membership in the Canadian Marketing Association.',
        'I would like to formally request consideration for professional membership.',
        'I am interested in joining your esteemed organization.'
      ],
      purpose: [
        'I believe membership would benefit my professional development significantly.',
        'I am eager to contribute to and learn from the marketing community.',
        'Joining your association aligns with my career goals in the marketing industry.'
      ],
      details: [
        'I am currently a Marketing Specialist at ABC Corporation with five years of experience.',
        'I hold a Bachelor\'s degree in Marketing from University of British Columbia.',
        'I have attached my resume and professional references as required.'
      ],
      closing: [
        'I would be honored to become a member of your organization.',
        'Please let me know if additional documentation is required.',
        'Thank you for considering my application.'
      ]
    },
    {
      vocabulary: {
        'join': ['become a member of', 'affiliate with', 'apply for membership'],
        'help': ['benefit', 'enhance', 'contribute to'],
        'job': ['profession', 'career', 'field'],
        'learn': ['develop', 'grow', 'advance']
      },
      structure: {
        'I want to join.': 'I am writing to formally apply for membership in your organization.',
        'It will help my career.': 'Membership would significantly contribute to my professional development.',
        'I work in marketing.': 'I am currently employed as a marketing professional with extensive experience.'
      }
    },
    {
      question: 'Write an email applying for membership in a professional association.',
      keyPoints: ['express interest', 'qualifications', 'career alignment', 'required documents']
    }
  ),

  // ==========================================
  // === WRITING TASK 1 扩展卡片 (Batch 3) ===
  // ==========================================

  // 请求类 - 请求服务变更
  createCard(
    'writing-task1-request-service-change',
    CardType.WRITING_TASK1,
    '请求更改手机套餐',
    '你想更改当前的手机套餐以获得更多数据流量',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to request a change to my current mobile phone plan.',
        'I would like to inquire about upgrading my service package.',
        'I am interested in modifying my existing phone plan.'
      ],
      purpose: [
        'I would like to switch from the Basic Plan to the Premium Data Plan.',
        'My current data allocation of 5GB is no longer sufficient for my needs.',
        'I am seeking a plan with more data and unlimited calling features.'
      ],
      details: [
        'My account number is MOB-2025-45678.',
        'I have been a customer for three years and have always paid on time.',
        'I would like the change to take effect from the next billing cycle.'
      ],
      closing: [
        'Please confirm the new plan details and any associated costs.',
        'I would appreciate information about any current promotions.',
        'Thank you for your assistance with this request.'
      ]
    },
    {
      vocabulary: {
        'change': ['modify', 'upgrade', 'switch'],
        'more': ['additional', 'increased', 'greater'],
        'plan': ['package', 'service', 'subscription'],
        'start': ['take effect', 'commence', 'begin']
      },
      structure: {
        'I want a different plan.': 'I would like to request a modification to my current service plan.',
        'I need more data.': 'My current data allocation is insufficient for my usage requirements.',
        'I\'ve been with you for a long time.': 'I have maintained a loyal customer relationship for several years.'
      }
    },
    {
      question: 'Write an email to your mobile provider requesting a plan change.',
      keyPoints: ['current plan', 'desired plan', 'account details', 'effective date']
    }
  ),

  // 感谢类 - 感谢导师指导
  createCard(
    'writing-task1-thank-mentor',
    CardType.WRITING_TASK1,
    '感谢导师的职业指导',
    '你的职业导师帮助你成功转行，想表达感谢',
    DifficultyLevel.CLB8,
    'semi-formal',
    {
      opening: [
        'I wanted to take a moment to express my sincere gratitude.',
        'I am writing to thank you for your invaluable guidance over the past year.',
        'I hope this email finds you well. I have some exciting news to share!'
      ],
      purpose: [
        'Thanks to your mentorship, I have successfully transitioned into project management.',
        'Your guidance was instrumental in helping me achieve my career goals.',
        'I recently accepted a position as a Project Manager at Tech Solutions Inc.'
      ],
      details: [
        'The interview skills you taught me made all the difference.',
        'Your advice on building my professional network led to this opportunity.',
        'I will always remember your patience and encouragement during difficult times.'
      ],
      closing: [
        'I am deeply grateful for everything you have done for me.',
        'I hope to pay it forward by mentoring others in the future.',
        'Thank you again for believing in my potential.'
      ]
    },
    {
      vocabulary: {
        'help': ['guidance', 'mentorship', 'support'],
        'successful': ['accomplished', 'achieved', 'attained'],
        'important': ['invaluable', 'instrumental', 'crucial'],
        'remember': ['cherish', 'appreciate', 'value']
      },
      structure: {
        'Thanks for helping me.': 'I am deeply grateful for your invaluable guidance and support.',
        'I got the job I wanted.': 'I am delighted to share that I have secured the position I aspired to.',
        'You taught me so much.': 'Your mentorship has been instrumental in my professional development.'
      }
    },
    {
      question: 'Write an email thanking a mentor for their career guidance.',
      keyPoints: ['specific impact', 'share success', 'express gratitude', 'future intentions']
    }
  ),

  // 投诉类 - 网购问题投诉
  createCard(
    'writing-task1-complaint-online',
    CardType.WRITING_TASK1,
    '投诉网购配送延误',
    '你的网购订单严重延误且客服响应不及时',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to express my deep dissatisfaction with my recent order.',
        'I am compelled to file a formal complaint regarding order #ONL-2025-12345.',
        'This email serves as a formal complaint about unacceptable delivery delays.'
      ],
      purpose: [
        'My order, placed on February 15th, has still not arrived despite promised 5-day delivery.',
        'It has now been three weeks with no package and no satisfactory explanation.',
        'Furthermore, my attempts to contact customer service have been largely unsuccessful.'
      ],
      details: [
        'The tracking information has not updated since February 20th.',
        'I have called customer service four times and been given conflicting information.',
        'I was promised a callback three times but never received one.'
      ],
      closing: [
        'I expect immediate resolution including delivery confirmation or a full refund.',
        'Please respond within 48 hours with a concrete solution.',
        'I trust this matter will be handled with the urgency it deserves.'
      ]
    },
    {
      vocabulary: {
        'late': ['delayed', 'overdue', 'behind schedule'],
        'unhelpful': ['unresponsive', 'inadequate', 'unsatisfactory'],
        'want': ['expect', 'demand', 'require'],
        'now': ['immediately', 'urgently', 'promptly']
      },
      structure: {
        'My package is very late.': 'My order has experienced an unacceptable delay significantly beyond the promised delivery date.',
        'Customer service didn\'t help.': 'My interactions with customer service have been unsatisfactory and unproductive.',
        'I want my money back.': 'I expect either immediate delivery or a full refund for this order.'
      }
    },
    {
      question: 'Write an email complaining about delayed online order delivery.',
      keyPoints: ['order details', 'timeline of issues', 'previous contact attempts', 'clear demands']
    }
  ),

  // 邀请类 - 客户活动邀请
  createCard(
    'writing-task1-invitation-business',
    CardType.WRITING_TASK1,
    '邀请客户参加产品发布会',
    '你公司即将举办新产品发布会，想邀请重要客户参加',
    DifficultyLevel.CLB9,
    'formal',
    {
      opening: [
        'On behalf of ABC Technologies, I am delighted to invite you to an exclusive event.',
        'It is my pleasure to extend a special invitation to our valued partner.',
        'We are honored to invite you to the launch of our latest innovation.'
      ],
      purpose: [
        'We will be unveiling our new AI-powered analytics platform on April 10th.',
        'As one of our most valued clients, we would like you to be among the first to experience it.',
        'This event will showcase how our new technology can transform your business operations.'
      ],
      details: [
        'The event will take place at the Vancouver Convention Centre from 6 PM to 9 PM.',
        'The evening will include a keynote presentation, live demonstrations, and networking opportunities.',
        'Complimentary dinner and refreshments will be provided.'
      ],
      closing: [
        'We sincerely hope you will be able to join us for this special occasion.',
        'Please RSVP by April 1st using the enclosed response card.',
        'We look forward to welcoming you.'
      ]
    },
    {
      vocabulary: {
        'invite': ['extend an invitation', 'request the pleasure of your company'],
        'new': ['innovative', 'cutting-edge', 'state-of-the-art'],
        'show': ['unveil', 'demonstrate', 'present'],
        'important': ['valued', 'esteemed', 'distinguished']
      },
      structure: {
        'Please come to our event.': 'We are honored to extend this exclusive invitation to you.',
        'We\'re showing our new product.': 'We will be unveiling our latest innovation at this special event.',
        'There will be food and drinks.': 'Complimentary refreshments and a gourmet dinner will be provided.'
      }
    },
    {
      question: 'Write an email inviting a client to a product launch event.',
      keyPoints: ['professional tone', 'event details', 'value proposition', 'RSVP request']
    }
  ),

  // 申请类 - 奖学金申请
  createCard(
    'writing-task1-application-scholarship',
    CardType.WRITING_TASK1,
    '申请学术奖学金',
    '你想申请大学的学术优秀奖学金',
    DifficultyLevel.CLB9,
    'formal',
    {
      opening: [
        'I am writing to apply for the Academic Excellence Scholarship for the 2025-2026 academic year.',
        'I would like to submit my application for the Merit-Based Scholarship program.',
        'I am honored to apply for this prestigious scholarship opportunity.'
      ],
      purpose: [
        'I believe my academic achievements and extracurricular involvement make me a strong candidate.',
        'This scholarship would significantly support my educational and career aspirations.',
        'I am committed to maintaining academic excellence while contributing to the university community.'
      ],
      details: [
        'I have maintained a cumulative GPA of 3.9 throughout my undergraduate studies.',
        'I am actively involved in the Student Research Association and volunteer tutoring program.',
        'I have attached my transcript, two letters of recommendation, and a personal statement.'
      ],
      closing: [
        'I would be deeply honored to receive this scholarship.',
        'Thank you for considering my application.',
        'I am available for an interview at your convenience.'
      ]
    },
    {
      vocabulary: {
        'apply': ['submit an application', 'seek consideration', 'request'],
        'good grades': ['academic excellence', 'outstanding performance', 'strong GPA'],
        'activities': ['extracurricular involvement', 'community engagement', 'leadership roles'],
        'help': ['support', 'enable', 'facilitate']
      },
      structure: {
        'I want this scholarship.': 'I am writing to respectfully apply for this prestigious scholarship.',
        'I have good grades.': 'I have consistently demonstrated academic excellence throughout my studies.',
        'I do other things too.': 'In addition to academics, I am actively engaged in extracurricular activities.'
      }
    },
    {
      question: 'Write an email applying for an academic scholarship.',
      keyPoints: ['academic achievements', 'extracurricular activities', 'financial need/goals', 'required documents']
    }
  ),

  // 建议类 - 环境改善建议
  createCard(
    'writing-task1-suggestion-environment',
    CardType.WRITING_TASK1,
    '向物业建议改善社区环境',
    '你想建议物业增加社区的绿化和环保设施',
    DifficultyLevel.CLB8,
    'semi-formal',
    {
      opening: [
        'I am writing to propose some environmental improvements for our community.',
        'I would like to share some ideas for making our neighborhood more sustainable.',
        'As a resident who cares about our environment, I have some suggestions to offer.'
      ],
      purpose: [
        'I believe adding more green spaces would greatly benefit our community.',
        'I would like to suggest implementing a community recycling program.',
        'Installing solar-powered lighting in common areas could reduce our carbon footprint.'
      ],
      details: [
        'The unused area near the parking lot would be perfect for a community garden.',
        'Many residents have expressed interest in composting and recycling facilities.',
        'Energy-efficient lighting could reduce building costs while helping the environment.'
      ],
      closing: [
        'I would be happy to help organize a resident committee to support these initiatives.',
        'I believe these changes would increase property values and resident satisfaction.',
        'Thank you for considering these suggestions for our community.'
      ]
    },
    {
      vocabulary: {
        'green': ['sustainable', 'eco-friendly', 'environmentally conscious'],
        'save': ['conserve', 'reduce', 'minimize'],
        'help': ['benefit', 'improve', 'enhance'],
        'idea': ['proposal', 'suggestion', 'initiative']
      },
      structure: {
        'We should plant more trees.': 'I propose increasing the green spaces in our community.',
        'It will be good for everyone.': 'These improvements would benefit all residents and the environment.',
        'I can help make it happen.': 'I am willing to volunteer my time to support these initiatives.'
      }
    },
    {
      question: 'Write an email suggesting environmental improvements to building management.',
      keyPoints: ['specific proposals', 'benefits explained', 'offer to help', 'practical approach']
    }
  ),

  // 通知类 - 离职通知
  createCard(
    'writing-task1-notice-resignation',
    CardType.WRITING_TASK1,
    '正式提交辞职信',
    '你决定接受新的工作机会，需要向经理提交辞职通知',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to formally submit my resignation from my position as Marketing Coordinator.',
        'Please accept this letter as formal notice of my resignation.',
        'After careful consideration, I have decided to resign from my current role.'
      ],
      purpose: [
        'My last day of work will be March 31st, providing two weeks\' notice as required.',
        'I have accepted a position that aligns more closely with my long-term career goals.',
        'While this was a difficult decision, I believe it is the right step for my professional growth.'
      ],
      details: [
        'I am committed to ensuring a smooth transition during my remaining time.',
        'I will complete all pending projects and document my ongoing responsibilities.',
        'I am happy to train my replacement during the transition period.'
      ],
      closing: [
        'I am grateful for the opportunities and experiences I have gained here.',
        'I hope to maintain positive relationships with the team.',
        'Thank you for your understanding and support throughout my time here.'
      ]
    },
    {
      vocabulary: {
        'quit': ['resign', 'tender resignation', 'step down'],
        'leave': ['depart', 'transition', 'move on'],
        'help': ['ensure smooth transition', 'facilitate handover', 'support'],
        'grateful': ['appreciative', 'thankful', 'indebted']
      },
      structure: {
        'I\'m quitting my job.': 'I am writing to formally submit my resignation from my current position.',
        'My last day will be...': 'My final working day will be [date], in accordance with the notice period.',
        'I learned a lot here.': 'I am deeply grateful for the professional growth opportunities I received.'
      }
    },
    {
      question: 'Write a formal resignation email to your manager.',
      keyPoints: ['clear intention', 'last working day', 'transition plan', 'gratitude']
    }
  ),

  // 报告类 - 进度报告
  createCard(
    'writing-task1-report-progress',
    CardType.WRITING_TASK1,
    '向经理汇报项目进度',
    '你需要向经理汇报本周的项目进展情况',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to provide an update on the Q2 Marketing Campaign project.',
        'Please find below the weekly progress report for the website redesign project.',
        'As requested, here is the status update on our current initiatives.'
      ],
      purpose: [
        'I am pleased to report that we are on track to meet our deadline.',
        'The project has progressed significantly over the past week.',
        'I would like to update you on both our achievements and challenges.'
      ],
      details: [
        'We have completed 75% of the planned tasks for this phase.',
        'The design team finalized the homepage mockups ahead of schedule.',
        'However, we encountered a delay in receiving content from the client.'
      ],
      closing: [
        'I will continue to monitor progress and provide updates as needed.',
        'Please let me know if you need any additional information.',
        'I am available to discuss these points in more detail at your convenience.'
      ]
    },
    {
      vocabulary: {
        'update': ['status report', 'progress summary', 'briefing'],
        'done': ['completed', 'accomplished', 'achieved'],
        'problem': ['challenge', 'obstacle', 'impediment'],
        'on time': ['on schedule', 'within timeline', 'on track']
      },
      structure: {
        'Here\'s what we did this week.': 'I am pleased to provide the following progress update.',
        'We finished most of the work.': 'The majority of planned tasks have been successfully completed.',
        'We had some problems.': 'We encountered certain challenges that required additional attention.'
      }
    },
    {
      question: 'Write an email reporting project progress to your manager.',
      keyPoints: ['achievements', 'challenges', 'next steps', 'professional format']
    }
  ),

  // 请求类 - 灵活工作安排
  createCard(
    'writing-task1-request-flexible',
    CardType.WRITING_TASK1,
    '请求灵活工作安排',
    '你因家庭原因需要申请每周两天在家工作',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to request a flexible work arrangement.',
        'I would like to discuss the possibility of working from home two days per week.',
        'I hope this email finds you well. I would like to propose a modified work schedule.'
      ],
      purpose: [
        'Due to recent family circumstances, I am requesting to work remotely on Tuesdays and Thursdays.',
        'This arrangement would allow me to better balance my family responsibilities.',
        'I believe I can maintain, if not improve, my productivity with this arrangement.'
      ],
      details: [
        'I will ensure complete availability during working hours through phone and video calls.',
        'My home office is fully equipped with reliable internet and necessary equipment.',
        'I am prepared to come to the office for important meetings or as needed.'
      ],
      closing: [
        'I am open to a trial period to demonstrate that this arrangement works effectively.',
        'I would be happy to discuss this request further at your convenience.',
        'Thank you for considering my request.'
      ]
    },
    {
      vocabulary: {
        'work from home': ['remote work', 'telecommute', 'work remotely'],
        'balance': ['manage', 'accommodate', 'juggle'],
        'available': ['accessible', 'reachable', 'contactable'],
        'try': ['trial period', 'pilot arrangement', 'test phase']
      },
      structure: {
        'I want to work from home sometimes.': 'I am requesting a flexible work arrangement that includes remote work days.',
        'I can still do my job well.': 'I am confident that my productivity will remain high with this arrangement.',
        'Let\'s try it and see.': 'I propose a trial period to evaluate the effectiveness of this arrangement.'
      }
    },
    {
      question: 'Write an email requesting a flexible work arrangement.',
      keyPoints: ['specific request', 'reason', 'how you\'ll maintain productivity', 'flexibility']
    }
  ),

  // 询问类 - 课程信息查询
  createCard(
    'writing-task1-inquiry-course',
    CardType.WRITING_TASK1,
    '询问培训课程信息',
    '你想参加一个专业证书课程，发邮件询问详情',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to inquire about the Project Management Professional certification course.',
        'I am interested in learning more about your professional development programs.',
        'I recently saw your advertisement for business courses and would like more information.'
      ],
      purpose: [
        'I would like to know about the course curriculum and schedule options.',
        'Could you please provide details about the certification requirements?',
        'I am particularly interested in the evening and weekend class options.'
      ],
      details: [
        'What are the prerequisites for enrolling in this course?',
        'How long does the program take to complete?',
        'Are there payment plans or financial assistance options available?'
      ],
      closing: [
        'I would appreciate any information you can provide.',
        'Please let me know if there are upcoming information sessions I could attend.',
        'Thank you for your time, and I look forward to your response.'
      ]
    },
    {
      vocabulary: {
        'course': ['program', 'training', 'certification'],
        'information': ['details', 'particulars', 'specifications'],
        'when': ['schedule', 'timing', 'duration'],
        'how much': ['tuition', 'fees', 'cost']
      },
      structure: {
        'What do I need to take this course?': 'I would like to inquire about the prerequisites for enrollment.',
        'How long is the course?': 'Could you please provide information about the program duration?',
        'Can I pay in installments?': 'Are there flexible payment options available for this program?'
      }
    },
    {
      question: 'Write an email inquiring about a professional training course.',
      keyPoints: ['specific questions', 'schedule interest', 'payment options', 'next steps']
    }
  ),

  // ==========================================
  // === WRITING TASK 2 扩展卡片 ===
  // ==========================================

  // 教育类 - 网络教育
  createCard(
    'writing-task2-online-education',
    CardType.WRITING_TASK2,
    '网络教育 vs 传统教育',
    '调查问题：网络教育能否取代传统课堂教育？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'The rapid growth of online education has sparked debate about its role in the future of learning.',
        'While I believe online education offers significant benefits, it cannot fully replace traditional classroom education.',
        'This essay will examine both forms of education and explain why a hybrid approach may be optimal.'
      ],
      reason1: [
        'Online education provides unmatched flexibility and accessibility.',
        'Students can learn at their own pace and access courses from anywhere in the world.',
        'This democratizes education for those who cannot attend physical institutions.'
      ],
      reason2: [
        'However, traditional classrooms offer irreplaceable social and developmental benefits.',
        'Face-to-face interaction builds communication skills and emotional intelligence.',
        'Many subjects, particularly those requiring hands-on practice, are better taught in person.'
      ],
      counterargument: [
        'Some argue that technology can simulate classroom experiences effectively.',
        'While virtual classrooms have improved, they cannot fully replicate human connection.',
        'The most effective approach combines online flexibility with in-person engagement.'
      ],
      conclusion: [
        'In conclusion, online education complements rather than replaces traditional learning.',
        'The future of education likely lies in thoughtful integration of both approaches.',
        'This hybrid model can offer the best of accessibility and quality human interaction.'
      ]
    },
    {
      vocabulary: {
        'replace': ['substitute for', 'supersede', 'supplant'],
        'better': ['superior', 'more effective', 'preferable'],
        'flexible': ['adaptable', 'versatile', 'accommodating'],
        'learn': ['acquire knowledge', 'develop skills', 'gain understanding']
      },
      structure: {
        'Online learning is convenient.': 'Online education provides unprecedented flexibility and accessibility.',
        'You need real teachers.': 'Face-to-face instruction offers irreplaceable educational value.',
        'Both are good.': 'A hybrid approach combining both methods may be the optimal solution.'
      }
    },
    {
      question: 'Can online education replace traditional classroom education?',
      keyPoints: ['online benefits', 'traditional advantages', 'hybrid solution', 'balanced view']
    }
  ),

  // 环境类 - 个人环保行动
  createCard(
    'writing-task2-individual-environment',
    CardType.WRITING_TASK2,
    '个人环保行动的作用',
    '调查问题：个人行动能否对环境保护产生重大影响？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Climate change and environmental degradation are among the most pressing challenges of our time.',
        'I firmly believe that individual actions, when multiplied across millions, can create significant change.',
        'This essay will explore how personal choices contribute to environmental protection.'
      ],
      reason1: [
        'Individual consumption choices directly influence market demand and corporate behavior.',
        'When consumers choose sustainable products, companies respond by offering greener alternatives.',
        'The rise of electric vehicles and plant-based foods demonstrates this consumer-driven change.'
      ],
      reason2: [
        'Personal environmental actions also create social influence and cultural shifts.',
        'When people adopt sustainable habits, they inspire friends and family to do the same.',
        'This ripple effect can transform community norms around environmental responsibility.'
      ],
      counterargument: [
        'Critics argue that systemic change requires government and corporate action, not individual effort.',
        'While large-scale policy is essential, individual actions pressure institutions to change.',
        'Personal responsibility and systemic reform are complementary, not competing, approaches.'
      ],
      conclusion: [
        'In conclusion, individual environmental actions are meaningful and necessary.',
        'These choices collectively shape markets, influence policy, and shift cultural attitudes.',
        'Environmental protection requires action at all levels, from personal to global.'
      ]
    },
    {
      vocabulary: {
        'help': ['contribute to', 'impact', 'influence'],
        'change': ['transform', 'shift', 'alter'],
        'environment': ['ecosystem', 'natural world', 'planet'],
        'choice': ['decision', 'preference', 'selection']
      },
      structure: {
        'One person can\'t change anything.': 'While individual impact may seem small, collective action creates significant change.',
        'People should recycle.': 'Adopting sustainable habits like recycling contributes to environmental protection.',
        'Companies do more damage.': 'Consumer choices directly influence corporate environmental practices.'
      }
    },
    {
      question: 'Can individual actions make a significant difference for the environment?',
      keyPoints: ['consumer influence', 'social ripple effects', 'systemic change', 'collective impact']
    }
  ),

  // 工作类 - 工作生活平衡
  createCard(
    'writing-task2-work-life-balance',
    CardType.WRITING_TASK2,
    '工作与生活平衡',
    '调查问题：雇主是否应该采取措施帮助员工实现工作生活平衡？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Work-life balance has become a critical concern in today\'s demanding professional environment.',
        'I strongly believe employers should actively support their employees\' work-life balance.',
        'This essay will discuss why such measures benefit both employees and organizations.'
      ],
      reason1: [
        'Supporting work-life balance significantly improves employee productivity and engagement.',
        'Well-rested employees with fulfilling personal lives bring more energy and creativity to work.',
        'Research consistently shows that overworked employees are less productive, not more.'
      ],
      reason2: [
        'Furthermore, work-life balance initiatives help companies attract and retain top talent.',
        'Modern workers, especially younger generations, prioritize flexibility when choosing employers.',
        'Companies with strong work-life policies gain competitive advantage in the talent market.'
      ],
      counterargument: [
        'Some employers worry that flexible policies may reduce output or be exploited.',
        'However, trust-based policies with clear expectations actually increase accountability.',
        'The benefits of reduced turnover and higher engagement far outweigh potential risks.'
      ],
      conclusion: [
        'In conclusion, employers should embrace work-life balance as a strategic investment.',
        'Such measures enhance productivity, retention, and organizational success.',
        'The modern workplace requires this evolved approach to employee wellbeing.'
      ]
    },
    {
      vocabulary: {
        'balance': ['equilibrium', 'harmony', 'integration'],
        'help': ['support', 'facilitate', 'enable'],
        'happy': ['satisfied', 'fulfilled', 'engaged'],
        'work better': ['perform optimally', 'be more productive', 'excel']
      },
      structure: {
        'People work too much.': 'Many employees struggle to maintain healthy boundaries between work and personal life.',
        'Companies should help.': 'Employers have both the opportunity and responsibility to support work-life balance.',
        'Happy workers work better.': 'Employees with healthy work-life balance demonstrate higher productivity and engagement.'
      }
    },
    {
      question: 'Should employers take measures to help employees achieve work-life balance?',
      keyPoints: ['productivity benefits', 'talent attraction', 'address concerns', 'business case']
    }
  ),

  // 科技类 - 人工智能
  createCard(
    'writing-task2-ai-workplace',
    CardType.WRITING_TASK2,
    '人工智能与就业',
    '调查问题：人工智能对就业市场的影响是利大于弊还是弊大于利？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'Artificial intelligence is rapidly transforming industries and reshaping the employment landscape.',
        'I believe AI\'s impact on employment is predominantly positive, though it requires thoughtful management.',
        'This essay will examine both the challenges and opportunities AI presents for workers.'
      ],
      reason1: [
        'AI creates new job categories while automating routine and dangerous tasks.',
        'Historically, technological revolutions have ultimately created more jobs than they eliminated.',
        'New roles in AI development, maintenance, and oversight are rapidly emerging.'
      ],
      reason2: [
        'AI also augments human capabilities, making workers more productive and effective.',
        'Rather than replacing workers, AI often handles tedious tasks, allowing humans to focus on creative work.',
        'This human-AI collaboration can lead to higher job satisfaction and economic output.'
      ],
      counterargument: [
        'Legitimate concerns exist about job displacement, particularly for lower-skilled workers.',
        'However, proactive investment in education and retraining can mitigate these challenges.',
        'Societies must ensure AI\'s benefits are distributed equitably across the workforce.'
      ],
      conclusion: [
        'In conclusion, AI offers more opportunities than threats for the future of work.',
        'Success depends on embracing change while investing in worker adaptation.',
        'With proper policies, AI can enhance rather than diminish human employment prospects.'
      ]
    },
    {
      vocabulary: {
        'replace': ['displace', 'substitute', 'automate'],
        'job': ['employment', 'position', 'occupation'],
        'new': ['emerging', 'novel', 'innovative'],
        'change': ['transform', 'revolutionize', 'reshape']
      },
      structure: {
        'AI takes jobs.': 'AI automation affects certain job categories while creating new opportunities.',
        'People need to learn new skills.': 'Workers must adapt through continuous learning and skill development.',
        'AI helps people work better.': 'AI augments human capabilities, enhancing productivity and job satisfaction.'
      }
    },
    {
      question: 'Is AI\'s impact on employment more positive or negative?',
      keyPoints: ['job creation', 'human augmentation', 'transition challenges', 'policy needs']
    }
  ),

  // 社会类 - 多元文化
  createCard(
    'writing-task2-multiculturalism',
    CardType.WRITING_TASK2,
    '多元文化社会的优势',
    '调查问题：多元文化是否使社会更加丰富？',
    DifficultyLevel.CLB9,
    'neutral',
    {
      introduction: [
        'Cultural diversity has become a defining feature of modern societies worldwide.',
        'I strongly believe that multiculturalism enriches societies in numerous meaningful ways.',
        'This essay will explore how cultural diversity benefits communities economically and socially.'
      ],
      reason1: [
        'Cultural diversity drives innovation and economic growth through diverse perspectives.',
        'Studies show that diverse teams produce more creative solutions to complex problems.',
        'Multicultural cities often become hubs of entrepreneurship and cultural production.'
      ],
      reason2: [
        'Exposure to different cultures fosters tolerance, empathy, and global understanding.',
        'Citizens in multicultural societies develop broader worldviews and adaptability.',
        'This cultural competence is increasingly valuable in our interconnected global economy.'
      ],
      counterargument: [
        'Some argue that multiculturalism challenges social cohesion and national identity.',
        'However, shared values and civic engagement can unite diverse communities.',
        'The key lies in promoting integration rather than either assimilation or isolation.'
      ],
      conclusion: [
        'In conclusion, multiculturalism brings substantial benefits to modern societies.',
        'These advantages include economic dynamism, social enrichment, and global readiness.',
        'With thoughtful policies, diverse societies can be both unified and pluralistic.'
      ]
    },
    {
      vocabulary: {
        'diverse': ['varied', 'heterogeneous', 'pluralistic'],
        'rich': ['enriched', 'enhanced', 'vibrant'],
        'together': ['cohesive', 'unified', 'integrated'],
        'understand': ['appreciate', 'embrace', 'value']
      },
      structure: {
        'Different cultures are good.': 'Cultural diversity enriches societies in numerous meaningful ways.',
        'People learn from each other.': 'Exposure to different cultures fosters understanding and broadens perspectives.',
        'We need to work together.': 'Successful multicultural societies combine diversity with shared civic values.'
      }
    },
    {
      question: 'Does multiculturalism make society richer and stronger?',
      keyPoints: ['innovation benefits', 'social enrichment', 'integration challenges', 'balanced approach']
    }
  ),

  // 经济类 - 共享经济
  createCard(
    'writing-task2-sharing-economy',
    CardType.WRITING_TASK2,
    '共享经济的利弊',
    '调查问题：共享经济服务（如Uber、Airbnb）对社会的影响是正面还是负面？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'The sharing economy has revolutionized how we access transportation, accommodation, and services.',
        'While there are valid concerns, I believe the sharing economy\'s overall impact is predominantly positive.',
        'This essay will examine both the benefits and challenges of this economic model.'
      ],
      reason1: [
        'Sharing economy platforms provide flexible income opportunities for millions of people.',
        'Workers can choose when and how much to work, creating unprecedented flexibility.',
        'This has been particularly valuable for students, caregivers, and those seeking supplemental income.'
      ],
      reason2: [
        'Consumers benefit from increased choice, convenience, and often lower prices.',
        'Competition from sharing economy services has improved traditional industries.',
        'These platforms also promote more efficient use of existing resources.'
      ],
      counterargument: [
        'Critics raise legitimate concerns about worker protections and regulatory compliance.',
        'However, evolving regulations can address these issues while preserving innovation.',
        'Many platforms are already improving worker benefits and safety standards.'
      ],
      conclusion: [
        'In conclusion, the sharing economy offers significant benefits for workers and consumers.',
        'With appropriate regulation, its challenges can be managed effectively.',
        'This economic model represents a positive evolution in how we work and access services.'
      ]
    },
    {
      vocabulary: {
        'share': ['collaborative', 'peer-to-peer', 'platform-based'],
        'flexible': ['adaptable', 'on-demand', 'gig-based'],
        'cheap': ['affordable', 'cost-effective', 'economical'],
        'problem': ['challenge', 'concern', 'issue']
      },
      structure: {
        'Apps like Uber are convenient.': 'Sharing economy platforms provide unprecedented convenience for consumers.',
        'People can earn money easily.': 'These platforms offer flexible income opportunities for workers.',
        'There are some problems.': 'Legitimate concerns exist regarding worker protections and regulation.'
      }
    },
    {
      question: 'Is the sharing economy\'s impact on society positive or negative?',
      keyPoints: ['worker flexibility', 'consumer benefits', 'regulatory concerns', 'balanced conclusion']
    }
  ),

  // 青少年类 - 社交媒体对青少年
  createCard(
    'writing-task2-teens-social-media',
    CardType.WRITING_TASK2,
    '社交媒体对青少年的影响',
    '调查问题：家长是否应该限制青少年使用社交媒体？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Social media has become an integral part of teenage life in the digital age.',
        'I believe parents should guide and moderate, rather than strictly limit, social media use.',
        'This essay will discuss how balanced supervision can protect teens while respecting their development.'
      ],
      reason1: [
        'Excessive social media use can negatively impact mental health and academic performance.',
        'Research links heavy social media use to increased anxiety, depression, and sleep problems.',
        'Parents have a responsibility to protect their children from these documented harms.'
      ],
      reason2: [
        'However, social media also provides valuable social connection and learning opportunities.',
        'Teens use these platforms to maintain friendships, explore interests, and develop digital skills.',
        'Complete restriction may isolate teens socially and delay important digital literacy.'
      ],
      counterargument: [
        'Some argue teens should have unlimited access to develop self-regulation skills.',
        'While autonomy is important, the adolescent brain is particularly vulnerable to social media\'s design.',
        'Gradual increases in freedom with age represent a more balanced approach.'
      ],
      conclusion: [
        'In conclusion, parents should take an active role in guiding social media use.',
        'This means setting reasonable limits while teaching critical thinking and self-regulation.',
        'The goal is helping teens develop healthy digital habits for lifelong wellbeing.'
      ]
    },
    {
      vocabulary: {
        'limit': ['restrict', 'regulate', 'moderate'],
        'hurt': ['harm', 'negatively impact', 'damage'],
        'help': ['benefit', 'support', 'facilitate'],
        'teach': ['guide', 'educate', 'instruct']
      },
      structure: {
        'Social media is bad for kids.': 'Excessive social media use can negatively impact adolescent wellbeing.',
        'Parents should control it.': 'Parents should actively guide and moderate their children\'s social media use.',
        'Kids need to learn.': 'Teens benefit from gradual increases in digital autonomy with proper guidance.'
      }
    },
    {
      question: 'Should parents limit their teenagers\' social media use?',
      keyPoints: ['mental health concerns', 'social benefits', 'balanced approach', 'digital literacy']
    }
  ),

  // 城市规划类 - 公共交通
  createCard(
    'writing-task2-public-transit',
    CardType.WRITING_TASK2,
    '城市公共交通投资',
    '调查问题：城市是否应该优先投资公共交通而非道路建设？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Transportation infrastructure is crucial for urban development and quality of life.',
        'I believe cities should prioritize public transit investment over road expansion.',
        'This essay will examine why public transit offers greater benefits for urban communities.'
      ],
      reason1: [
        'Public transit is more efficient at moving people, reducing traffic congestion.',
        'One bus or train can carry passengers who would otherwise fill dozens of cars.',
        'Cities with excellent transit systems experience less gridlock and shorter commutes.'
      ],
      reason2: [
        'Public transit is also more environmentally sustainable than car-dependent infrastructure.',
        'Buses, trains, and subways produce fewer emissions per passenger than private vehicles.',
        'Transit investment supports cities\' climate goals and improves air quality.'
      ],
      counterargument: [
        'Some argue that road investment is necessary for economic activity and personal freedom.',
        'However, balanced transportation options actually support more diverse economic development.',
        'Strategic road maintenance can coexist with prioritized transit investment.'
      ],
      conclusion: [
        'In conclusion, cities benefit more from prioritizing public transit development.',
        'This approach addresses congestion, environmental concerns, and equitable mobility.',
        'Forward-thinking urban planning recognizes transit as essential infrastructure.'
      ]
    },
    {
      vocabulary: {
        'traffic': ['congestion', 'gridlock', 'vehicle flow'],
        'environment': ['sustainability', 'emissions', 'climate impact'],
        'city': ['urban area', 'municipality', 'metropolitan region'],
        'better': ['superior', 'more effective', 'advantageous']
      },
      structure: {
        'Too many cars cause problems.': 'Heavy reliance on private vehicles creates significant urban challenges.',
        'Buses and trains are better.': 'Public transit offers more efficient and sustainable urban mobility.',
        'Cities should spend money on transit.': 'Municipal investment should prioritize public transportation infrastructure.'
      }
    },
    {
      question: 'Should cities prioritize public transit investment over road building?',
      keyPoints: ['efficiency benefits', 'environmental impact', 'balanced investment', 'urban planning']
    }
  ),

  // 职业发展类 - 跳槽频率
  createCard(
    'writing-task2-job-hopping',
    CardType.WRITING_TASK2,
    '频繁换工作的利弊',
    '调查问题：在职业生涯中频繁换工作是好是坏？',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        'Career mobility has increased significantly in the modern workforce.',
        'I believe strategic job changes can benefit careers, but frequent hopping has drawbacks.',
        'This essay will examine when job changes are beneficial and when they become problematic.'
      ],
      reason1: [
        'Job changes can accelerate career growth and increase earning potential.',
        'Each new role offers opportunities to learn new skills and expand professional networks.',
        'Workers who strategically change jobs often advance faster than those who stay put.'
      ],
      reason2: [
        'However, too-frequent changes can signal instability and limit deep expertise development.',
        'Employers may hesitate to invest in workers who seem likely to leave quickly.',
        'Some skills and relationships require years to fully develop within an organization.'
      ],
      counterargument: [
        'Some argue that loyalty to one company is outdated in today\'s economy.',
        'While this is partly true, balance remains important for long-term success.',
        'The key is making thoughtful moves that build a coherent career narrative.'
      ],
      conclusion: [
        'In conclusion, job changes can be valuable when strategic and purposeful.',
        'Workers should consider both opportunities and the importance of demonstrated commitment.',
        'The ideal approach balances growth through change with periods of deep contribution.'
      ]
    },
    {
      vocabulary: {
        'change jobs': ['transition', 'move positions', 'switch employers'],
        'grow': ['advance', 'develop', 'progress'],
        'stay': ['remain', 'continue', 'commit'],
        'experience': ['expertise', 'proficiency', 'mastery']
      },
      structure: {
        'Changing jobs helps you earn more.': 'Strategic job transitions can significantly accelerate career advancement.',
        'Staying builds deep skills.': 'Extended tenure allows development of substantial expertise and relationships.',
        'You need to find balance.': 'The optimal approach balances growth opportunities with demonstrated commitment.'
      }
    },
    {
      question: 'Is frequent job changing good or bad for careers?',
      keyPoints: ['growth benefits', 'stability concerns', 'strategic timing', 'balanced approach']
    }
  ),

  // 教育政策类 - 体育必修
  createCard(
    'writing-task2-mandatory-sports',
    CardType.WRITING_TASK2,
    '学校体育课是否应该必修',
    '调查问题：学校是否应该强制要求学生参加体育课？',
    DifficultyLevel.CLB7,
    'neutral',
    {
      introduction: [
        'Physical education has been a standard part of school curricula for generations.',
        'I believe mandatory physical education serves important purposes in student development.',
        'This essay will discuss why required PE classes benefit students despite some objections.'
      ],
      reason1: [
        'Physical education promotes essential healthy habits during formative years.',
        'Regular exercise improves not only physical health but also mental wellbeing and focus.',
        'Schools play a vital role in establishing lifelong fitness habits.'
      ],
      reason2: [
        'PE classes also develop important social and emotional skills.',
        'Team sports teach cooperation, leadership, and resilience in the face of challenges.',
        'These skills transfer to academic and professional success later in life.'
      ],
      counterargument: [
        'Some argue that PE embarrasses less athletic students and wastes academic time.',
        'However, well-designed programs can accommodate different ability levels.',
        'The benefits of physical activity far outweigh the time cost in academic schedules.'
      ],
      conclusion: [
        'In conclusion, mandatory physical education serves important educational goals.',
        'It develops healthy habits, social skills, and overall student wellbeing.',
        'Schools should maintain PE requirements while ensuring inclusive, positive experiences.'
      ]
    },
    {
      vocabulary: {
        'exercise': ['physical activity', 'fitness training', 'athletic participation'],
        'healthy': ['beneficial', 'wellness-promoting', 'health-enhancing'],
        'learn': ['develop', 'acquire', 'cultivate'],
        'required': ['mandatory', 'compulsory', 'obligatory']
      },
      structure: {
        'Kids need to exercise.': 'Regular physical activity is essential for healthy child development.',
        'Sports teach teamwork.': 'Athletic activities develop valuable social and collaborative skills.',
        'Some kids don\'t like PE.': 'While some students may resist, the developmental benefits are substantial.'
      }
    },
    {
      question: 'Should physical education be mandatory in schools?',
      keyPoints: ['health benefits', 'social skills', 'accommodation concerns', 'implementation']
    }
  ),

  // =============================================
  // === SPEAKING TASK 1: 给建议 Giving Advice ===
  // =============================================

  // Speaking Task 1-1: 工作建议
  createCard(
    'speaking-task1-career-change',
    CardType.SPEAKING_TASK,
    '职业转换建议',
    '你的朋友想从工程师转行做厨师，向你寻求建议',
    DifficultyLevel.CLB7,
    'friendly',
    {
      opening: ['I think you should seriously consider...', 'In my opinion, the best approach would be...', 'If I were you, I would...'],
      suggestion: ['First, you might want to...', 'One thing you could do is...', 'Have you thought about...'],
      reason: ['This would help you because...', 'The advantage of this is...', 'This way, you can...'],
      closing: ['I hope this helps!', 'Good luck with your decision!', 'Let me know how it goes!']
    },
    {
      vocabulary: {
        'change jobs': ['transition careers', 'pursue a new profession'],
        'learn cooking': ['enroll in culinary training', 'develop culinary skills'],
        'think about it': ['weigh your options carefully', 'consider all aspects']
      },
      structure: {
        'You should do this.': 'I would strongly recommend that you consider doing this.',
        'It is good for you.': 'This approach would be beneficial for your long-term goals.'
      }
    },
    {
      question: 'Your friend wants to change careers from engineering to cooking. Give them advice.',
      keyPoints: ['acknowledge the desire for change', 'suggest practical steps', 'mention potential challenges', 'offer encouragement']
    }
  ),

  // Speaking Task 1-2: 学习建议
  createCard(
    'speaking-task1-improve-english',
    CardType.SPEAKING_TASK,
    '英语学习建议',
    '你的同事想提高英语口语水平，向你寻求建议',
    DifficultyLevel.CLB7,
    'supportive',
    {
      opening: ['That\'s a great goal to have!', 'I\'d be happy to share some suggestions.', 'Here are some things that worked for me...'],
      suggestion: ['One effective method is...', 'You could try...', 'I would recommend...'],
      example: ['For instance, you could...', 'A good example would be...', 'What I did was...'],
      closing: ['Keep practicing and you\'ll improve!', 'Consistency is key!', 'Don\'t give up!']
    },
    {
      vocabulary: {
        'practice more': ['engage in regular practice sessions', 'dedicate time to daily practice'],
        'watch movies': ['immerse yourself in English media', 'consume authentic English content'],
        'speak with people': ['engage in conversations with native speakers', 'practice with language partners']
      },
      structure: {
        'You need to practice.': 'Regular, consistent practice is essential for improvement.',
        'Watching TV helps.': 'Consuming English media provides valuable exposure to natural speech patterns.'
      }
    },
    {
      question: 'Your colleague wants to improve their English speaking skills. Give them advice.',
      keyPoints: ['immersion techniques', 'practice opportunities', 'resource recommendations', 'encouragement']
    }
  ),

  // Speaking Task 1-3: 健康建议
  createCard(
    'speaking-task1-stress-management',
    CardType.SPEAKING_TASK,
    '压力管理建议',
    '你的邻居最近工作压力很大，向你寻求缓解压力的建议',
    DifficultyLevel.CLB8,
    'caring',
    {
      opening: ['I understand how stressful work can be.', 'It\'s important to take care of yourself.', 'I\'ve dealt with similar situations before...'],
      suggestion: ['One thing that really helps is...', 'You might want to consider...', 'A great stress reliever is...'],
      explanation: ['This works because...', 'Studies have shown that...', 'The reason this is effective is...'],
      closing: ['Take it one day at a time.', 'Remember, your health comes first.', 'Feel free to reach out if you need support.']
    },
    {
      vocabulary: {
        'relax': ['unwind', 'decompress', 'recharge'],
        'take a break': ['step away from work', 'give yourself some downtime'],
        'feel better': ['restore your well-being', 'regain your balance']
      },
      structure: {
        'Exercise is good.': 'Regular physical activity has been proven to reduce stress hormones.',
        'Sleep more.': 'Prioritizing adequate rest is crucial for stress management.'
      }
    },
    {
      question: 'Your neighbor is stressed from work. Give them advice on managing stress.',
      keyPoints: ['acknowledge their feelings', 'suggest relaxation techniques', 'recommend lifestyle changes', 'offer support']
    }
  ),

  // Speaking Task 1-4: 财务建议
  createCard(
    'speaking-task1-saving-money',
    CardType.SPEAKING_TASK,
    '储蓄理财建议',
    '你的表弟刚开始工作，想学习如何存钱，向你寻求建议',
    DifficultyLevel.CLB8,
    'advisory',
    {
      opening: ['It\'s wonderful that you\'re thinking about saving early.', 'Financial planning is so important.', 'I\'m glad you asked about this...'],
      suggestion: ['The first step is to...', 'A simple approach is to...', 'What I recommend is...'],
      strategy: ['One effective strategy is...', 'You could automate your savings by...', 'Consider setting up...'],
      closing: ['Starting small is perfectly fine.', 'The key is to be consistent.', 'You\'ll thank yourself later!']
    },
    {
      vocabulary: {
        'save money': ['build your savings', 'set aside funds'],
        'spend less': ['reduce expenses', 'cut unnecessary costs'],
        'make a budget': ['create a financial plan', 'track your income and expenses']
      },
      structure: {
        'Don\'t spend too much.': 'It\'s important to live within your means and prioritize essential expenses.',
        'Put money in the bank.': 'Consider allocating a percentage of your income to a dedicated savings account.'
      }
    },
    {
      question: 'Your cousin just started working and wants to learn how to save money. Give them advice.',
      keyPoints: ['budgeting basics', 'saving strategies', 'avoiding common pitfalls', 'long-term goals']
    }
  ),

  // Speaking Task 1-5: 社交建议
  createCard(
    'speaking-task1-making-friends',
    CardType.SPEAKING_TASK,
    '交友建议',
    '你的新邻居刚搬到这个城市，想认识新朋友，向你寻求建议',
    DifficultyLevel.CLB7,
    'welcoming',
    {
      opening: ['Moving to a new city can be challenging.', 'I remember when I first moved here...', 'It\'s great that you want to meet people!'],
      suggestion: ['A good way to meet people is...', 'You might want to try...', 'I\'d suggest joining...'],
      example: ['For example, you could...', 'I made friends by...', 'One thing that worked for me was...'],
      closing: ['Don\'t hesitate to reach out.', 'People here are generally friendly.', 'I\'m happy to introduce you to some people.']
    },
    {
      vocabulary: {
        'meet people': ['connect with others', 'expand your social circle'],
        'join a club': ['become a member of a community group', 'participate in organized activities'],
        'be friendly': ['approach others with openness', 'initiate conversations']
      },
      structure: {
        'Go to events.': 'Attending community events and social gatherings is an excellent opportunity to meet like-minded individuals.',
        'Talk to neighbors.': 'Building relationships with your neighbors can create a strong local support network.'
      }
    },
    {
      question: 'Your new neighbor just moved to the city and wants to make friends. Give them advice.',
      keyPoints: ['community activities', 'social opportunities', 'being approachable', 'patience and persistence']
    }
  ),

  // Speaking Task 1-6: 旅行建议
  createCard(
    'speaking-task1-travel-planning',
    CardType.SPEAKING_TASK,
    '旅行规划建议',
    '你的朋友第一次计划去欧洲旅行，向你寻求建议',
    DifficultyLevel.CLB9,
    'enthusiastic',
    {
      opening: ['How exciting! Europe is wonderful!', 'You\'re going to have an amazing time.', 'I\'d love to help you plan this trip!'],
      suggestion: ['First, I\'d recommend...', 'An important consideration is...', 'You should definitely...'],
      practical: ['Make sure to...', 'Don\'t forget to...', 'It\'s essential that you...'],
      closing: ['You\'re going to love it!', 'Have an incredible journey!', 'Send me pictures!']
    },
    {
      vocabulary: {
        'book tickets': ['secure your travel arrangements', 'reserve flights and accommodations'],
        'plan activities': ['create an itinerary', 'research destinations and attractions'],
        'pack things': ['prepare your luggage efficiently', 'bring essential items']
      },
      structure: {
        'Check the weather.': 'Research the seasonal climate of your destinations to pack appropriately.',
        'Get travel insurance.': 'Purchasing comprehensive travel insurance provides peace of mind for unexpected situations.'
      }
    },
    {
      question: 'Your friend is planning their first trip to Europe. Give them advice.',
      keyPoints: ['planning and research', 'practical preparations', 'cultural tips', 'safety considerations']
    }
  ),

  // =================================================
  // === SPEAKING TASK 2: 个人经历 Personal Experience ===
  // =================================================

  // Speaking Task 2-1: 成功经历
  createCard(
    'speaking-task2-achievement',
    CardType.SPEAKING_TASK,
    '个人成就经历',
    '描述你人生中感到最自豪的一次成就',
    DifficultyLevel.CLB7,
    'reflective',
    {
      context: ['This happened when I was...', 'It was during my time at...', 'Back in [year]...'],
      experience: ['I worked really hard to...', 'What I did was...', 'The challenge was...'],
      feeling: ['I felt incredibly proud because...', 'This meant so much to me...', 'It was a defining moment...'],
      lesson: ['This experience taught me...', 'Looking back, I realize...', 'What I learned was...']
    },
    {
      vocabulary: {
        'worked hard': ['dedicated myself', 'put in tremendous effort'],
        'was happy': ['felt a sense of accomplishment', 'experienced genuine pride'],
        'did my best': ['gave my full commitment', 'pushed beyond my limits']
      },
      structure: {
        'I was proud.': 'This achievement filled me with a profound sense of pride and accomplishment.',
        'It was difficult.': 'The journey was challenging, but the outcome made every effort worthwhile.'
      }
    },
    {
      question: 'Describe an achievement you are most proud of.',
      keyPoints: ['set the context', 'describe the effort', 'explain your feelings', 'share the lesson learned']
    }
  ),

  // Speaking Task 2-2: 旅行经历
  createCard(
    'speaking-task2-memorable-trip',
    CardType.SPEAKING_TASK,
    '难忘旅行经历',
    '描述一次令你印象深刻的旅行经历',
    DifficultyLevel.CLB7,
    'storytelling',
    {
      introduction: ['One of my most memorable trips was...', 'I\'ll never forget the time I visited...', 'A few years ago, I had the opportunity to...'],
      description: ['The scenery was absolutely...', 'I was amazed by...', 'What stood out was...'],
      experience: ['During the trip, I...', 'One highlight was when...', 'I particularly enjoyed...'],
      reflection: ['This trip changed my perspective on...', 'What made it special was...', 'I still remember it because...']
    },
    {
      vocabulary: {
        'beautiful place': ['breathtaking destination', 'stunning location'],
        'had fun': ['thoroughly enjoyed myself', 'created lasting memories'],
        'saw many things': ['explored diverse attractions', 'experienced various activities']
      },
      structure: {
        'The place was nice.': 'The destination exceeded all my expectations with its natural beauty and cultural richness.',
        'I liked the food.': 'The local cuisine was an absolute highlight, offering authentic flavors I had never experienced before.'
      }
    },
    {
      question: 'Describe a memorable trip you have taken.',
      keyPoints: ['where and when', 'what you saw and did', 'memorable moments', 'why it was special']
    }
  ),

  // Speaking Task 2-3: 学习经历
  createCard(
    'speaking-task2-learning-skill',
    CardType.SPEAKING_TASK,
    '学习新技能经历',
    '描述你学习一项新技能的经历',
    DifficultyLevel.CLB8,
    'narrative',
    {
      background: ['I decided to learn this because...', 'My interest in this started when...', 'The reason I wanted to learn was...'],
      process: ['At first, it was challenging to...', 'I practiced by...', 'The learning process involved...'],
      breakthrough: ['The turning point came when...', 'I finally understood how to...', 'After much practice, I could...'],
      result: ['Now I can confidently...', 'This skill has helped me...', 'I continue to improve by...']
    },
    {
      vocabulary: {
        'learn': ['acquire', 'develop', 'master'],
        'practice': ['hone my skills', 'refine my technique'],
        'get better': ['show improvement', 'make progress']
      },
      structure: {
        'It was hard at first.': 'The initial learning curve was quite steep, requiring considerable patience and persistence.',
        'I practiced every day.': 'I dedicated myself to regular practice sessions to reinforce what I had learned.'
      }
    },
    {
      question: 'Describe a time when you learned a new skill.',
      keyPoints: ['motivation for learning', 'challenges faced', 'how you overcame them', 'current ability']
    }
  ),

  // Speaking Task 2-4: 帮助他人经历
  createCard(
    'speaking-task2-helping-others',
    CardType.SPEAKING_TASK,
    '帮助他人经历',
    '描述你帮助他人并感到满足的一次经历',
    DifficultyLevel.CLB8,
    'warm',
    {
      situation: ['There was a time when...', 'I noticed that someone needed...', 'The situation arose when...'],
      action: ['I decided to help by...', 'What I did was...', 'I offered to...'],
      reaction: ['They were so grateful...', 'The person responded by...', 'It made such a difference...'],
      reflection: ['This experience reminded me that...', 'Helping others is rewarding because...', 'I felt fulfilled knowing that...']
    },
    {
      vocabulary: {
        'helped': ['assisted', 'supported', 'lent a hand'],
        'was happy': ['felt gratified', 'experienced satisfaction'],
        'made a difference': ['had a positive impact', 'contributed meaningfully']
      },
      structure: {
        'They needed help.': 'They were in a situation where they could really benefit from some assistance.',
        'I felt good.': 'The experience left me with a deep sense of fulfillment and purpose.'
      }
    },
    {
      question: 'Describe a time when you helped someone and felt satisfied.',
      keyPoints: ['the situation', 'how you helped', 'the outcome', 'how it made you feel']
    }
  ),

  // Speaking Task 2-5: 克服困难经历
  createCard(
    'speaking-task2-overcoming-challenge',
    CardType.SPEAKING_TASK,
    '克服困难经历',
    '描述你克服一个重大挑战的经历',
    DifficultyLevel.CLB9,
    'inspirational',
    {
      challenge: ['The biggest challenge I faced was...', 'I found myself in a difficult situation when...', 'What made this particularly challenging was...'],
      approach: ['My strategy was to...', 'I tackled this by...', 'The steps I took included...'],
      struggle: ['There were moments when...', 'The hardest part was...', 'I almost gave up when...'],
      victory: ['Eventually, I succeeded in...', 'The breakthrough came when...', 'Looking back, I\'m proud that...']
    },
    {
      vocabulary: {
        'difficult': ['daunting', 'overwhelming', 'formidable'],
        'tried hard': ['persevered', 'remained determined'],
        'succeeded': ['prevailed', 'achieved my goal', 'emerged victorious']
      },
      structure: {
        'It was very hard.': 'The challenge tested my limits and pushed me far outside my comfort zone.',
        'I didn\'t give up.': 'Despite the obstacles, I maintained my resolve and continued to push forward.'
      }
    },
    {
      question: 'Describe a time when you overcame a significant challenge.',
      keyPoints: ['nature of the challenge', 'your approach', 'moments of doubt', 'the outcome and lessons']
    }
  ),

  // Speaking Task 2-6: 文化体验经历
  createCard(
    'speaking-task2-cultural-experience',
    CardType.SPEAKING_TASK,
    '文化体验经历',
    '描述你体验不同文化的一次经历',
    DifficultyLevel.CLB9,
    'appreciative',
    {
      context: ['I had this experience when...', 'It happened during my time in...', 'I was introduced to this culture through...'],
      discovery: ['What surprised me was...', 'I learned that...', 'The most interesting aspect was...'],
      participation: ['I got to experience...', 'I was invited to...', 'I tried to...'],
      impact: ['This experience broadened my perspective on...', 'It taught me to appreciate...', 'Since then, I have...']
    },
    {
      vocabulary: {
        'different': ['distinct', 'unique', 'diverse'],
        'interesting': ['fascinating', 'eye-opening', 'enlightening'],
        'learned about': ['gained insight into', 'developed an appreciation for']
      },
      structure: {
        'It was different from my culture.': 'The cultural practices I witnessed offered a fascinating contrast to my own upbringing.',
        'I learned new things.': 'This experience provided valuable insights that enriched my understanding of global diversity.'
      }
    },
    {
      question: 'Describe an experience where you learned about a different culture.',
      keyPoints: ['how you encountered this culture', 'what you observed', 'what you participated in', 'how it affected you']
    }
  ),

  // =====================================================
  // === SPEAKING TASK 3: 描述场景 Describing a Scene ===
  // =====================================================

  // Speaking Task 3-1: 公园场景
  createCard(
    'speaking-task3-park-scene',
    CardType.SPEAKING_TASK,
    '公园场景描述',
    '描述一个繁忙的城市公园场景，包括人物活动和环境细节',
    DifficultyLevel.CLB7,
    'descriptive',
    {
      setting: ['In this picture, I can see...', 'The scene takes place in...', 'This appears to be...'],
      people: ['There are several people who...', 'I notice that some individuals are...', 'In the foreground, someone is...'],
      activities: ['Some people appear to be...', 'Others are engaged in...', 'I can also see that...'],
      atmosphere: ['The overall atmosphere seems...', 'It looks like a...', 'The scene conveys a sense of...']
    },
    {
      vocabulary: {
        'walking': ['strolling leisurely', 'taking a brisk walk'],
        'sitting': ['relaxing on a bench', 'lounging on the grass'],
        'playing': ['engaging in recreational activities', 'enjoying outdoor games']
      },
      structure: {
        'There are many people.': 'The park is bustling with visitors of various ages engaging in diverse activities.',
        'It is a nice day.': 'The weather appears to be pleasant, with clear skies and comfortable temperatures.'
      }
    },
    {
      question: 'Describe what you see in this picture of a city park.',
      keyPoints: ['overall setting', 'people and their activities', 'specific details', 'atmosphere and mood']
    }
  ),

  // Speaking Task 3-2: 办公室场景
  createCard(
    'speaking-task3-office-scene',
    CardType.SPEAKING_TASK,
    '办公室场景描述',
    '描述一个繁忙的办公室环境，包括员工活动和工作氛围',
    DifficultyLevel.CLB8,
    'professional',
    {
      setting: ['This picture shows a modern office...', 'The scene depicts a workplace...', 'I can see an open-plan office...'],
      people: ['Several employees are...', 'In the center, there is a group...', 'At the far end, I notice...'],
      activities: ['Some workers are focused on...', 'A few colleagues appear to be...', 'I can observe that...'],
      details: ['The office is equipped with...', 'On the desks, there are...', 'The lighting suggests...']
    },
    {
      vocabulary: {
        'working': ['concentrating on their tasks', 'collaborating on projects'],
        'meeting': ['having a discussion', 'brainstorming in a huddle'],
        'busy': ['productive', 'engaged', 'focused']
      },
      structure: {
        'People are working.': 'Employees are diligently focused on their respective tasks and responsibilities.',
        'It looks busy.': 'The atmosphere appears to be highly productive with a noticeable sense of purpose.'
      }
    },
    {
      question: 'Describe what you see in this picture of an office.',
      keyPoints: ['workspace layout', 'employee activities', 'office equipment', 'work atmosphere']
    }
  ),

  // Speaking Task 3-3: 市场场景
  createCard(
    'speaking-task3-market-scene',
    CardType.SPEAKING_TASK,
    '市场场景描述',
    '描述一个热闹的农贸市场场景，包括商贩、顾客和商品',
    DifficultyLevel.CLB7,
    'vivid',
    {
      setting: ['This is a vibrant farmer\'s market...', 'The scene shows a bustling marketplace...', 'I can see an outdoor market...'],
      vendors: ['Several vendors are...', 'The stall owners are...', 'Behind the counters, I notice...'],
      products: ['There is a wide variety of...', 'The stalls display...', 'I can see colorful...'],
      customers: ['Shoppers are browsing...', 'Some customers appear to be...', 'Families with children are...']
    },
    {
      vocabulary: {
        'selling': ['offering their goods', 'displaying their products'],
        'buying': ['selecting items', 'making purchases'],
        'fresh': ['locally-sourced', 'farm-fresh', 'organic']
      },
      structure: {
        'There is lots of food.': 'The market offers an abundant selection of fresh produce and artisanal goods.',
        'People are shopping.': 'Customers are carefully examining products and engaging with vendors.'
      }
    },
    {
      question: 'Describe what you see in this picture of a farmer\'s market.',
      keyPoints: ['market layout', 'vendors and stalls', 'products displayed', 'customer activity']
    }
  ),

  // Speaking Task 3-4: 餐厅场景
  createCard(
    'speaking-task3-restaurant-scene',
    CardType.SPEAKING_TASK,
    '餐厅场景描述',
    '描述一个繁忙的餐厅用餐场景，包括食客、服务员和环境',
    DifficultyLevel.CLB8,
    'atmospheric',
    {
      setting: ['This picture shows a cozy restaurant...', 'The scene depicts a dining establishment...', 'I can see a well-decorated eatery...'],
      diners: ['Several groups of people are...', 'At the table nearest to us, I notice...', 'Some diners appear to be...'],
      staff: ['A waiter is...', 'The serving staff are...', 'In the background, I can see...'],
      ambiance: ['The restaurant has a...', 'The lighting creates a...', 'The decor suggests...']
    },
    {
      vocabulary: {
        'eating': ['enjoying their meals', 'savoring the cuisine'],
        'serving': ['attending to customers', 'delivering orders'],
        'nice restaurant': ['upscale dining establishment', 'elegant eatery']
      },
      structure: {
        'People are eating.': 'Diners are engaged in animated conversation while enjoying their carefully prepared meals.',
        'The waiter is working.': 'The attentive staff members are efficiently managing the dining room service.'
      }
    },
    {
      question: 'Describe what you see in this picture of a restaurant.',
      keyPoints: ['restaurant atmosphere', 'diners and their activities', 'staff members', 'decor and setting']
    }
  ),

  // Speaking Task 3-5: 机场场景
  createCard(
    'speaking-task3-airport-scene',
    CardType.SPEAKING_TASK,
    '机场场景描述',
    '描述一个繁忙的机场航站楼场景，包括旅客、设施和活动',
    DifficultyLevel.CLB9,
    'detailed',
    {
      setting: ['This is a busy airport terminal...', 'The scene shows a departure hall...', 'I can see a modern airport...'],
      travelers: ['Various passengers are...', 'Some travelers appear to be...', 'Families and business people are...'],
      activities: ['At the check-in counters, staff are...', 'Near the security area, I notice...', 'Some people are rushing to...'],
      facilities: ['The terminal features...', 'Display boards show...', 'There are numerous...']
    },
    {
      vocabulary: {
        'waiting': ['queuing patiently', 'checking departure information'],
        'hurrying': ['rushing to catch their flights', 'moving quickly through the terminal'],
        'carrying bags': ['handling their luggage', 'wheeling their suitcases']
      },
      structure: {
        'The airport is busy.': 'The terminal is teeming with travelers navigating their way to various destinations.',
        'People are checking in.': 'Passengers are completing the check-in process and proceeding to their designated gates.'
      }
    },
    {
      question: 'Describe what you see in this picture of an airport.',
      keyPoints: ['terminal layout', 'passenger activities', 'airport facilities', 'overall atmosphere']
    }
  ),

  // Speaking Task 3-6: 建筑工地场景
  createCard(
    'speaking-task3-construction-scene',
    CardType.SPEAKING_TASK,
    '建筑工地场景描述',
    '描述一个活跃的建筑工地场景，包括工人、设备和进度',
    DifficultyLevel.CLB9,
    'technical',
    {
      setting: ['This picture shows an active construction site...', 'The scene depicts a building under construction...', 'I can see a major development project...'],
      workers: ['Several construction workers are...', 'Some laborers are operating...', 'A team of workers appears to be...'],
      equipment: ['Heavy machinery including...', 'Cranes are being used to...', 'Various tools and equipment are...'],
      progress: ['The structure has reached...', 'It appears that the project is...', 'The foundation seems to be...']
    },
    {
      vocabulary: {
        'building': ['constructing', 'erecting a structure'],
        'working hard': ['engaged in manual labor', 'performing their duties diligently'],
        'using machines': ['operating heavy equipment', 'utilizing specialized machinery']
      },
      structure: {
        'Workers are building.': 'Construction crews are actively engaged in various phases of the building process.',
        'There are many machines.': 'The site is equipped with an array of heavy machinery essential for the construction work.'
      }
    },
    {
      question: 'Describe what you see in this picture of a construction site.',
      keyPoints: ['site overview', 'worker activities', 'equipment and machinery', 'construction progress']
    }
  ),

  // =====================================================
  // === SPEAKING TASK 4: 做预测 Making Predictions ===
  // =====================================================

  // Speaking Task 4-1: 天气预测
  createCard(
    'speaking-task4-weather-prediction',
    CardType.SPEAKING_TASK,
    '天气变化预测',
    '根据当前天气情况，预测接下来可能发生的情况',
    DifficultyLevel.CLB7,
    'analytical',
    {
      observation: ['Looking at the current conditions...', 'Based on what I can see...', 'The sky indicates that...'],
      prediction: ['I predict that...', 'It seems likely that...', 'In the next few hours, we might...'],
      reasoning: ['This is because...', 'The signs suggest that...', 'Historically, this type of weather...'],
      preparation: ['Therefore, it would be wise to...', 'People should probably...', 'As a result, I would recommend...']
    },
    {
      vocabulary: {
        'rain': ['precipitation', 'shower', 'downpour'],
        'cloudy': ['overcast', 'gloomy', 'grey'],
        'change': ['shift', 'transition', 'turn']
      },
      structure: {
        'It will rain.': 'Based on the current atmospheric conditions, precipitation appears likely.',
        'Weather is changing.': 'The meteorological patterns suggest an imminent shift in weather conditions.'
      }
    },
    {
      question: 'Based on the current weather, what do you predict will happen next?',
      keyPoints: ['current observations', 'specific predictions', 'logical reasoning', 'recommended actions']
    }
  ),

  // Speaking Task 4-2: 活动预测
  createCard(
    'speaking-task4-event-prediction',
    CardType.SPEAKING_TASK,
    '活动发展预测',
    '根据一个社区活动的准备情况，预测活动将如何进行',
    DifficultyLevel.CLB7,
    'speculative',
    {
      setup: ['Looking at the preparations...', 'Based on what\'s being set up...', 'The organizers appear to be...'],
      prediction: ['I think the event will...', 'It\'s likely that...', 'I expect that...'],
      reasoning: ['This is evident from...', 'The reason I think so is...', 'Judging by the...'],
      outcome: ['By the end of the event...', 'The result will probably be...', 'Overall, I anticipate...']
    },
    {
      vocabulary: {
        'prepare': ['set up', 'organize', 'arrange'],
        'happen': ['take place', 'unfold', 'occur'],
        'successful': ['well-received', 'popular', 'a hit']
      },
      structure: {
        'Many people will come.': 'I anticipate a significant turnout based on the scale of preparations.',
        'It will be fun.': 'The event promises to offer enjoyable experiences for all attendees.'
      }
    },
    {
      question: 'Based on the preparations, what do you predict will happen at this event?',
      keyPoints: ['current preparations', 'attendance prediction', 'activities that will occur', 'expected outcome']
    }
  ),

  // Speaking Task 4-3: 交通预测
  createCard(
    'speaking-task4-traffic-prediction',
    CardType.SPEAKING_TASK,
    '交通状况预测',
    '根据当前交通状况和时间，预测接下来的交通情况',
    DifficultyLevel.CLB8,
    'logical',
    {
      observation: ['Currently, the traffic is...', 'I notice that the roads are...', 'At this time of day...'],
      prediction: ['In the next hour or so...', 'I expect the traffic to...', 'It\'s likely that...'],
      factors: ['This is because...', 'Several factors will contribute...', 'Considering the time and location...'],
      advice: ['Commuters should consider...', 'It would be advisable to...', 'My recommendation would be...']
    },
    {
      vocabulary: {
        'busy': ['congested', 'gridlocked', 'backed up'],
        'improve': ['ease up', 'clear up', 'flow more smoothly'],
        'rush hour': ['peak travel time', 'commuter hours']
      },
      structure: {
        'Traffic will get worse.': 'Congestion is expected to intensify as we approach the evening rush hour.',
        'Roads will be busy.': 'Major arterial routes are likely to experience significant delays.'
      }
    },
    {
      question: 'Based on current conditions, what do you predict will happen with traffic?',
      keyPoints: ['current traffic state', 'time-based predictions', 'contributing factors', 'advice for travelers']
    }
  ),

  // Speaking Task 4-4: 商业预测
  createCard(
    'speaking-task4-business-prediction',
    CardType.SPEAKING_TASK,
    '商业发展预测',
    '根据一家新店的开业情况，预测其未来发展',
    DifficultyLevel.CLB8,
    'business',
    {
      observation: ['Looking at this new business...', 'The store appears to have...', 'I notice that the location is...'],
      shortTerm: ['In the first few months...', 'Initially, I expect...', 'The opening period will likely...'],
      challenges: ['However, they might face...', 'Potential challenges include...', 'One concern could be...'],
      longTerm: ['In the long run...', 'If they can overcome these challenges...', 'Their success will depend on...']
    },
    {
      vocabulary: {
        'successful': ['profitable', 'thriving', 'prosperous'],
        'struggle': ['face difficulties', 'encounter challenges'],
        'grow': ['expand', 'develop', 'flourish']
      },
      structure: {
        'The business will do well.': 'The establishment appears well-positioned for commercial success.',
        'They might have problems.': 'The business may encounter certain operational challenges initially.'
      }
    },
    {
      question: 'Based on what you see, what do you predict will happen to this new business?',
      keyPoints: ['current observations', 'short-term predictions', 'potential challenges', 'long-term outlook']
    }
  ),

  // Speaking Task 4-5: 技术预测
  createCard(
    'speaking-task4-technology-prediction',
    CardType.SPEAKING_TASK,
    '技术发展预测',
    '根据当前技术趋势，预测未来几年的发展方向',
    DifficultyLevel.CLB9,
    'forward-thinking',
    {
      current: ['Looking at current technology trends...', 'We can observe that...', 'The technology landscape shows...'],
      prediction: ['In the next few years, I predict...', 'We will likely see...', 'Technology will probably...'],
      impact: ['This will affect people by...', 'The implications include...', 'Society will experience...'],
      concerns: ['However, we should also consider...', 'Potential drawbacks include...', 'We need to be mindful of...']
    },
    {
      vocabulary: {
        'advance': ['evolve', 'progress', 'develop'],
        'change': ['transform', 'revolutionize', 'reshape'],
        'popular': ['widely adopted', 'mainstream', 'ubiquitous']
      },
      structure: {
        'Technology will improve.': 'Technological capabilities are expected to advance significantly in the coming years.',
        'More people will use it.': 'Adoption rates are projected to increase substantially across demographics.'
      }
    },
    {
      question: 'Based on current trends, what do you predict about technology in the future?',
      keyPoints: ['current trends', 'specific predictions', 'societal impact', 'potential concerns']
    }
  ),

  // Speaking Task 4-6: 环境预测
  createCard(
    'speaking-task4-environment-prediction',
    CardType.SPEAKING_TASK,
    '环境变化预测',
    '根据当前环境状况，预测如果不采取行动会发生什么',
    DifficultyLevel.CLB9,
    'cautionary',
    {
      observation: ['Looking at the current environmental situation...', 'The evidence shows that...', 'We can observe that...'],
      prediction: ['If we don\'t take action...', 'Without intervention, we might see...', 'The consequences could include...'],
      impact: ['This would affect...', 'Communities would experience...', 'The impact on wildlife...'],
      solution: ['However, if we act now...', 'By making changes, we could...', 'There is still hope if...']
    },
    {
      vocabulary: {
        'get worse': ['deteriorate', 'decline', 'degrade'],
        'pollution': ['contamination', 'environmental degradation'],
        'protect': ['preserve', 'conserve', 'safeguard']
      },
      structure: {
        'The environment will suffer.': 'Environmental conditions are likely to deteriorate without immediate intervention.',
        'We must act now.': 'Urgent collective action is necessary to prevent irreversible environmental damage.'
      }
    },
    {
      question: 'Based on current conditions, what do you predict will happen to the environment?',
      keyPoints: ['current observations', 'consequences without action', 'who will be affected', 'potential solutions']
    }
  ),

  // =========================================================
  // === SPEAKING TASK 5: 比较和说服 Comparing & Persuading ===
  // =========================================================

  // Speaking Task 5-1: 选择餐厅
  createCard(
    'speaking-task5-restaurant-choice',
    CardType.SPEAKING_TASK,
    '选择餐厅说服',
    '朋友想去快餐店，你想说服他们选择更健康的餐厅',
    DifficultyLevel.CLB7,
    'persuasive',
    {
      acknowledge: ['I understand you want to...', 'I know fast food is convenient, but...', 'While I see the appeal of...'],
      compare: ['On the other hand...', 'In comparison...', 'If we look at both options...'],
      persuade: ['I really think we should...', 'The advantages of my choice include...', 'What makes this option better is...'],
      conclude: ['So what do you say?', 'Don\'t you agree that...', 'I\'m confident you\'ll enjoy...']
    },
    {
      vocabulary: {
        'better': ['more beneficial', 'superior', 'preferable'],
        'healthy': ['nutritious', 'wholesome', 'good for you'],
        'cheap': ['affordable', 'budget-friendly', 'economical']
      },
      structure: {
        'This restaurant is better.': 'This establishment offers a more enjoyable and nutritious dining experience.',
        'Fast food is not good.': 'While convenient, fast food often lacks the nutritional value we should prioritize.'
      }
    },
    {
      question: 'Your friend wants fast food, but you prefer a healthier restaurant. Persuade them.',
      keyPoints: ['acknowledge their preference', 'compare the options', 'present your arguments', 'make a convincing case']
    }
  ),

  // Speaking Task 5-2: 选择度假地点
  createCard(
    'speaking-task5-vacation-destination',
    CardType.SPEAKING_TASK,
    '度假地点选择',
    '朋友想去海滩度假，你想说服他们选择山区旅行',
    DifficultyLevel.CLB8,
    'enthusiastic',
    {
      acknowledge: ['I totally get why the beach appeals to you...', 'Beach vacations are great, but...', 'I hear you, the beach sounds relaxing...'],
      compare: ['However, consider this...', 'Let me compare the two...', 'While beaches are lovely...'],
      persuade: ['Mountains offer unique experiences like...', 'Think about the advantages...', 'What I love about mountain trips is...'],
      conclude: ['Trust me, you\'ll have an amazing time!', 'Let\'s try something different this time!', 'You won\'t regret it!']
    },
    {
      vocabulary: {
        'beautiful': ['breathtaking', 'stunning', 'picturesque'],
        'relaxing': ['peaceful', 'rejuvenating', 'tranquil'],
        'fun activities': ['exciting adventures', 'memorable experiences']
      },
      structure: {
        'Mountains are better.': 'A mountain getaway offers a unique combination of adventure and serenity.',
        'You can do many things.': 'The range of activities available is remarkably diverse and exciting.'
      }
    },
    {
      question: 'Your friend wants a beach vacation, but you prefer the mountains. Persuade them.',
      keyPoints: ['validate their preference', 'highlight mountain benefits', 'address potential concerns', 'build excitement']
    }
  ),

  // Speaking Task 5-3: 选择交通方式
  createCard(
    'speaking-task5-commute-method',
    CardType.SPEAKING_TASK,
    '通勤方式选择',
    '同事想开车上班，你想说服他们选择公共交通',
    DifficultyLevel.CLB8,
    'logical',
    {
      acknowledge: ['I understand driving gives you flexibility...', 'Having your own car is convenient...', 'I can see why you prefer driving...'],
      compare: ['But if you consider all factors...', 'Let\'s weigh the pros and cons...', 'When you think about it...'],
      persuade: ['Public transit has significant advantages...', 'You could save money by...', 'Think about the environmental impact...'],
      conclude: ['Why not give it a try for a week?', 'I think you\'d be pleasantly surprised!', 'It\'s worth considering, isn\'t it?']
    },
    {
      vocabulary: {
        'expensive': ['costly', 'a significant expense'],
        'stressful': ['taxing', 'frustrating', 'exhausting'],
        'save money': ['reduce expenses', 'cut costs', 'be more economical']
      },
      structure: {
        'Taking the bus is cheaper.': 'Public transportation offers substantial cost savings compared to daily driving.',
        'You won\'t be stressed.': 'Commuting by transit allows you to relax or be productive during your journey.'
      }
    },
    {
      question: 'Your colleague wants to drive to work. Persuade them to take public transit.',
      keyPoints: ['acknowledge convenience of driving', 'compare costs and stress', 'highlight transit benefits', 'suggest a trial']
    }
  ),

  // Speaking Task 5-4: 选择运动
  createCard(
    'speaking-task5-exercise-choice',
    CardType.SPEAKING_TASK,
    '运动方式选择',
    '朋友想加入健身房，你想说服他们选择户外跑步',
    DifficultyLevel.CLB7,
    'friendly',
    {
      acknowledge: ['Gym memberships have their benefits...', 'I know gyms have lots of equipment...', 'The gym is a popular choice, but...'],
      compare: ['Let me show you another perspective...', 'Compare that to outdoor running...', 'On the other hand...'],
      persuade: ['Running outdoors is fantastic because...', 'You get so many benefits like...', 'The best part about outdoor running is...'],
      conclude: ['Why don\'t we start tomorrow morning?', 'Join me for a run this weekend!', 'Give it a shot before you decide!']
    },
    {
      vocabulary: {
        'free': ['cost-free', 'no membership required'],
        'fresh air': ['outdoor atmosphere', 'natural environment'],
        'boring': ['monotonous', 'repetitive']
      },
      structure: {
        'Outdoor running is better.': 'Exercising outdoors provides unique benefits that a gym simply cannot match.',
        'It doesn\'t cost anything.': 'One of the greatest advantages is that it requires no financial commitment.'
      }
    },
    {
      question: 'Your friend wants to join a gym. Persuade them to try outdoor running instead.',
      keyPoints: ['acknowledge gym benefits', 'compare costs', 'highlight outdoor advantages', 'invite them to try']
    }
  ),

  // Speaking Task 5-5: 选择工作模式
  createCard(
    'speaking-task5-work-arrangement',
    CardType.SPEAKING_TASK,
    '工作模式选择',
    '同事想完全在办公室工作，你想说服他们尝试混合办公模式',
    DifficultyLevel.CLB9,
    'professional',
    {
      acknowledge: ['I understand the value of face-to-face interaction...', 'Office work has its advantages...', 'Being in the office is important for collaboration...'],
      compare: ['However, a hybrid approach offers...', 'Let\'s consider the best of both worlds...', 'Balancing both options could...'],
      persuade: ['Hybrid work improves productivity by...', 'Research shows that employees who...', 'You\'d benefit from...'],
      conclude: ['It might be worth proposing to management.', 'Would you consider trying it for a month?', 'The flexibility could really enhance your work-life balance.']
    },
    {
      vocabulary: {
        'flexible': ['adaptable', 'versatile', 'accommodating'],
        'productive': ['efficient', 'effective', 'high-performing'],
        'balance': ['equilibrium', 'harmony', 'healthy mix']
      },
      structure: {
        'Working from home saves time.': 'Remote work days eliminate commute time, allowing for increased productivity and personal time.',
        'You can focus better.': 'The home environment often provides fewer interruptions for deep, concentrated work.'
      }
    },
    {
      question: 'Your colleague prefers working only in the office. Persuade them to try hybrid work.',
      keyPoints: ['acknowledge office benefits', 'explain hybrid advantages', 'address collaboration concerns', 'suggest a trial period']
    }
  ),

  // Speaking Task 5-6: 选择学习方式
  createCard(
    'speaking-task5-learning-method',
    CardType.SPEAKING_TASK,
    '学习方式选择',
    '朋友想上传统大学课程，你想说服他们考虑在线学习',
    DifficultyLevel.CLB9,
    'advisory',
    {
      acknowledge: ['Traditional university offers a complete campus experience...', 'In-person learning has many benefits...', 'I understand the appeal of campus life...'],
      compare: ['Online learning, however, provides...', 'When you compare the flexibility...', 'Consider the differences in...'],
      persuade: ['For your situation, online learning might be ideal because...', 'Think about how you could...', 'The advantages include...'],
      conclude: ['Many successful people have taken this path.', 'Why not explore some options?', 'It could open doors you haven\'t considered.']
    },
    {
      vocabulary: {
        'convenient': ['practical', 'accessible', 'user-friendly'],
        'cheaper': ['more affordable', 'cost-effective', 'economically sound'],
        'flexible schedule': ['adaptable timeline', 'self-paced learning']
      },
      structure: {
        'Online courses are better for you.': 'Given your circumstances, online education offers significant practical advantages.',
        'You can study anywhere.': 'The location independence allows you to learn from virtually anywhere in the world.'
      }
    },
    {
      question: 'Your friend wants traditional university. Persuade them to consider online learning.',
      keyPoints: ['acknowledge campus experience', 'highlight flexibility benefits', 'discuss cost savings', 'address quality concerns']
    }
  ),

  // ================================================================
  // === SPEAKING TASK 6: 处理困难情况 Dealing with Difficult Situations ===
  // ================================================================

  // Speaking Task 6-1: 产品投诉
  createCard(
    'speaking-task6-product-complaint',
    CardType.SPEAKING_TASK,
    '处理产品投诉',
    '你买的电子产品坏了，需要与客服沟通解决问题',
    DifficultyLevel.CLB7,
    'assertive',
    {
      greeting: ['Hello, I need to speak with someone about...', 'Good morning, I\'m calling regarding...', 'Hi, I have an issue with a recent purchase...'],
      problem: ['The problem is that...', 'What happened was...', 'I\'m experiencing an issue where...'],
      request: ['I would like you to...', 'What I\'m hoping for is...', 'I expect that...'],
      resolution: ['Can you help me with this?', 'What options do I have?', 'How can we resolve this?']
    },
    {
      vocabulary: {
        'broken': ['defective', 'malfunctioning', 'faulty'],
        'return': ['exchange', 'get a refund for', 'replace'],
        'not happy': ['dissatisfied', 'disappointed', 'frustrated']
      },
      structure: {
        'The product doesn\'t work.': 'The device is not functioning as advertised and fails to perform basic operations.',
        'I want my money back.': 'Given the circumstances, I believe a full refund would be the appropriate resolution.'
      }
    },
    {
      question: 'Your electronic device stopped working. Speak to customer service to resolve the issue.',
      keyPoints: ['explain the situation clearly', 'describe the problem', 'state your desired outcome', 'negotiate politely']
    }
  ),

  // Speaking Task 6-2: 邻居噪音
  createCard(
    'speaking-task6-neighbor-noise',
    CardType.SPEAKING_TASK,
    '处理邻居噪音',
    '邻居经常深夜放大音乐，你需要礼貌地解决这个问题',
    DifficultyLevel.CLB8,
    'diplomatic',
    {
      approach: ['Hi, I hope you don\'t mind me coming over...', 'I wanted to talk to you about something...', 'I\'m sorry to bother you, but...'],
      problem: ['I\'ve noticed that...', 'The issue is that...', 'Lately, I\'ve been hearing...'],
      impact: ['This has been affecting my...', 'It makes it difficult for me to...', 'My family and I have been...'],
      solution: ['I was wondering if we could...', 'Perhaps we could find a compromise...', 'Would it be possible to...']
    },
    {
      vocabulary: {
        'loud': ['excessive', 'disruptive', 'intrusive'],
        'late at night': ['during nighttime hours', 'after quiet hours'],
        'sleep': ['rest', 'get adequate sleep', 'maintain a healthy sleep schedule']
      },
      structure: {
        'The music is too loud.': 'The volume of the music has been significantly impacting my ability to rest comfortably.',
        'I can\'t sleep.': 'The noise levels have been preventing me from getting the sleep I need for work.'
      }
    },
    {
      question: 'Your neighbor plays loud music late at night. Speak to them diplomatically.',
      keyPoints: ['approach respectfully', 'explain the impact', 'avoid accusatory language', 'propose a solution']
    }
  ),

  // Speaking Task 6-3: 工作冲突
  createCard(
    'speaking-task6-work-conflict',
    CardType.SPEAKING_TASK,
    '处理工作冲突',
    '同事没有完成分配给他们的工作，影响了整个团队的进度',
    DifficultyLevel.CLB9,
    'professional',
    {
      opening: ['Hey, do you have a moment to chat?', 'I wanted to discuss our project...', 'Can we talk about the deadline coming up?'],
      concern: ['I\'ve noticed that...', 'I\'m a bit concerned because...', 'The situation with...'],
      impact: ['This is affecting the team because...', 'Without this completed, we can\'t...', 'The rest of us are...'],
      collaboration: ['How can I help you...', 'Let\'s figure this out together...', 'What support do you need?']
    },
    {
      vocabulary: {
        'late': ['behind schedule', 'overdue', 'delayed'],
        'problem': ['challenge', 'obstacle', 'issue'],
        'help': ['assist', 'support', 'collaborate']
      },
      structure: {
        'You didn\'t finish.': 'I noticed the assigned tasks haven\'t been completed yet, and I wanted to check in.',
        'We need this done.': 'The team is counting on this deliverable to move forward with the next phase.'
      }
    },
    {
      question: 'A colleague hasn\'t completed their work, affecting the team. Address the situation.',
      keyPoints: ['approach without blame', 'express concern professionally', 'focus on solutions', 'offer support']
    }
  ),

  // Speaking Task 6-4: 服务不满
  createCard(
    'speaking-task6-service-issue',
    CardType.SPEAKING_TASK,
    '处理服务问题',
    '餐厅服务很慢，食物也不是你点的，需要与经理沟通',
    DifficultyLevel.CLB8,
    'calm',
    {
      attention: ['Excuse me, may I speak with the manager?', 'I\'d like to discuss my experience...', 'Could someone help me with an issue?'],
      issues: ['First, we\'ve been waiting for...', 'Additionally, when the food arrived...', 'On top of that...'],
      expectation: ['I expected better from...', 'Given the reputation of this establishment...', 'This is quite disappointing because...'],
      resolution: ['I would appreciate...', 'What can you do to make this right?', 'I think it would be fair if...']
    },
    {
      vocabulary: {
        'slow service': ['prolonged wait times', 'delayed service'],
        'wrong order': ['incorrect dish', 'order mix-up'],
        'disappointed': ['dissatisfied', 'let down', 'unhappy']
      },
      structure: {
        'The food is wrong.': 'Unfortunately, the dish served is not what I ordered from the menu.',
        'We waited too long.': 'We have been waiting for an unreasonable amount of time for our order.'
      }
    },
    {
      question: 'The restaurant service was slow and your order was wrong. Speak to the manager.',
      keyPoints: ['stay calm and polite', 'explain all issues', 'express your expectations', 'seek fair resolution']
    }
  ),

  // Speaking Task 6-5: 租房问题
  createCard(
    'speaking-task6-rental-issue',
    CardType.SPEAKING_TASK,
    '处理租房问题',
    '公寓暖气坏了房东一直没修，你需要督促房东尽快解决',
    DifficultyLevel.CLB9,
    'firm',
    {
      context: ['I\'m calling about the heating issue...', 'I submitted a repair request...', 'This is a follow-up regarding...'],
      history: ['It\'s been over two weeks since...', 'I\'ve contacted you several times about...', 'As you know, this problem has been ongoing...'],
      urgency: ['This is becoming a health concern...', 'With the weather getting colder...', 'The situation is no longer acceptable because...'],
      action: ['I need this fixed by...', 'According to the lease agreement...', 'If this isn\'t resolved, I may need to...']
    },
    {
      vocabulary: {
        'not working': ['broken', 'non-functional', 'out of service'],
        'cold': ['freezing', 'uncomfortable', 'uninhabitable'],
        'fix': ['repair', 'restore', 'address']
      },
      structure: {
        'You haven\'t fixed it.': 'Despite multiple requests, the heating system remains unrepaired.',
        'I need heat.': 'As a tenant, I have a right to a habitable living environment with functioning heating.'
      }
    },
    {
      question: 'Your apartment heating is broken and the landlord hasn\'t fixed it. Call to demand action.',
      keyPoints: ['summarize the history', 'emphasize urgency', 'reference tenant rights', 'set a deadline']
    }
  ),

  // Speaking Task 6-6: 预订错误
  createCard(
    'speaking-task6-booking-error',
    CardType.SPEAKING_TASK,
    '处理预订错误',
    '酒店把你的预订弄丢了，你需要在深夜解决住宿问题',
    DifficultyLevel.CLB9,
    'urgent',
    {
      situation: ['I have a reservation under...', 'I booked this room weeks ago...', 'My confirmation number is...'],
      evidence: ['I have the confirmation email right here...', 'You can see from this...', 'The booking was made through...'],
      urgency: ['It\'s midnight and I have nowhere to stay...', 'I\'ve been traveling all day and...', 'This is an emergency situation...'],
      demand: ['I need you to find me a room...', 'You need to honor this reservation...', 'What are you going to do to fix this?']
    },
    {
      vocabulary: {
        'lost reservation': ['missing booking', 'no record of my reservation'],
        'confirmation': ['booking proof', 'reservation details'],
        'unacceptable': ['inexcusable', 'completely unacceptable']
      },
      structure: {
        'You lost my reservation.': 'Despite having a valid confirmation, there appears to be no record of my booking in your system.',
        'I need a room now.': 'Given the late hour and your error, I require immediate accommodation arrangements.'
      }
    },
    {
      question: 'The hotel lost your reservation late at night. Resolve the situation.',
      keyPoints: ['present your evidence', 'explain the urgency', 'remain firm but professional', 'demand a solution']
    }
  ),

  // =====================================================
  // === SPEAKING TASK 7: 表达观点 Expressing Opinions ===
  // =====================================================

  // Speaking Task 7-1: 社交媒体影响
  createCard(
    'speaking-task7-social-media',
    CardType.SPEAKING_TASK,
    '社交媒体观点',
    '讨论社交媒体对年轻人的积极或消极影响',
    DifficultyLevel.CLB7,
    'balanced',
    {
      position: ['In my opinion...', 'I believe that...', 'My view on this is...'],
      reasoning: ['The reason I think this is...', 'This is because...', 'My argument is based on...'],
      examples: ['For example...', 'A clear illustration of this is...', 'We can see this when...'],
      conclusion: ['In conclusion...', 'Therefore, I maintain that...', 'To sum up...']
    },
    {
      vocabulary: {
        'good': ['beneficial', 'advantageous', 'positive'],
        'bad': ['detrimental', 'harmful', 'negative'],
        'use': ['utilize', 'engage with', 'interact with']
      },
      structure: {
        'Social media is good/bad.': 'Social media has both beneficial and detrimental effects on young people\'s development.',
        'Young people use it too much.': 'There is growing concern about excessive social media consumption among youth.'
      }
    },
    {
      question: 'What is your opinion about the impact of social media on young people?',
      keyPoints: ['state your position', 'provide reasons', 'give examples', 'acknowledge other views']
    }
  ),

  // Speaking Task 7-2: 远程工作
  createCard(
    'speaking-task7-remote-work',
    CardType.SPEAKING_TASK,
    '远程工作观点',
    '讨论远程工作应该成为永久选择还是应回归办公室',
    DifficultyLevel.CLB8,
    'analytical',
    {
      position: ['I strongly believe that...', 'From my perspective...', 'My stance on this issue is...'],
      reasoning: ['This position is supported by...', 'The evidence suggests that...', 'Research has shown that...'],
      counterpoint: ['Some might argue that...', 'On the other hand...', 'While others believe...'],
      conclusion: ['Taking all factors into consideration...', 'Ultimately, I believe...', 'In light of these points...']
    },
    {
      vocabulary: {
        'work from home': ['remote work', 'telecommuting', 'distributed work'],
        'productive': ['efficient', 'effective', 'high-performing'],
        'office': ['workplace', 'traditional work environment']
      },
      structure: {
        'Working from home is better.': 'Remote work offers significant advantages in terms of flexibility and work-life balance.',
        'People should go to the office.': 'The traditional office environment provides irreplaceable collaboration and networking opportunities.'
      }
    },
    {
      question: 'Should remote work become a permanent option for all workers?',
      keyPoints: ['clear position', 'supporting evidence', 'address counterarguments', 'balanced conclusion']
    }
  ),

  // Speaking Task 7-3: 动物园存在价值
  createCard(
    'speaking-task7-zoos',
    CardType.SPEAKING_TASK,
    '动物园存废观点',
    '讨论动物园对于动物保护和教育的价值与伦理争议',
    DifficultyLevel.CLB8,
    'thoughtful',
    {
      position: ['My view is that...', 'I hold the opinion that...', 'Personally, I think...'],
      reasoning: ['The main reason for my view is...', 'This is justified because...', 'Supporting this claim...'],
      nuance: ['However, it\'s important to consider...', 'That said, we must also recognize...', 'The situation is complex because...'],
      conclusion: ['On balance, I believe...', 'Weighing both sides...', 'My final position is...']
    },
    {
      vocabulary: {
        'protect animals': ['conserve wildlife', 'preserve species'],
        'keep animals locked up': ['confine animals', 'restrict animal freedom'],
        'learn about': ['gain knowledge about', 'develop awareness of']
      },
      structure: {
        'Zoos are good/bad.': 'Zoos play a complex role in conservation efforts while raising ethical concerns about animal welfare.',
        'Animals should be free.': 'Wildlife deserves to live in natural habitats rather than artificial enclosures.'
      }
    },
    {
      question: 'What is your opinion about the role of zoos in modern society?',
      keyPoints: ['state your position', 'discuss conservation', 'address ethics', 'provide balanced view']
    }
  ),

  // Speaking Task 7-4: 大学教育价值
  createCard(
    'speaking-task7-university-value',
    CardType.SPEAKING_TASK,
    '大学教育观点',
    '讨论在当今社会大学学位是否仍然必要',
    DifficultyLevel.CLB9,
    'critical',
    {
      position: ['I\'m of the opinion that...', 'My considered view is...', 'After much thought, I believe...'],
      analysis: ['Looking at the current landscape...', 'The data indicates that...', 'Evidence from various sectors shows...'],
      alternatives: ['Alternative pathways include...', 'We\'re seeing new options like...', 'Other routes to success...'],
      conclusion: ['Given these considerations...', 'My nuanced conclusion is...', 'The answer depends on...']
    },
    {
      vocabulary: {
        'degree': ['qualification', 'academic credential'],
        'necessary': ['essential', 'indispensable', 'required'],
        'succeed': ['achieve success', 'prosper', 'advance professionally']
      },
      structure: {
        'You need a degree.': 'A university education provides foundational knowledge and credentials valued by employers.',
        'Experience is more important.': 'Practical experience and demonstrated skills often outweigh formal qualifications in today\'s job market.'
      }
    },
    {
      question: 'Is a university degree still necessary for success today?',
      keyPoints: ['consider different career paths', 'discuss alternatives', 'analyze job market trends', 'provide nuanced answer']
    }
  ),

  // Speaking Task 7-5: 电子货币未来
  createCard(
    'speaking-task7-cashless-society',
    CardType.SPEAKING_TASK,
    '无现金社会观点',
    '讨论社会是否应该完全转向数字支付而淘汰现金',
    DifficultyLevel.CLB9,
    'forward-thinking',
    {
      position: ['My perspective on this trend is...', 'I take the view that...', 'Considering all aspects, I believe...'],
      benefits: ['The advantages include...', 'Digital payments offer...', 'A cashless system would...'],
      concerns: ['However, we must address...', 'Potential issues include...', 'Some populations might face...'],
      conclusion: ['Moving forward, I suggest...', 'A balanced approach would be...', 'Society should consider...']
    },
    {
      vocabulary: {
        'pay': ['make transactions', 'complete purchases'],
        'convenient': ['efficient', 'streamlined', 'hassle-free'],
        'problems': ['challenges', 'obstacles', 'concerns']
      },
      structure: {
        'Cash should be eliminated.': 'Digital transactions offer superior convenience, security, and transparency.',
        'We still need cash.': 'Physical currency remains essential for financial inclusion and privacy protection.'
      }
    },
    {
      question: 'Should society move toward becoming completely cashless?',
      keyPoints: ['discuss benefits', 'address accessibility concerns', 'consider privacy issues', 'propose balanced solution']
    }
  ),

  // Speaking Task 7-6: 义务投票
  createCard(
    'speaking-task7-mandatory-voting',
    CardType.SPEAKING_TASK,
    '义务投票观点',
    '讨论公民是否应该被强制要求参与投票',
    DifficultyLevel.CLB9,
    'democratic',
    {
      position: ['On this democratic issue, I believe...', 'My stance regarding mandatory voting is...', 'After careful consideration...'],
      democratic: ['From a democratic standpoint...', 'Regarding civic participation...', 'In terms of representation...'],
      freedom: ['However, personal freedom...', 'The question of choice...', 'Individual rights suggest...'],
      conclusion: ['Balancing these factors...', 'A reasonable approach would be...', 'Ultimately, I advocate for...']
    },
    {
      vocabulary: {
        'vote': ['participate in elections', 'exercise democratic rights'],
        'must': ['required to', 'obligated to', 'mandated to'],
        'free choice': ['voluntary participation', 'individual liberty']
      },
      structure: {
        'Everyone must vote.': 'Mandatory voting ensures broader democratic representation and civic engagement.',
        'Voting should be a choice.': 'The right to vote inherently includes the freedom to abstain from voting.'
      }
    },
    {
      question: 'Should voting be mandatory for all citizens?',
      keyPoints: ['democratic representation', 'individual freedom', 'practical implications', 'international examples']
    }
  ),

  // ================================================================
  // === SPEAKING TASK 8: 描述不寻常情况 Describing Unusual Situations ===
  // ================================================================

  // Speaking Task 8-1: 遇到名人
  createCard(
    'speaking-task8-celebrity-encounter',
    CardType.SPEAKING_TASK,
    '偶遇名人经历',
    '描述你在公共场合意外遇到名人的不寻常经历',
    DifficultyLevel.CLB7,
    'excited',
    {
      setting: ['This happened when I was...', 'I was just minding my own business at...', 'You won\'t believe what happened when...'],
      discovery: ['Suddenly, I realized...', 'That\'s when I noticed...', 'I couldn\'t believe my eyes when...'],
      reaction: ['My heart started racing because...', 'I was completely starstruck and...', 'I didn\'t know what to do, so...'],
      outcome: ['In the end...', 'The experience taught me...', 'I still can\'t believe that...']
    },
    {
      vocabulary: {
        'surprised': ['astonished', 'taken aback', 'stunned'],
        'famous person': ['celebrity', 'well-known figure', 'public figure'],
        'talked to': ['approached', 'struck up a conversation with', 'interacted with']
      },
      structure: {
        'I saw a famous person.': 'I unexpectedly found myself in the presence of a renowned celebrity.',
        'I was very surprised.': 'The encounter left me completely speechless and overwhelmed with excitement.'
      }
    },
    {
      question: 'Describe an unusual situation where you encountered a celebrity.',
      keyPoints: ['set the scene', 'describe the discovery', 'express your reaction', 'share the outcome']
    }
  ),

  // Speaking Task 8-2: 意外发现
  createCard(
    'speaking-task8-unexpected-discovery',
    CardType.SPEAKING_TASK,
    '意外发现经历',
    '描述你在日常生活中做出意外发现的不寻常情况',
    DifficultyLevel.CLB7,
    'curious',
    {
      context: ['It was an ordinary day when...', 'I never expected that...', 'What started as a normal...'],
      discovery: ['Then I stumbled upon...', 'To my amazement, I found...', 'What I discovered was...'],
      significance: ['This was unusual because...', 'What made it special was...', 'I realized that...'],
      result: ['This discovery led to...', 'Since then, I have...', 'It changed my perspective on...']
    },
    {
      vocabulary: {
        'found': ['discovered', 'came across', 'stumbled upon'],
        'surprising': ['remarkable', 'extraordinary', 'unexpected'],
        'interesting': ['intriguing', 'fascinating', 'captivating']
      },
      structure: {
        'I found something strange.': 'I made an unexpected discovery that completely caught me off guard.',
        'It was very unusual.': 'The circumstances surrounding this discovery were quite extraordinary.'
      }
    },
    {
      question: 'Describe an unusual situation where you made an unexpected discovery.',
      keyPoints: ['establish the ordinary context', 'describe what you found', 'explain why it was unusual', 'share the impact']
    }
  ),

  // Speaking Task 8-3: 巧合事件
  createCard(
    'speaking-task8-coincidence',
    CardType.SPEAKING_TASK,
    '奇妙巧合经历',
    '描述一次令人难以置信的巧合事件',
    DifficultyLevel.CLB8,
    'storytelling',
    {
      setup: ['Let me tell you about this incredible coincidence...', 'This is a story I love to share because...', 'The odds of this happening were...'],
      events: ['First, there was...', 'Then, separately...', 'Without any planning...'],
      connection: ['The amazing part was when...', 'What connected these events was...', 'The coincidence became clear when...'],
      reflection: ['I still can\'t explain how...', 'Some people might call it fate...', 'It made me think about...']
    },
    {
      vocabulary: {
        'coincidence': ['remarkable chance', 'serendipitous event', 'unlikely occurrence'],
        'unbelievable': ['incredible', 'astonishing', 'mind-blowing'],
        'happened at the same time': ['occurred simultaneously', 'took place concurrently']
      },
      structure: {
        'It was a big coincidence.': 'The probability of these events aligning was extraordinarily low.',
        'I couldn\'t believe it.': 'The coincidence was so remarkable that it seemed almost impossible.'
      }
    },
    {
      question: 'Describe an unusual coincidence that happened to you.',
      keyPoints: ['set up the separate events', 'reveal the connection', 'express your disbelief', 'reflect on the meaning']
    }
  ),

  // Speaking Task 8-4: 技术故障
  createCard(
    'speaking-task8-tech-failure',
    CardType.SPEAKING_TASK,
    '技术故障经历',
    '描述技术故障在关键时刻给你带来麻烦的不寻常情况',
    DifficultyLevel.CLB8,
    'frustrated',
    {
      situation: ['I was in the middle of...', 'It was a critical moment because...', 'Everything was going well until...'],
      failure: ['Then suddenly, the technology...', 'Without warning, my device...', 'The system completely...'],
      attempts: ['I tried everything to fix it...', 'My attempts to resolve the issue included...', 'Despite my efforts...'],
      resolution: ['Eventually, I had to...', 'The situation was saved when...', 'I learned that...']
    },
    {
      vocabulary: {
        'broke down': ['malfunctioned', 'crashed', 'failed'],
        'bad timing': ['worst possible moment', 'critical juncture'],
        'fixed it': ['resolved the issue', 'troubleshot the problem']
      },
      structure: {
        'My computer stopped working.': 'My device experienced a complete system failure at the most inopportune moment.',
        'It was terrible timing.': 'The technical malfunction occurred precisely when I needed the technology the most.'
      }
    },
    {
      question: 'Describe an unusual situation where technology failed you at a critical moment.',
      keyPoints: ['explain the critical situation', 'describe the failure', 'share your attempts to fix it', 'reveal the outcome']
    }
  ),

  // Speaking Task 8-5: 误会事件
  createCard(
    'speaking-task8-misunderstanding',
    CardType.SPEAKING_TASK,
    '误会事件经历',
    '描述一次因误会而导致尴尬或有趣情况的经历',
    DifficultyLevel.CLB9,
    'humorous',
    {
      setup: ['This embarrassing story happened when...', 'I still laugh/cringe when I think about...', 'It was a simple misunderstanding that led to...'],
      misunderstanding: ['What I thought was...', 'I completely misread the situation because...', 'The confusion arose when...'],
      escalation: ['Things got worse when...', 'The situation became more awkward because...', 'Before I knew it...'],
      resolution: ['Finally, we realized...', 'The truth came out when...', 'Looking back, I can laugh because...']
    },
    {
      vocabulary: {
        'misunderstanding': ['confusion', 'mix-up', 'miscommunication'],
        'embarrassed': ['mortified', 'humiliated', 'red-faced'],
        'realized the truth': ['understood what really happened', 'cleared up the confusion']
      },
      structure: {
        'I thought something wrong.': 'I completely misinterpreted the situation due to a lack of clear communication.',
        'It was very embarrassing.': 'The misunderstanding led to a genuinely mortifying situation.'
      }
    },
    {
      question: 'Describe an unusual situation that arose from a misunderstanding.',
      keyPoints: ['set the scene', 'explain what was misunderstood', 'describe how it escalated', 'share the resolution']
    }
  ),

  // Speaking Task 8-6: 极端天气
  createCard(
    'speaking-task8-extreme-weather',
    CardType.SPEAKING_TASK,
    '极端天气经历',
    '描述你经历极端天气事件的不寻常情况',
    DifficultyLevel.CLB9,
    'dramatic',
    {
      setting: ['I was caught in...', 'The weather event began when...', 'Nothing could have prepared me for...'],
      conditions: ['The conditions were unlike anything I\'d experienced...', 'What made it extreme was...', 'The intensity of the weather...'],
      actions: ['To stay safe, I had to...', 'My immediate response was...', 'Survival instincts kicked in and...'],
      aftermath: ['Once it was over...', 'The experience left me...', 'I gained a new appreciation for...']
    },
    {
      vocabulary: {
        'bad weather': ['severe conditions', 'extreme weather event', 'meteorological phenomenon'],
        'scary': ['terrifying', 'harrowing', 'frightening'],
        'stayed safe': ['sought shelter', 'took precautions', 'protected myself']
      },
      structure: {
        'The weather was very bad.': 'I experienced extreme weather conditions that tested my endurance and quick thinking.',
        'I was scared.': 'The intensity of the situation evoked genuine fear and respect for nature\'s power.'
      }
    },
    {
      question: 'Describe an unusual situation where you experienced extreme weather.',
      keyPoints: ['describe the weather event', 'explain how you responded', 'share your emotions', 'reflect on the experience']
    }
  ),

  // ================================================================
  // === LISTENING STRATEGIES: 听力策略卡片 ===
  // ================================================================

  // Listening Part 1: Problem Solving - 策略1
  createCard(
    'listening-part1-keywords',
    CardType.LISTENING_KEYWORD,
    'Part 1: 问题解决关键词',
    '掌握听力Part 1中识别问题和解决方案的关键词',
    DifficultyLevel.CLB7,
    'strategic',
    {
      problem_keywords: ['The issue is...', 'The problem seems to be...', 'We\'re having trouble with...'],
      solution_keywords: ['I suggest...', 'Why don\'t we...', 'The best option would be...'],
      agreement_keywords: ['That sounds good.', 'I agree with that.', 'Let\'s go with...'],
      rejection_keywords: ['I\'m not sure about that.', 'That might not work because...', 'Let\'s consider...']
    },
    {
      vocabulary: {
        'problem': ['issue', 'concern', 'difficulty'],
        'solution': ['option', 'approach', 'resolution'],
        'decide': ['determine', 'conclude', 'settle on']
      },
      structure: {
        'Listen for the problem.': 'Identify the initial issue presented in the conversation.',
        'Find the solution.': 'Listen for agreement phrases that indicate the final decision.'
      }
    },
    {
      question: 'Practice identifying problem-solution patterns in workplace conversations.',
      keyPoints: ['identify the problem first', 'track proposed solutions', 'note which solution is agreed upon', 'pay attention to reasoning']
    }
  ),

  // Listening Part 1: Problem Solving - 策略2
  createCard(
    'listening-part1-distractors',
    CardType.LISTENING_KEYWORD,
    'Part 1: 识别干扰选项',
    '学习如何在Part 1中识别和排除干扰选项',
    DifficultyLevel.CLB8,
    'analytical',
    {
      rejection_signals: ['Actually, that won\'t work because...', 'I thought about that, but...', 'That\'s too expensive/complicated...'],
      confirmation_signals: ['That\'s exactly what I was thinking.', 'Perfect, let\'s do that.', 'Great idea!'],
      change_of_mind: ['Wait, on second thought...', 'Actually, maybe we should...', 'Hmm, let me reconsider...'],
      final_decision: ['So we\'ll go with...', 'It\'s settled then.', 'That\'s our plan.']
    },
    {
      vocabulary: {
        'reject': ['dismiss', 'rule out', 'decline'],
        'agree': ['accept', 'approve', 'endorse'],
        'reconsider': ['think again', 'reevaluate', 'reassess']
      },
      structure: {
        'Not all options are correct.': 'Distractors may be mentioned but are ultimately rejected.',
        'Listen until the end.': 'The final decision often comes near the end of the conversation.'
      }
    },
    {
      question: 'Learn to distinguish between mentioned options and the final chosen solution.',
      keyPoints: ['track all options mentioned', 'note rejection phrases', 'identify the agreed solution', 'avoid selecting distractors']
    }
  ),

  // Listening Part 2: Daily Life - 策略1
  createCard(
    'listening-part2-context',
    CardType.LISTENING_KEYWORD,
    'Part 2: 日常对话场景',
    '识别日常生活对话中的场景线索和关键信息',
    DifficultyLevel.CLB7,
    'contextual',
    {
      location_cues: ['At the store...', 'In the office...', 'On the phone with...'],
      time_references: ['Yesterday...', 'Next week...', 'By the deadline...'],
      relationship_cues: ['My colleague said...', 'The manager asked...', 'The customer wants...'],
      action_phrases: ['I need to...', 'Could you please...', 'Would you mind...']
    },
    {
      vocabulary: {
        'appointment': ['meeting', 'scheduled time', 'booking'],
        'request': ['ask for', 'inquire about', 'seek'],
        'arrange': ['organize', 'set up', 'coordinate']
      },
      structure: {
        'Understand the context.': 'Identify who is speaking, where, and about what topic.',
        'Note specific details.': 'Pay attention to times, dates, names, and quantities.'
      }
    },
    {
      question: 'Practice identifying context and key details in everyday conversations.',
      keyPoints: ['identify the speakers', 'understand the setting', 'note specific details', 'track the main request or issue']
    }
  ),

  // Listening Part 2: Daily Life - 策略2
  createCard(
    'listening-part2-implicit',
    CardType.LISTENING_KEYWORD,
    'Part 2: 理解隐含信息',
    '学习从对话中推断隐含意思和态度',
    DifficultyLevel.CLB8,
    'inferential',
    {
      positive_attitude: ['I\'d be happy to...', 'That works perfectly.', 'I appreciate that.'],
      negative_attitude: ['I\'m not sure that\'s possible.', 'Unfortunately...', 'I wish I could, but...'],
      hesitation: ['Well, actually...', 'The thing is...', 'It depends on...'],
      emphasis: ['The main point is...', 'What\'s important is...', 'Don\'t forget that...']
    },
    {
      vocabulary: {
        'imply': ['suggest', 'indicate', 'hint at'],
        'tone': ['attitude', 'manner', 'sentiment'],
        'infer': ['deduce', 'conclude', 'understand']
      },
      structure: {
        'Read between the lines.': 'Understand what speakers mean beyond their literal words.',
        'Notice tone and emotion.': 'Pay attention to how something is said, not just what is said.'
      }
    },
    {
      question: 'Practice understanding implied meanings and speaker attitudes.',
      keyPoints: ['listen for tone of voice cues', 'identify hedging language', 'note emotional reactions', 'understand indirect refusals']
    }
  ),

  // Listening Part 3: Information - 策略1
  createCard(
    'listening-part3-note-taking',
    CardType.LISTENING_KEYWORD,
    'Part 3: 信息记录策略',
    '掌握听取信息性内容时的笔记策略',
    DifficultyLevel.CLB8,
    'systematic',
    {
      main_idea_signals: ['The purpose of this talk is...', 'Today I\'ll be discussing...', 'The main point is...'],
      detail_signals: ['Specifically...', 'For example...', 'This includes...'],
      sequence_signals: ['First... Second... Finally...', 'Before that...', 'After...'],
      emphasis_signals: ['Most importantly...', 'The key thing to remember...', 'Don\'t miss...']
    },
    {
      vocabulary: {
        'information': ['details', 'facts', 'data'],
        'purpose': ['goal', 'objective', 'aim'],
        'sequence': ['order', 'steps', 'process']
      },
      structure: {
        'Note the main idea first.': 'Understand the overall topic before focusing on details.',
        'Use abbreviations.': 'Develop shorthand for quick note-taking during the audio.'
      }
    },
    {
      question: 'Practice systematic note-taking during informational monologues.',
      keyPoints: ['identify main topic quickly', 'note key details', 'track sequence of information', 'review notes during question time']
    }
  ),

  // Listening Part 3: Information - 策略2
  createCard(
    'listening-part3-prediction',
    CardType.LISTENING_KEYWORD,
    'Part 3: 预测和验证',
    '学习根据主题预测可能出现的信息类型',
    DifficultyLevel.CLB9,
    'anticipatory',
    {
      preview_questions: ['Read questions before listening', 'Predict answer types', 'Note key question words'],
      topic_vocabulary: ['Anticipate relevant vocabulary', 'Think of synonyms', 'Consider related concepts'],
      answer_types: ['Numbers/dates', 'Names/places', 'Procedures/steps', 'Reasons/explanations'],
      verification: ['Match what you hear to predictions', 'Adjust if needed', 'Confirm with evidence']
    },
    {
      vocabulary: {
        'predict': ['anticipate', 'expect', 'foresee'],
        'verify': ['confirm', 'validate', 'check'],
        'relevant': ['pertinent', 'applicable', 'related']
      },
      structure: {
        'Preview before listening.': 'Use the question preview time to anticipate content.',
        'Verify predictions actively.': 'Check whether your predictions match what you hear.'
      }
    },
    {
      question: 'Practice previewing questions and predicting content.',
      keyPoints: ['use preview time effectively', 'predict answer types', 'listen for predicted information', 'adjust predictions as needed']
    }
  ),

  // Listening Part 4: News Items - 策略1
  createCard(
    'listening-part4-news-structure',
    CardType.LISTENING_KEYWORD,
    'Part 4: 新闻结构分析',
    '理解新闻报道的典型结构和关键信息位置',
    DifficultyLevel.CLB8,
    'journalistic',
    {
      headline_info: ['The main story is...', 'Breaking news...', 'In today\'s top story...'],
      five_w_h: ['Who is involved?', 'What happened?', 'When/Where did it happen?', 'Why/How did it happen?'],
      quotes_opinions: ['According to...', 'Officials say...', 'Experts believe...'],
      conclusion: ['The investigation continues...', 'More updates to follow...', 'This story is developing...']
    },
    {
      vocabulary: {
        'report': ['coverage', 'story', 'account'],
        'source': ['authority', 'official', 'expert'],
        'develop': ['unfold', 'progress', 'evolve']
      },
      structure: {
        'News follows inverted pyramid.': 'Most important information comes first, details follow.',
        'Identify the 5W+H.': 'Who, What, When, Where, Why, and How are key elements.'
      }
    },
    {
      question: 'Practice identifying key information in news-style broadcasts.',
      keyPoints: ['catch the main headline', 'identify the 5W+H elements', 'note sources and quotes', 'understand the conclusion']
    }
  ),

  // Listening Part 4: News Items - 策略2
  createCard(
    'listening-part4-current-events',
    CardType.LISTENING_KEYWORD,
    'Part 4: 新闻话题词汇',
    '掌握新闻报道中常见的话题和专业词汇',
    DifficultyLevel.CLB9,
    'topical',
    {
      economy: ['inflation', 'unemployment rate', 'market trends', 'economic growth'],
      environment: ['climate change', 'sustainability', 'emissions', 'conservation'],
      technology: ['innovation', 'breakthrough', 'digital transformation', 'cybersecurity'],
      health: ['outbreak', 'prevention measures', 'healthcare system', 'mental health']
    },
    {
      vocabulary: {
        'crisis': ['emergency', 'critical situation', 'urgent matter'],
        'initiative': ['program', 'project', 'campaign'],
        'impact': ['effect', 'consequence', 'influence']
      },
      structure: {
        'Build topic vocabulary.': 'Familiarize yourself with vocabulary for common news topics.',
        'Connect context to meaning.': 'Use topic context to understand unfamiliar words.'
      }
    },
    {
      question: 'Build vocabulary for common news topics and current affairs.',
      keyPoints: ['study common news vocabulary', 'understand different topic areas', 'practice with real news', 'build context knowledge']
    }
  ),

  // Listening Part 5: Discussion - 策略1
  createCard(
    'listening-part5-multiple-speakers',
    CardType.LISTENING_KEYWORD,
    'Part 5: 多人讨论追踪',
    '学习在多人讨论中追踪不同说话者的观点',
    DifficultyLevel.CLB8,
    'tracking',
    {
      speaker_identification: ['Note voice differences', 'Track names mentioned', 'Identify by opinion'],
      agreement_patterns: ['I agree with...', 'That\'s a good point.', 'Exactly what I was thinking.'],
      disagreement_patterns: ['I see it differently.', 'But what about...', 'I\'m not so sure...'],
      new_points: ['Another thing to consider...', 'We haven\'t mentioned...', 'Let me add...']
    },
    {
      vocabulary: {
        'perspective': ['viewpoint', 'position', 'stance'],
        'contribute': ['add', 'offer', 'suggest'],
        'debate': ['discuss', 'argue', 'deliberate']
      },
      structure: {
        'Track each speaker\'s position.': 'Note what each person believes about the topic.',
        'Notice agreement/disagreement.': 'Pay attention to when speakers agree or disagree.'
      }
    },
    {
      question: 'Practice tracking multiple speakers and their positions in discussions.',
      keyPoints: ['distinguish between speakers', 'note each position', 'track agreements and disagreements', 'identify the consensus if any']
    }
  ),

  // Listening Part 5: Discussion - 策略2
  createCard(
    'listening-part5-argument-flow',
    CardType.LISTENING_KEYWORD,
    'Part 5: 论点发展追踪',
    '理解讨论中论点如何发展和演变',
    DifficultyLevel.CLB9,
    'analytical',
    {
      initial_position: ['My view is that...', 'I believe...', 'From my perspective...'],
      supporting_evidence: ['For instance...', 'Research shows...', 'Consider the fact that...'],
      counterargument: ['However...', 'On the other hand...', 'But we must also consider...'],
      modified_position: ['Given that, maybe...', 'I see your point, so perhaps...', 'Combining our views...']
    },
    {
      vocabulary: {
        'evolve': ['develop', 'change', 'progress'],
        'concede': ['acknowledge', 'accept', 'admit'],
        'synthesize': ['combine', 'integrate', 'merge']
      },
      structure: {
        'Follow the argument arc.': 'Track how positions develop and change during discussion.',
        'Note concessions.': 'Pay attention when speakers modify their positions.'
      }
    },
    {
      question: 'Practice following how arguments develop in group discussions.',
      keyPoints: ['note initial positions', 'track supporting evidence', 'identify counterarguments', 'observe position changes']
    }
  ),

  // Listening Part 6: Viewpoints - 策略1
  createCard(
    'listening-part6-opinion-language',
    CardType.LISTENING_KEYWORD,
    'Part 6: 观点表达识别',
    '识别表达观点和态度的语言模式',
    DifficultyLevel.CLB8,
    'opinion-focused',
    {
      strong_opinion: ['I strongly believe...', 'There\'s no doubt that...', 'It\'s absolutely clear...'],
      moderate_opinion: ['I tend to think...', 'It seems to me...', 'Generally speaking...'],
      uncertain_opinion: ['I\'m not entirely sure, but...', 'It might be...', 'Possibly...'],
      qualified_opinion: ['In most cases...', 'With some exceptions...', 'It depends on...']
    },
    {
      vocabulary: {
        'convince': ['persuade', 'sway', 'influence'],
        'certainty': ['confidence', 'assurance', 'conviction'],
        'nuance': ['subtlety', 'distinction', 'fine point']
      },
      structure: {
        'Gauge opinion strength.': 'Determine how strongly the speaker holds their view.',
        'Note qualifications.': 'Pay attention to conditions and exceptions mentioned.'
      }
    },
    {
      question: 'Practice identifying opinion strength and nuance in statements.',
      keyPoints: ['distinguish strong vs. weak opinions', 'note qualifying language', 'identify certainty levels', 'understand hedging']
    }
  ),

  // Listening Part 6: Viewpoints - 策略2
  createCard(
    'listening-part6-compare-views',
    CardType.LISTENING_KEYWORD,
    'Part 6: 观点对比分析',
    '学习比较和对比不同说话者的观点',
    DifficultyLevel.CLB9,
    'comparative',
    {
      similarities: ['Like the previous speaker...', 'We both agree that...', 'Similarly...'],
      differences: ['Unlike...', 'In contrast to...', 'While they believe X, I think Y...'],
      evaluation: ['The stronger argument is...', 'More convincing is...', 'Better supported by...'],
      synthesis: ['Taking both views into account...', 'The truth may lie...', 'A balanced view would be...']
    },
    {
      vocabulary: {
        'contrast': ['differ', 'diverge', 'conflict'],
        'align': ['agree', 'match', 'correspond'],
        'evaluate': ['assess', 'judge', 'weigh']
      },
      structure: {
        'Map the viewpoints.': 'Create a mental map of different positions.',
        'Identify overlaps.': 'Find where speakers agree despite apparent differences.'
      }
    },
    {
      question: 'Practice comparing and contrasting multiple viewpoints.',
      keyPoints: ['identify key differences', 'find common ground', 'evaluate argument strength', 'synthesize perspectives']
    }
  ),

  // General Listening Strategy
  createCard(
    'listening-general-preview',
    CardType.LISTENING_KEYWORD,
    '通用策略: 预览时间利用',
    '学习如何有效利用听力考试的预览时间',
    DifficultyLevel.CLB7,
    'preparatory',
    {
      read_questions: ['Identify question types', 'Note key words', 'Predict answer forms'],
      preview_context: ['Understand the situation', 'Identify speakers', 'Anticipate vocabulary'],
      mental_preparation: ['Clear your mind', 'Focus on listening', 'Prepare to note-take'],
      strategic_reading: ['Prioritize difficult questions', 'Note time references', 'Identify proper nouns']
    },
    {
      vocabulary: {
        'preview': ['examine beforehand', 'look ahead', 'prepare for'],
        'anticipate': ['expect', 'predict', 'foresee'],
        'focus': ['concentrate', 'pay attention', 'direct attention']
      },
      structure: {
        'Use every second.': 'Preview time is valuable for preparation.',
        'Read actively.': 'Don\'t just read - predict and prepare.'
      }
    },
    {
      question: 'Practice maximizing preview time before each listening section.',
      keyPoints: ['read questions strategically', 'predict content', 'note key vocabulary', 'prepare mentally']
    }
  ),

  // General Listening Strategy 2
  createCard(
    'listening-general-answer',
    CardType.LISTENING_KEYWORD,
    '通用策略: 答题技巧',
    '掌握听力考试的高效答题策略',
    DifficultyLevel.CLB8,
    'tactical',
    {
      during_audio: ['Listen and answer simultaneously', 'Don\'t overthink', 'Trust first instinct'],
      uncertainty: ['Make best guess', 'Never leave blank', 'Mark for review'],
      changing_answers: ['Only change if certain', 'First answer usually correct', 'Don\'t second-guess'],
      time_management: ['Move on if stuck', 'Review at end', 'Balance time across questions']
    },
    {
      vocabulary: {
        'confident': ['certain', 'sure', 'assured'],
        'eliminate': ['rule out', 'exclude', 'discard'],
        'efficient': ['effective', 'productive', 'streamlined']
      },
      structure: {
        'Answer as you listen.': 'Don\'t wait until the end to answer.',
        'Trust your preparation.': 'Your first instinct is often correct.'
      }
    },
    {
      question: 'Practice efficient answering strategies during listening tests.',
      keyPoints: ['answer during audio', 'never leave blanks', 'trust first instinct', 'manage time wisely']
    }
  ),

  // Listening Vocabulary
  createCard(
    'listening-signal-words',
    CardType.LISTENING_KEYWORD,
    '信号词和过渡语',
    '识别听力中表示重要信息的信号词和过渡语',
    DifficultyLevel.CLB7,
    'structural',
    {
      emphasis: ['The key point is...', 'Most importantly...', 'Don\'t forget...', 'Remember that...'],
      contrast: ['However...', 'On the other hand...', 'But...', 'Although...'],
      addition: ['Moreover...', 'Additionally...', 'Furthermore...', 'Also...'],
      conclusion: ['In conclusion...', 'To summarize...', 'Finally...', 'Overall...']
    },
    {
      vocabulary: {
        'signal': ['indicate', 'show', 'mark'],
        'transition': ['shift', 'change', 'move'],
        'structure': ['organization', 'framework', 'pattern']
      },
      structure: {
        'Signal words guide listening.': 'These words tell you what kind of information is coming.',
        'Pay special attention after signals.': 'Important information often follows signal words.'
      }
    },
    {
      question: 'Practice recognizing signal words that indicate important information.',
      keyPoints: ['memorize common signal words', 'listen for emphasis markers', 'note transitions', 'anticipate what follows']
    }
  ),

  // ================================================================
  // === READING STRATEGIES: 阅读策略卡片 ===
  // ================================================================

  // Reading Part 1: Correspondence - 策略1
  createCard(
    'reading-part1-email-structure',
    CardType.LISTENING_KEYWORD,
    'Part 1: 邮件结构识别',
    '掌握商务和个人邮件的典型结构和关键元素',
    DifficultyLevel.CLB7,
    'structural',
    {
      greeting: ['Dear...', 'Hi...', 'To Whom It May Concern...'],
      purpose: ['I am writing to...', 'The purpose of this email is...', 'I wanted to follow up on...'],
      body: ['First...', 'Additionally...', 'Furthermore...'],
      closing: ['Best regards...', 'Sincerely...', 'Thank you for your time...']
    },
    {
      vocabulary: {
        'request': ['ask for', 'inquire about', 'seek'],
        'inform': ['notify', 'advise', 'let you know'],
        'respond': ['reply', 'get back to', 'answer']
      },
      structure: {
        'Identify the email type.': 'Determine if it is formal, semi-formal, or informal.',
        'Find the main purpose.': 'The first paragraph usually states why the email was written.'
      }
    },
    {
      question: 'Practice identifying email structure and purpose quickly.',
      keyPoints: ['identify formality level', 'find the main purpose', 'note key requests', 'understand the expected action']
    }
  ),

  // Reading Part 1: Correspondence - 策略2
  createCard(
    'reading-part1-inference',
    CardType.LISTENING_KEYWORD,
    'Part 1: 信函推理技巧',
    '学习从书信中推断写信人的态度和隐含意思',
    DifficultyLevel.CLB8,
    'inferential',
    {
      positive_tone: ['I would be delighted...', 'I appreciate your...', 'Thank you for...'],
      negative_tone: ['I am disappointed to...', 'Unfortunately...', 'I must express my concern...'],
      urgency: ['As soon as possible...', 'Immediately...', 'By [specific date]...'],
      politeness: ['Would you mind...', 'I would appreciate if...', 'At your earliest convenience...']
    },
    {
      vocabulary: {
        'imply': ['suggest', 'indicate', 'hint at'],
        'attitude': ['perspective', 'stance', 'position'],
        'infer': ['deduce', 'conclude', 'understand']
      },
      structure: {
        'Read between the lines.': 'Understand implied messages beyond literal meaning.',
        'Notice word choice.': 'The writer\'s vocabulary choices reveal attitude.'
      }
    },
    {
      question: 'Practice inferring writer\'s attitude and implicit messages.',
      keyPoints: ['identify tone words', 'notice urgency indicators', 'understand politeness levels', 'infer unstated expectations']
    }
  ),

  // Reading Part 1: Correspondence - 策略3
  createCard(
    'reading-part1-question-types',
    CardType.LISTENING_KEYWORD,
    'Part 1: 常见题型分析',
    '熟悉Part 1中常见的问题类型和应对策略',
    DifficultyLevel.CLB8,
    'strategic',
    {
      purpose_questions: ['Why did the writer...', 'What is the purpose of...', 'The email was written to...'],
      detail_questions: ['According to the email...', 'What does the writer mention about...', 'When/Where/How...'],
      inference_questions: ['What can be inferred about...', 'The writer probably thinks...', 'What is implied...'],
      vocabulary_questions: ['The word \'X\' most likely means...', 'Which word could replace...']
    },
    {
      vocabulary: {
        'purpose': ['aim', 'objective', 'intention'],
        'detail': ['specific information', 'particular', 'precise'],
        'inference': ['conclusion', 'deduction', 'interpretation']
      },
      structure: {
        'Match question to strategy.': 'Different question types require different reading approaches.',
        'Locate evidence.': 'Always find text evidence to support your answer.'
      }
    },
    {
      question: 'Practice identifying and answering different question types.',
      keyPoints: ['identify question type', 'use appropriate strategy', 'find text evidence', 'eliminate wrong answers']
    }
  ),

  // Reading Part 2: Diagram - 策略1
  createCard(
    'reading-part2-visual-text',
    CardType.LISTENING_KEYWORD,
    'Part 2: 图表与文本结合',
    '学习如何有效结合图表和文本信息回答问题',
    DifficultyLevel.CLB7,
    'visual',
    {
      diagram_elements: ['Labels and titles', 'Categories and sections', 'Arrows and connections', 'Numbers and percentages'],
      text_clues: ['According to the diagram...', 'As shown in...', 'The chart indicates...'],
      matching_skills: ['Match text descriptions to visual elements', 'Cross-reference information', 'Verify details'],
      common_diagrams: ['Floor plans', 'Organizational charts', 'Process diagrams', 'Schedules']
    },
    {
      vocabulary: {
        'illustrate': ['show', 'demonstrate', 'depict'],
        'correspond': ['match', 'relate to', 'connect with'],
        'indicate': ['show', 'point to', 'suggest']
      },
      structure: {
        'Study the diagram first.': 'Understand the visual before reading the text.',
        'Cross-reference actively.': 'Move between text and diagram to verify information.'
      }
    },
    {
      question: 'Practice integrating visual and text information effectively.',
      keyPoints: ['understand diagram structure', 'locate key labels', 'match text to visuals', 'verify with both sources']
    }
  ),

  // Reading Part 2: Diagram - 策略2
  createCard(
    'reading-part2-location',
    CardType.LISTENING_KEYWORD,
    'Part 2: 位置和方向理解',
    '掌握描述位置、方向和空间关系的词汇',
    DifficultyLevel.CLB8,
    'spatial',
    {
      location_words: ['adjacent to', 'opposite', 'next to', 'across from'],
      direction_words: ['north/south/east/west', 'left/right', 'upper/lower', 'entrance/exit'],
      relationship_words: ['between', 'among', 'alongside', 'behind'],
      measurement_words: ['approximately', 'roughly', 'within', 'beyond']
    },
    {
      vocabulary: {
        'adjacent': ['next to', 'beside', 'neighboring'],
        'opposite': ['across from', 'facing', 'on the other side'],
        'intersection': ['crossing', 'junction', 'meeting point']
      },
      structure: {
        'Orient yourself first.': 'Establish reference points on the diagram.',
        'Follow directions carefully.': 'Pay attention to left/right, north/south distinctions.'
      }
    },
    {
      question: 'Practice understanding spatial relationships in diagrams.',
      keyPoints: ['identify reference points', 'understand directional terms', 'track relationships', 'visualize the layout']
    }
  ),

  // Reading Part 3: Information - 策略1
  createCard(
    'reading-part3-skimming',
    CardType.LISTENING_KEYWORD,
    'Part 3: 快速略读技巧',
    '学习如何快速略读长文本以获取主要信息',
    DifficultyLevel.CLB8,
    'efficient',
    {
      title_headings: ['Read titles and subtitles first', 'Note section headings', 'Preview bold text'],
      first_last: ['Read first sentence of paragraphs', 'Check concluding sentences', 'Note topic shifts'],
      keywords: ['Identify topic words', 'Note repeated terms', 'Find names and numbers'],
      structure_clues: ['Notice paragraph organization', 'Identify text type', 'Recognize patterns']
    },
    {
      vocabulary: {
        'skim': ['glance over', 'browse', 'read quickly'],
        'main idea': ['central point', 'key message', 'primary concept'],
        'overview': ['general view', 'summary', 'big picture']
      },
      structure: {
        'Don\'t read every word.': 'Skimming means selective reading for main ideas.',
        'Focus on structure.': 'Use text organization to locate information quickly.'
      }
    },
    {
      question: 'Practice skimming techniques for long informational texts.',
      keyPoints: ['preview structure', 'read strategically', 'identify main ideas quickly', 'save time for questions']
    }
  ),

  // Reading Part 3: Information - 策略2
  createCard(
    'reading-part3-scanning',
    CardType.LISTENING_KEYWORD,
    'Part 3: 精准扫读技巧',
    '学习如何快速扫读定位特定信息',
    DifficultyLevel.CLB8,
    'targeted',
    {
      number_scanning: ['Look for dates and times', 'Find prices and quantities', 'Locate statistics'],
      name_scanning: ['Identify proper nouns', 'Find person names', 'Locate place names'],
      keyword_matching: ['Match question keywords to text', 'Find synonyms', 'Locate paraphrases'],
      section_targeting: ['Use headings to narrow search', 'Focus on relevant paragraphs', 'Skip irrelevant sections']
    },
    {
      vocabulary: {
        'scan': ['search', 'look through', 'examine quickly'],
        'locate': ['find', 'pinpoint', 'identify'],
        'specific': ['particular', 'precise', 'exact']
      },
      structure: {
        'Know what you\'re looking for.': 'Read the question first, then scan.',
        'Use visual cues.': 'Numbers and capital letters stand out in text.'
      }
    },
    {
      question: 'Practice scanning for specific information efficiently.',
      keyPoints: ['identify target information', 'use visual cues', 'match keywords', 'confirm answers']
    }
  ),

  // Reading Part 3: Information - 策略3
  createCard(
    'reading-part3-paragraph-structure',
    CardType.LISTENING_KEYWORD,
    'Part 3: 段落结构分析',
    '理解信息类文本的段落组织和信息分布',
    DifficultyLevel.CLB9,
    'analytical',
    {
      topic_sentences: ['Usually first sentence', 'States paragraph main idea', 'Sets expectations'],
      supporting_details: ['Examples and evidence', 'Explanations', 'Statistics and facts'],
      transitions: ['Show relationship between ideas', 'Signal topic change', 'Connect paragraphs'],
      conclusions: ['Summarize key points', 'Draw implications', 'State recommendations']
    },
    {
      vocabulary: {
        'develop': ['expand on', 'elaborate', 'explain further'],
        'support': ['back up', 'provide evidence', 'justify'],
        'conclude': ['finish', 'wrap up', 'summarize']
      },
      structure: {
        'Topic sentence is key.': 'Understanding it helps predict paragraph content.',
        'Details support the main idea.': 'Look for examples that illustrate the topic.'
      }
    },
    {
      question: 'Practice analyzing paragraph structure for better comprehension.',
      keyPoints: ['identify topic sentences', 'recognize supporting details', 'follow transitions', 'understand conclusions']
    }
  ),

  // Reading Part 4: Viewpoints - 策略1
  createCard(
    'reading-part4-opinion-identification',
    CardType.LISTENING_KEYWORD,
    'Part 4: 观点识别技巧',
    '学习识别和区分文章中不同作者或来源的观点',
    DifficultyLevel.CLB8,
    'critical',
    {
      opinion_markers: ['In my view...', 'I believe...', 'It seems to me...', 'Many argue that...'],
      attribution: ['According to...', 'X claims that...', 'Research suggests...', 'Critics argue...'],
      agreement: ['Similarly...', 'In agreement...', 'This supports...', 'Evidence confirms...'],
      disagreement: ['However...', 'In contrast...', 'Critics counter that...', 'On the other hand...']
    },
    {
      vocabulary: {
        'claim': ['assert', 'state', 'maintain'],
        'dispute': ['challenge', 'question', 'contest'],
        'viewpoint': ['perspective', 'position', 'stance']
      },
      structure: {
        'Track who says what.': 'Note which opinion belongs to which source.',
        'Distinguish fact from opinion.': 'Facts can be verified; opinions are subjective.'
      }
    },
    {
      question: 'Practice identifying and attributing different viewpoints.',
      keyPoints: ['identify opinion markers', 'track sources', 'distinguish fact vs. opinion', 'note agreement/disagreement']
    }
  ),

  // Reading Part 4: Viewpoints - 策略2
  createCard(
    'reading-part4-argument-analysis',
    CardType.LISTENING_KEYWORD,
    'Part 4: 论证分析技巧',
    '分析作者如何支持其观点以及论证的强度',
    DifficultyLevel.CLB9,
    'evaluative',
    {
      evidence_types: ['Statistics and data', 'Expert opinions', 'Examples and cases', 'Research findings'],
      reasoning_patterns: ['Cause and effect', 'Comparison', 'Problem-solution', 'Chronological'],
      strength_indicators: ['Strong evidence', 'Weak support', 'Logical fallacies', 'Biased reasoning'],
      author_techniques: ['Emotional appeal', 'Logical reasoning', 'Credibility', 'Counter-arguments']
    },
    {
      vocabulary: {
        'evidence': ['proof', 'support', 'justification'],
        'reasoning': ['logic', 'rationale', 'argumentation'],
        'credible': ['believable', 'trustworthy', 'reliable']
      },
      structure: {
        'Evaluate evidence quality.': 'Strong arguments have reliable, relevant evidence.',
        'Look for logical connections.': 'Check if conclusions follow from evidence.'
      }
    },
    {
      question: 'Practice evaluating the strength of arguments and evidence.',
      keyPoints: ['identify evidence types', 'assess reasoning', 'evaluate credibility', 'recognize weaknesses']
    }
  ),

  // Reading Part 4: Viewpoints - 策略3
  createCard(
    'reading-part4-compare-contrast',
    CardType.LISTENING_KEYWORD,
    'Part 4: 观点比较技巧',
    '学习比较和对比多个文本中的不同观点',
    DifficultyLevel.CLB9,
    'comparative',
    {
      similarities: ['Both authors agree that...', 'Similarly...', 'Like the first author...'],
      differences: ['Unlike...', 'In contrast...', 'The authors differ on...'],
      synthesis: ['Taking both views together...', 'A balanced perspective would...', 'Considering all arguments...'],
      evaluation: ['The stronger argument is...', 'More convincing evidence comes from...', 'The better-supported claim is...']
    },
    {
      vocabulary: {
        'compare': ['contrast', 'juxtapose', 'examine together'],
        'synthesize': ['combine', 'integrate', 'merge'],
        'evaluate': ['assess', 'judge', 'weigh']
      },
      structure: {
        'Create a comparison framework.': 'Note similarities and differences systematically.',
        'Look for the complete picture.': 'Multiple texts often provide complementary perspectives.'
      }
    },
    {
      question: 'Practice comparing viewpoints across multiple texts.',
      keyPoints: ['identify key differences', 'find common ground', 'synthesize perspectives', 'evaluate arguments']
    }
  ),

  // General Reading Strategy 1
  createCard(
    'reading-general-time-management',
    CardType.LISTENING_KEYWORD,
    '通用策略: 时间管理',
    '学习如何在阅读考试中有效分配时间',
    DifficultyLevel.CLB7,
    'strategic',
    {
      section_timing: ['Know time for each section', 'Set mental checkpoints', 'Adjust pace as needed'],
      question_prioritization: ['Answer easy questions first', 'Return to difficult ones', 'Don\'t spend too long on one'],
      reading_efficiency: ['Skim first, then read carefully', 'Focus on questions, not just text', 'Read actively with purpose'],
      final_review: ['Save time for review', 'Check unanswered questions', 'Verify tricky answers']
    },
    {
      vocabulary: {
        'allocate': ['assign', 'distribute', 'divide'],
        'prioritize': ['rank', 'order', 'focus on'],
        'efficient': ['effective', 'productive', 'economical']
      },
      structure: {
        'Plan your time.': 'Know how much time you have for each section.',
        'Work strategically.': 'Easy points first, difficult ones later.'
      }
    },
    {
      question: 'Practice time management strategies for reading tests.',
      keyPoints: ['know section timings', 'prioritize questions', 'read efficiently', 'save time for review']
    }
  ),

  // General Reading Strategy 2
  createCard(
    'reading-general-vocabulary',
    CardType.LISTENING_KEYWORD,
    '通用策略: 词汇推断',
    '学习如何在阅读中推断不熟悉词汇的含义',
    DifficultyLevel.CLB8,
    'vocabulary',
    {
      context_clues: ['Look at surrounding words', 'Check the sentence meaning', 'Consider paragraph topic'],
      word_parts: ['Identify prefixes', 'Recognize suffixes', 'Find root words'],
      relationship_clues: ['Synonyms nearby', 'Antonyms for contrast', 'Examples following'],
      skip_strategy: ['Not all unknown words matter', 'Focus on key vocabulary', 'Use overall comprehension']
    },
    {
      vocabulary: {
        'infer': ['deduce', 'conclude', 'figure out'],
        'context': ['surrounding text', 'setting', 'environment'],
        'approximate': ['estimate', 'guess', 'come close to']
      },
      structure: {
        'Use context first.': 'The meaning is often clear from surrounding text.',
        'Don\'t panic over unknowns.': 'You can understand text without knowing every word.'
      }
    },
    {
      question: 'Practice vocabulary inference strategies.',
      keyPoints: ['use context clues', 'analyze word parts', 'identify relationships', 'know when to skip']
    }
  ),

  // General Reading Strategy 3
  createCard(
    'reading-general-answer-elimination',
    CardType.LISTENING_KEYWORD,
    '通用策略: 排除法答题',
    '学习使用排除法高效选择正确答案',
    DifficultyLevel.CLB8,
    'tactical',
    {
      elimination_criteria: ['Too extreme', 'Not mentioned', 'Opposite meaning', 'Partially correct'],
      trap_answers: ['Correct information, wrong question', 'True but irrelevant', 'Distorted details'],
      verification: ['Return to text', 'Find evidence', 'Check all options'],
      confidence_levels: ['Definitely wrong', 'Probably wrong', 'Maybe correct', 'Definitely correct']
    },
    {
      vocabulary: {
        'eliminate': ['rule out', 'exclude', 'reject'],
        'verify': ['confirm', 'check', 'validate'],
        'distractor': ['wrong option', 'trap answer', 'misleading choice']
      },
      structure: {
        'Start by eliminating.': 'Remove clearly wrong answers first.',
        'Evidence is essential.': 'The correct answer should be supported by the text.'
      }
    },
    {
      question: 'Practice answer elimination techniques.',
      keyPoints: ['identify clearly wrong answers', 'recognize trap answers', 'verify with text', 'choose confidently']
    }
  ),

  // Reading Vocabulary
  createCard(
    'reading-academic-vocabulary',
    CardType.LISTENING_KEYWORD,
    '学术阅读词汇',
    '掌握CELPIP阅读中常见的学术和正式词汇',
    DifficultyLevel.CLB9,
    'academic',
    {
      analysis_words: ['examine', 'evaluate', 'assess', 'investigate', 'analyze'],
      argument_words: ['contend', 'assert', 'claim', 'maintain', 'propose'],
      connection_words: ['consequently', 'therefore', 'furthermore', 'nevertheless', 'moreover'],
      evaluation_words: ['significant', 'substantial', 'considerable', 'negligible', 'crucial']
    },
    {
      vocabulary: {
        'contend': ['argue', 'claim', 'maintain'],
        'substantial': ['considerable', 'significant', 'large'],
        'nevertheless': ['however', 'yet', 'still']
      },
      structure: {
        'Build academic vocabulary.': 'These words appear frequently in formal texts.',
        'Recognize patterns.': 'Academic vocabulary follows predictable patterns.'
      }
    },
    {
      question: 'Build vocabulary for academic and formal reading passages.',
      keyPoints: ['study common academic words', 'practice recognition', 'understand usage', 'expand vocabulary systematically']
    }
  ),

  // ========================================
  // === VOCABULARY: 学术词汇 Batch 1 (20张) ===
  // ========================================

  // 1. Academic Verb: Analyze
  createCard(
    'vocab-academic-analyze',
    CardType.LISTENING_KEYWORD,
    '学术动词: Analyze',
    '分析、剖析 - 学术写作和口语中常用动词',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['to examine something in detail', 'to study the parts of something'],
      collocations: ['analyze data', 'analyze results', 'analyze the situation', 'carefully analyze'],
      examples: ['We need to analyze the survey results before drawing conclusions.', 'The report analyzes trends in employment.']
    },
    {
      vocabulary: {
        'analyze': ['examine', 'investigate', 'assess', 'evaluate'],
        'look at': ['analyze', 'scrutinize', 'inspect']
      },
      structure: {
        'I looked at the data.': 'I analyzed the data thoroughly.',
        'Check the results.': 'Analyze the results systematically.'
      }
    },
    {
      question: 'Use "analyze" appropriately in academic contexts.',
      keyPoints: ['formal verb for examination', 'implies systematic study', 'common in reports', 'often followed by data/results']
    }
  ),

  // 2. Academic Verb: Evaluate
  createCard(
    'vocab-academic-evaluate',
    CardType.LISTENING_KEYWORD,
    '学术动词: Evaluate',
    '评估、评价 - 表达判断和价值评估',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['to judge the value or quality of something', 'to assess worth or significance'],
      collocations: ['evaluate performance', 'evaluate options', 'evaluate the effectiveness', 'critically evaluate'],
      examples: ['We must evaluate all options before making a decision.', 'The committee will evaluate each proposal carefully.']
    },
    {
      vocabulary: {
        'evaluate': ['assess', 'appraise', 'judge', 'rate'],
        'think about': ['evaluate', 'consider carefully', 'weigh']
      },
      structure: {
        'I think it is good.': 'Having evaluated the evidence, I believe it is effective.',
        'Is it good?': 'How would you evaluate its effectiveness?'
      }
    },
    {
      question: 'Use "evaluate" for formal assessment contexts.',
      keyPoints: ['implies judgment', 'requires criteria', 'formal alternative to judge', 'used in professional contexts']
    }
  ),

  // 3. Academic Verb: Demonstrate
  createCard(
    'vocab-academic-demonstrate',
    CardType.LISTENING_KEYWORD,
    '学术动词: Demonstrate',
    '证明、展示 - 展示证据或能力',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['to show or prove something clearly', 'to display evidence or ability'],
      collocations: ['demonstrate knowledge', 'demonstrate ability', 'clearly demonstrate', 'demonstrate that'],
      examples: ['The study demonstrates a clear link between diet and health.', 'She demonstrated excellent problem-solving skills.']
    },
    {
      vocabulary: {
        'demonstrate': ['show', 'prove', 'establish', 'illustrate'],
        'show': ['demonstrate', 'exhibit', 'display']
      },
      structure: {
        'This shows that...': 'This clearly demonstrates that...',
        'I can show you.': 'Allow me to demonstrate.'
      }
    },
    {
      question: 'Use "demonstrate" to show evidence or proof.',
      keyPoints: ['stronger than show', 'implies proof', 'academic writing standard', 'formal presentations']
    }
  ),

  // 4. Academic Verb: Implement
  createCard(
    'vocab-academic-implement',
    CardType.LISTENING_KEYWORD,
    '学术动词: Implement',
    '实施、执行 - 将计划付诸行动',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['to put a plan or decision into action', 'to carry out or execute'],
      collocations: ['implement changes', 'implement a policy', 'implement strategies', 'successfully implement'],
      examples: ['The company will implement new safety procedures next month.', 'We need to implement these changes gradually.']
    },
    {
      vocabulary: {
        'implement': ['execute', 'carry out', 'put into practice', 'apply'],
        'do': ['implement', 'execute', 'carry out']
      },
      structure: {
        'We will do the plan.': 'We will implement the plan.',
        'Start the project.': 'Implement the project systematically.'
      }
    },
    {
      question: 'Use "implement" for formal action execution.',
      keyPoints: ['formal verb for action', 'implies planning', 'business/government context', 'requires clear plan']
    }
  ),

  // 5. Transition: However
  createCard(
    'vocab-transition-however',
    CardType.LISTENING_KEYWORD,
    '转折连词: However',
    '然而、但是 - 引入对比或限制',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['used to introduce a contrasting statement', 'shows contrast or exception'],
      usage_patterns: ['However, ... (sentence start)', '..., however, ... (mid-sentence)', '...; however, ...'],
      examples: ['The plan seems good. However, it may be too expensive.', 'The results, however, were unexpected.']
    },
    {
      vocabulary: {
        'however': ['nevertheless', 'nonetheless', 'yet', 'still'],
        'but': ['however', 'although', 'despite this']
      },
      structure: {
        'But it is wrong.': 'However, this is incorrect.',
        'It is good but expensive.': 'It is effective; however, it is costly.'
      }
    },
    {
      question: 'Use "however" correctly for contrast.',
      keyPoints: ['more formal than but', 'punctuation matters', 'can be mid-sentence', 'indicates contrast']
    }
  ),

  // 6. Transition: Therefore
  createCard(
    'vocab-transition-therefore',
    CardType.LISTENING_KEYWORD,
    '因果连词: Therefore',
    '因此、所以 - 表示结果或结论',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['as a result', 'for that reason', 'consequently'],
      usage_patterns: ['Therefore, ... (sentence start)', '..., therefore, ...', '...; therefore, ...'],
      examples: ['The evidence is clear. Therefore, we must act now.', 'She studied hard; therefore, she passed the exam.']
    },
    {
      vocabulary: {
        'therefore': ['consequently', 'thus', 'hence', 'as a result'],
        'so': ['therefore', 'consequently', 'thus']
      },
      structure: {
        'So we should go.': 'Therefore, we should proceed.',
        'That is why...': 'Therefore...'
      }
    },
    {
      question: 'Use "therefore" to show logical conclusion.',
      keyPoints: ['formal cause-effect', 'academic standard', 'punctuation important', 'shows reasoning']
    }
  ),

  // 7. Transition: Furthermore
  createCard(
    'vocab-transition-furthermore',
    CardType.LISTENING_KEYWORD,
    '递进连词: Furthermore',
    '此外、而且 - 添加更多信息',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['in addition', 'moreover', 'besides'],
      usage_patterns: ['Furthermore, ... (sentence start)', 'adds supporting information'],
      examples: ['The product is effective. Furthermore, it is affordable.', 'Furthermore, the research shows long-term benefits.']
    },
    {
      vocabulary: {
        'furthermore': ['moreover', 'additionally', 'in addition', 'besides'],
        'also': ['furthermore', 'moreover', 'additionally']
      },
      structure: {
        'Also, it is cheap.': 'Furthermore, it is cost-effective.',
        'And another thing...': 'Furthermore...'
      }
    },
    {
      question: 'Use "furthermore" to add supporting points.',
      keyPoints: ['adds emphasis', 'more formal than also', 'builds argument', 'academic standard']
    }
  ),

  // 8. Transition: Nevertheless
  createCard(
    'vocab-transition-nevertheless',
    CardType.LISTENING_KEYWORD,
    '让步连词: Nevertheless',
    '尽管如此、然而 - 表示让步转折',
    DifficultyLevel.CLB9,
    'formal',
    {
      definition: ['in spite of that', 'despite what has just been said'],
      usage_patterns: ['Nevertheless, ... (sentence start)', '...; nevertheless, ...'],
      examples: ['The task was difficult. Nevertheless, we completed it on time.', 'He was tired; nevertheless, he continued working.']
    },
    {
      vocabulary: {
        'nevertheless': ['nonetheless', 'even so', 'however', 'still'],
        'but still': ['nevertheless', 'nonetheless', 'even so']
      },
      structure: {
        'But we did it anyway.': 'Nevertheless, we succeeded.',
        'It was hard but we finished.': 'It was challenging; nevertheless, we completed it.'
      }
    },
    {
      question: 'Use "nevertheless" for strong contrast.',
      keyPoints: ['acknowledges difficulty', 'shows persistence', 'very formal', 'stronger than however']
    }
  ),

  // 9. Collocation: Make a decision
  createCard(
    'vocab-collocation-decision',
    CardType.LISTENING_KEYWORD,
    '搭配: Make a decision',
    '做出决定 - 正确的动词搭配',
    DifficultyLevel.CLB7,
    'neutral',
    {
      correct_forms: ['make a decision', 'reach a decision', 'come to a decision'],
      incorrect_forms: ['do a decision (X)', 'take a decision (British)', 'create a decision (X)'],
      examples: ['We need to make a decision soon.', 'After much discussion, they reached a decision.']
    },
    {
      vocabulary: {
        'make a decision': ['decide', 'determine', 'conclude', 'resolve'],
        'decide': ['make a decision', 'reach a conclusion']
      },
      structure: {
        'I decided to go.': 'I made the decision to go.',
        'We need to decide.': 'We need to make a decision.'
      }
    },
    {
      question: 'Learn correct collocations with "decision".',
      keyPoints: ['make not do', 'reach also correct', 'common error', 'essential collocation']
    }
  ),

  // 10. Collocation: Take responsibility
  createCard(
    'vocab-collocation-responsibility',
    CardType.LISTENING_KEYWORD,
    '搭配: Take responsibility',
    '承担责任 - 正确的动词搭配',
    DifficultyLevel.CLB7,
    'neutral',
    {
      correct_forms: ['take responsibility', 'accept responsibility', 'bear responsibility', 'assume responsibility'],
      incorrect_forms: ['make responsibility (X)', 'do responsibility (X)', 'have responsibility for (different meaning)'],
      examples: ['You must take responsibility for your actions.', 'The manager accepted full responsibility for the mistake.']
    },
    {
      vocabulary: {
        'take responsibility': ['be accountable', 'own up to', 'answer for'],
        'blame': ['responsibility', 'accountability', 'liability']
      },
      structure: {
        'It is my fault.': 'I take full responsibility.',
        'Who is to blame?': 'Who will take responsibility?'
      }
    },
    {
      question: 'Learn correct collocations with "responsibility".',
      keyPoints: ['take not make', 'accept also correct', 'professional context', 'accountability']
    }
  ),

  // 11. Collocation: Raise awareness
  createCard(
    'vocab-collocation-awareness',
    CardType.LISTENING_KEYWORD,
    '搭配: Raise awareness',
    '提高意识 - 社会话题常用搭配',
    DifficultyLevel.CLB8,
    'formal',
    {
      correct_forms: ['raise awareness', 'increase awareness', 'heighten awareness', 'promote awareness'],
      incorrect_forms: ['make awareness (X)', 'grow awareness (X)', 'rise awareness (X - transitive needed)'],
      examples: ['The campaign aims to raise awareness about climate change.', 'We need to raise public awareness of this issue.']
    },
    {
      vocabulary: {
        'raise awareness': ['educate the public', 'inform people', 'publicize'],
        'tell people': ['raise awareness', 'spread the message']
      },
      structure: {
        'Tell people about it.': 'Raise awareness about the issue.',
        'Make people know.': 'Increase public awareness.'
      }
    },
    {
      question: 'Use "raise awareness" for social topics.',
      keyPoints: ['raise not make', 'common in social issues', 'formal expression', 'campaign language']
    }
  ),

  // 12. Collocation: Pay attention
  createCard(
    'vocab-collocation-attention',
    CardType.LISTENING_KEYWORD,
    '搭配: Pay attention',
    '注意、关注 - 表达集中注意力',
    DifficultyLevel.CLB7,
    'neutral',
    {
      correct_forms: ['pay attention to', 'give attention to', 'draw attention to', 'attract attention'],
      incorrect_forms: ['make attention (X)', 'do attention (X)', 'put attention (X)'],
      examples: ['Please pay attention to the safety instructions.', 'The bright colors draw attention to the product.']
    },
    {
      vocabulary: {
        'pay attention': ['focus on', 'concentrate on', 'heed', 'notice'],
        'look at': ['pay attention to', 'focus on']
      },
      structure: {
        'Look at this carefully.': 'Pay close attention to this.',
        'Notice this point.': 'I would like to draw your attention to this.'
      }
    },
    {
      question: 'Learn correct collocations with "attention".',
      keyPoints: ['pay not make', 'draw attention to', 'common expression', 'focus indicator']
    }
  ),

  // 13. Formal Expression: In terms of
  createCard(
    'vocab-formal-intermsof',
    CardType.LISTENING_KEYWORD,
    '正式表达: In terms of',
    '就...而言 - 限定讨论范围',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['regarding', 'with respect to', 'as far as ... is concerned'],
      usage_patterns: ['In terms of X, ...', '... in terms of X'],
      examples: ['In terms of cost, this option is the best.', 'The project was successful in terms of meeting deadlines.']
    },
    {
      vocabulary: {
        'in terms of': ['regarding', 'concerning', 'with respect to', 'as for'],
        'about': ['in terms of', 'regarding', 'concerning']
      },
      structure: {
        'About money, it is good.': 'In terms of cost, it is favorable.',
        'For the quality...': 'In terms of quality...'
      }
    },
    {
      question: 'Use "in terms of" to specify aspects.',
      keyPoints: ['defines scope', 'academic standard', 'comparison tool', 'formal alternative']
    }
  ),

  // 14. Formal Expression: With regard to
  createCard(
    'vocab-formal-withregardto',
    CardType.LISTENING_KEYWORD,
    '正式表达: With regard to',
    '关于、就...而言 - 引入话题',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['concerning', 'about', 'in reference to'],
      usage_patterns: ['With regard to X, ...', 'Regarding X, ...'],
      examples: ['With regard to your question, I have the following response.', 'With regard to the budget, we need more funding.']
    },
    {
      vocabulary: {
        'with regard to': ['regarding', 'concerning', 'about', 'in relation to'],
        'about': ['with regard to', 'concerning', 'regarding']
      },
      structure: {
        'About your question...': 'With regard to your inquiry...',
        'For the issue of...': 'With regard to the matter of...'
      }
    },
    {
      question: 'Use "with regard to" for formal topic introduction.',
      keyPoints: ['formal opener', 'business standard', 'letter writing', 'professional tone']
    }
  ),

  // 15. Formal Expression: In light of
  createCard(
    'vocab-formal-inlightof',
    CardType.LISTENING_KEYWORD,
    '正式表达: In light of',
    '鉴于、考虑到 - 引入原因或背景',
    DifficultyLevel.CLB9,
    'formal',
    {
      definition: ['considering', 'because of', 'given'],
      usage_patterns: ['In light of X, ... (sentence start)', '... in light of X'],
      examples: ['In light of recent events, we must reconsider our approach.', 'The decision was made in light of new evidence.']
    },
    {
      vocabulary: {
        'in light of': ['considering', 'given', 'in view of', 'because of'],
        'because': ['in light of', 'due to', 'owing to']
      },
      structure: {
        'Because of the news...': 'In light of recent developments...',
        'Since this happened...': 'In light of these circumstances...'
      }
    },
    {
      question: 'Use "in light of" for formal reasoning.',
      keyPoints: ['formal cause', 'professional standard', 'acknowledges context', 'decision-making']
    }
  ),

  // 16. Formal Expression: On the other hand
  createCard(
    'vocab-formal-otherhand',
    CardType.LISTENING_KEYWORD,
    '正式表达: On the other hand',
    '另一方面 - 引入对比观点',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['from another perspective', 'alternatively', 'conversely'],
      usage_patterns: ['On the one hand... On the other hand...', 'On the other hand, ...'],
      examples: ['Working from home saves time. On the other hand, it can be isolating.', 'On the other hand, some argue that this approach has merit.']
    },
    {
      vocabulary: {
        'on the other hand': ['conversely', 'alternatively', 'in contrast', 'however'],
        'but': ['on the other hand', 'conversely']
      },
      structure: {
        'But some people think...': 'On the other hand, some argue...',
        'The opposite is...': 'On the other hand...'
      }
    },
    {
      question: 'Use "on the other hand" for balanced arguments.',
      keyPoints: ['shows balance', 'pairs with on one hand', 'essay standard', 'presents alternatives']
    }
  ),

  // 17. Formal Expression: To a certain extent
  createCard(
    'vocab-formal-certainextent',
    CardType.LISTENING_KEYWORD,
    '正式表达: To a certain extent',
    '在某种程度上 - 表达部分同意',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['partially', 'somewhat', 'to some degree'],
      usage_patterns: ['To a certain extent, ... (agreement with limitation)', '... to a certain extent'],
      examples: ['To a certain extent, I agree with this view.', 'The plan succeeded, to a certain extent.']
    },
    {
      vocabulary: {
        'to a certain extent': ['to some degree', 'partially', 'somewhat', 'in part'],
        'a little': ['to a certain extent', 'somewhat', 'partly']
      },
      structure: {
        'I partly agree.': 'To a certain extent, I concur.',
        'It is somewhat true.': 'This is true to a certain extent.'
      }
    },
    {
      question: 'Use "to a certain extent" for nuanced agreement.',
      keyPoints: ['shows nuance', 'academic hedging', 'partial agreement', 'balanced view']
    }
  ),

  // 18. Hedging Language: It seems that
  createCard(
    'vocab-hedging-seems',
    CardType.LISTENING_KEYWORD,
    '委婉表达: It seems that',
    '似乎、看起来 - 表达推测',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['appears to be', 'gives the impression that', 'looks like'],
      usage_patterns: ['It seems that...', 'It would seem that... (more tentative)'],
      examples: ['It seems that the economy is improving.', 'It would seem that more research is needed.']
    },
    {
      vocabulary: {
        'it seems that': ['it appears that', 'apparently', 'evidently'],
        'I think': ['it seems that', 'it appears that']
      },
      structure: {
        'I think it is true.': 'It seems that this is the case.',
        'Maybe it is...': 'It would seem that...'
      }
    },
    {
      question: 'Use "it seems that" for tentative statements.',
      keyPoints: ['hedging device', 'academic caution', 'softer claims', 'uncertainty marker']
    }
  ),

  // 19. Hedging Language: Tend to
  createCard(
    'vocab-hedging-tendto',
    CardType.LISTENING_KEYWORD,
    '委婉表达: Tend to',
    '倾向于、往往 - 表达一般趋势',
    DifficultyLevel.CLB7,
    'neutral',
    {
      definition: ['usually', 'generally', 'have a tendency to'],
      usage_patterns: ['X tends to Y', 'People tend to...', 'This tends to result in...'],
      examples: ['Students tend to procrastinate before exams.', 'Higher prices tend to reduce demand.']
    },
    {
      vocabulary: {
        'tend to': ['usually', 'generally', 'often', 'are inclined to'],
        'always': ['tend to', 'generally', 'usually']
      },
      structure: {
        'People always do this.': 'People tend to do this.',
        'It usually happens.': 'This tends to occur.'
      }
    },
    {
      question: 'Use "tend to" for general patterns.',
      keyPoints: ['avoids absolutes', 'shows patterns', 'academic caution', 'generalizations']
    }
  ),

  // 20. Hedging Language: It is likely that
  createCard(
    'vocab-hedging-likely',
    CardType.LISTENING_KEYWORD,
    '委婉表达: It is likely that',
    '很可能 - 表达可能性',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['probably', 'there is a good chance that'],
      usage_patterns: ['It is likely that...', 'X is likely to Y', '... is likely to happen'],
      examples: ['It is likely that temperatures will rise.', 'The project is likely to succeed.']
    },
    {
      vocabulary: {
        'it is likely that': ['probably', 'in all likelihood', 'there is a good chance'],
        'will definitely': ['is likely to', 'will probably']
      },
      structure: {
        'It will happen.': 'It is likely to happen.',
        'Probably this is true.': 'It is likely that this is the case.'
      }
    },
    {
      question: 'Use "it is likely that" for probability.',
      keyPoints: ['probability marker', 'academic standard', 'softer than will', 'prediction language']
    }
  ),

  // ========================================
  // === VOCABULARY: 词汇扩展 Batch 2 (20张) ===
  // ========================================

  // 21. Collocation: Have an impact
  createCard(
    'vocab-collocation-impact',
    CardType.LISTENING_KEYWORD,
    '搭配: Have an impact',
    '产生影响 - 描述影响力',
    DifficultyLevel.CLB8,
    'formal',
    {
      correct_forms: ['have an impact on', 'make an impact on', 'create an impact'],
      related_phrases: ['significant impact', 'positive/negative impact', 'lasting impact', 'profound impact'],
      examples: ['Technology has had a significant impact on education.', 'The new policy will make a positive impact on the environment.']
    },
    {
      vocabulary: {
        'have an impact': ['influence', 'affect', 'make a difference'],
        'change': ['impact', 'influence', 'transform']
      },
      structure: {
        'It changed things.': 'It had a significant impact.',
        'It affects people.': 'It has a profound impact on people.'
      }
    },
    {
      question: 'Use "have an impact" for describing influence.',
      keyPoints: ['have not do', 'often with adjectives', 'formal expression', 'cause-effect']
    }
  ),

  // 22. Collocation: Come to a conclusion
  createCard(
    'vocab-collocation-conclusion',
    CardType.LISTENING_KEYWORD,
    '搭配: Come to/Reach a conclusion',
    '得出结论 - 表达决定或判断',
    DifficultyLevel.CLB7,
    'formal',
    {
      correct_forms: ['come to a conclusion', 'reach a conclusion', 'draw a conclusion', 'arrive at a conclusion'],
      incorrect_forms: ['make a conclusion (X)', 'do a conclusion (X)'],
      examples: ['After analyzing the data, we came to the conclusion that...', 'The researchers drew important conclusions from the study.']
    },
    {
      vocabulary: {
        'come to a conclusion': ['conclude', 'determine', 'decide'],
        'finish thinking': ['reach a conclusion', 'come to a decision']
      },
      structure: {
        'I think finally that...': 'I have come to the conclusion that...',
        'We decided that...': 'We reached the conclusion that...'
      }
    },
    {
      question: 'Use correct verbs with "conclusion".',
      keyPoints: ['draw/reach/come to', 'not make', 'academic standard', 'formal writing']
    }
  ),

  // 23. Collocation: Meet requirements
  createCard(
    'vocab-collocation-requirements',
    CardType.LISTENING_KEYWORD,
    '搭配: Meet requirements',
    '满足要求 - 工作和学术常用',
    DifficultyLevel.CLB7,
    'formal',
    {
      correct_forms: ['meet requirements', 'fulfill requirements', 'satisfy requirements'],
      incorrect_forms: ['do requirements (X)', 'make requirements (X)', 'reach requirements (X)'],
      examples: ['All applicants must meet the minimum requirements.', 'The project fulfilled all the client requirements.']
    },
    {
      vocabulary: {
        'meet requirements': ['qualify', 'be eligible', 'satisfy criteria'],
        'be good enough': ['meet the requirements', 'satisfy the criteria']
      },
      structure: {
        'I am good enough.': 'I meet all the requirements.',
        'It is enough.': 'It satisfies the requirements.'
      }
    },
    {
      question: 'Use "meet" with requirements and criteria.',
      keyPoints: ['meet not make', 'fulfill also correct', 'job applications', 'academic contexts']
    }
  ),

  // 24. Collocation: Gain experience
  createCard(
    'vocab-collocation-experience',
    CardType.LISTENING_KEYWORD,
    '搭配: Gain experience',
    '获得经验 - 职业发展常用',
    DifficultyLevel.CLB7,
    'neutral',
    {
      correct_forms: ['gain experience', 'acquire experience', 'get experience', 'build experience'],
      incorrect_forms: ['make experience (X)', 'earn experience (X - different meaning)'],
      examples: ['I gained valuable experience working in customer service.', 'Internships help students gain practical experience.']
    },
    {
      vocabulary: {
        'gain experience': ['learn', 'develop skills', 'build expertise'],
        'learn by doing': ['gain experience', 'acquire hands-on experience']
      },
      structure: {
        'I learned a lot there.': 'I gained valuable experience.',
        'It taught me skills.': 'It helped me gain practical experience.'
      }
    },
    {
      question: 'Use "gain" with experience.',
      keyPoints: ['gain not make', 'resume standard', 'professional growth', 'career development']
    }
  ),

  // 25. Collocation: Face challenges
  createCard(
    'vocab-collocation-challenges',
    CardType.LISTENING_KEYWORD,
    '搭配: Face challenges',
    '面对挑战 - 描述困难',
    DifficultyLevel.CLB7,
    'neutral',
    {
      correct_forms: ['face challenges', 'overcome challenges', 'meet challenges', 'tackle challenges'],
      related_phrases: ['significant challenges', 'face obstacles', 'confront difficulties'],
      examples: ['We faced many challenges during the project.', 'The company must tackle these challenges head-on.']
    },
    {
      vocabulary: {
        'face challenges': ['deal with problems', 'confront obstacles', 'address difficulties'],
        'have problems': ['face challenges', 'encounter obstacles']
      },
      structure: {
        'We had many problems.': 'We faced significant challenges.',
        'It was difficult.': 'We encountered considerable challenges.'
      }
    },
    {
      question: 'Use appropriate verbs with "challenges".',
      keyPoints: ['face/overcome/tackle', 'professional language', 'problem-solving', 'interview standard']
    }
  ),

  // 26. Opinion Expression: In my opinion
  createCard(
    'vocab-opinion-inmyopinion',
    CardType.LISTENING_KEYWORD,
    '观点表达: In my opinion',
    '在我看来 - 引入个人观点',
    DifficultyLevel.CLB7,
    'neutral',
    {
      definition: ['I believe', 'I think', 'from my perspective'],
      alternatives: ['In my view', 'From my perspective', 'As I see it', 'To my mind'],
      examples: ['In my opinion, this approach is more effective.', 'In my view, we should consider alternative solutions.']
    },
    {
      vocabulary: {
        'in my opinion': ['I believe', 'I think', 'from my standpoint'],
        'I think': ['in my opinion', 'in my view', 'as I see it']
      },
      structure: {
        'I think it is good.': 'In my opinion, it is beneficial.',
        'I believe that...': 'In my view...'
      }
    },
    {
      question: 'Use opinion markers appropriately.',
      keyPoints: ['signals personal view', 'speaking/writing standard', 'not too frequent', 'vary expressions']
    }
  ),

  // 27. Opinion Expression: I strongly believe
  createCard(
    'vocab-opinion-stronglybelieve',
    CardType.LISTENING_KEYWORD,
    '观点表达: I strongly believe',
    '我坚信 - 表达强烈观点',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['I am convinced', 'I firmly believe', 'I hold the view'],
      usage_context: ['essay arguments', 'persuasive speaking', 'formal debates'],
      examples: ['I strongly believe that education is the key to success.', 'I firmly believe this approach will yield better results.']
    },
    {
      vocabulary: {
        'I strongly believe': ['I am convinced', 'I firmly hold', 'I am certain'],
        'I think': ['I strongly believe', 'I am of the opinion']
      },
      structure: {
        'I really think...': 'I strongly believe that...',
        'I am sure that...': 'I am firmly convinced that...'
      }
    },
    {
      question: 'Express strong opinions formally.',
      keyPoints: ['shows conviction', 'essay standard', 'persuasive writing', 'debate language']
    }
  ),

  // 28. Opinion Expression: It could be argued
  createCard(
    'vocab-opinion-argued',
    CardType.LISTENING_KEYWORD,
    '观点表达: It could be argued',
    '可以说、有人认为 - 引入他人观点',
    DifficultyLevel.CLB9,
    'formal',
    {
      definition: ['some people believe', 'one could say', 'there is an argument that'],
      usage_context: ['academic essays', 'balanced arguments', 'presenting counterpoints'],
      examples: ['It could be argued that technology has more benefits than drawbacks.', 'It might be argued that this policy needs revision.']
    },
    {
      vocabulary: {
        'it could be argued': ['some contend', 'one might claim', 'there is a case for'],
        'some people say': ['it could be argued', 'some maintain', 'proponents argue']
      },
      structure: {
        'Some people say...': 'It could be argued that...',
        'Maybe it is true that...': 'It might be argued that...'
      }
    },
    {
      question: 'Use "it could be argued" for presenting views.',
      keyPoints: ['introduces counterarguments', 'academic standard', 'shows balance', 'impersonal structure']
    }
  ),

  // 29. Opinion Expression: There is no doubt
  createCard(
    'vocab-opinion-nodoubt',
    CardType.LISTENING_KEYWORD,
    '观点表达: There is no doubt',
    '毫无疑问 - 表达确定性',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['certainly', 'undoubtedly', 'without question'],
      variations: ['There is no doubt that...', 'Without a doubt...', 'Undoubtedly...'],
      examples: ['There is no doubt that climate change is a serious issue.', 'Without a doubt, this is the best solution available.']
    },
    {
      vocabulary: {
        'there is no doubt': ['undoubtedly', 'certainly', 'unquestionably'],
        'I am sure': ['there is no doubt', 'it is certain that']
      },
      structure: {
        'It is definitely true.': 'There is no doubt that this is true.',
        'Everyone knows...': 'There is no doubt that...'
      }
    },
    {
      question: 'Use certainty expressions appropriately.',
      keyPoints: ['strong certainty', 'use sparingly', 'essay emphasis', 'evidence-based claims']
    }
  ),

  // 30. Opinion Expression: From my point of view
  createCard(
    'vocab-opinion-pointofview',
    CardType.LISTENING_KEYWORD,
    '观点表达: From my point of view',
    '从我的角度来看 - 个人视角',
    DifficultyLevel.CLB7,
    'neutral',
    {
      definition: ['in my opinion', 'as I see it', 'from where I stand'],
      variations: ['From my perspective', 'From my standpoint', 'In my eyes'],
      examples: ['From my point of view, the benefits outweigh the costs.', 'From my perspective, this issue requires immediate attention.']
    },
    {
      vocabulary: {
        'from my point of view': ['in my opinion', 'as I see it', 'personally'],
        'I think': ['from my point of view', 'from my perspective']
      },
      structure: {
        'I think personally...': 'From my point of view...',
        'How I see it is...': 'From my perspective...'
      }
    },
    {
      question: 'Vary opinion expressions in speaking/writing.',
      keyPoints: ['alternative to in my opinion', 'speaking standard', 'adds variety', 'personal perspective']
    }
  ),

  // 31. Idiom: At the end of the day
  createCard(
    'vocab-idiom-endofday',
    CardType.LISTENING_KEYWORD,
    '习语: At the end of the day',
    '最终、归根结底 - 总结要点',
    DifficultyLevel.CLB7,
    'informal',
    {
      definition: ['ultimately', 'when all is considered', 'in the final analysis'],
      usage_note: ['semi-formal to informal', 'common in spoken English', 'summarizing arguments'],
      examples: ['At the end of the day, what matters most is your health.', 'At the end of the day, the decision is yours to make.']
    },
    {
      vocabulary: {
        'at the end of the day': ['ultimately', 'in the end', 'when all is said and done'],
        'finally': ['at the end of the day', 'in conclusion']
      },
      structure: {
        'Finally, the most important thing is...': 'At the end of the day, what matters most is...',
        'The main point is...': 'At the end of the day...'
      }
    },
    {
      question: 'Use "at the end of the day" for summarizing.',
      keyPoints: ['common idiom', 'summarizing tool', 'semi-formal', 'concluding statements']
    }
  ),

  // 32. Idiom: On the same page
  createCard(
    'vocab-idiom-samepage',
    CardType.LISTENING_KEYWORD,
    '习语: On the same page',
    '意见一致 - 表达共识',
    DifficultyLevel.CLB8,
    'informal',
    {
      definition: ['in agreement', 'having the same understanding', 'thinking alike'],
      usage_context: ['workplace discussions', 'team meetings', 'confirming understanding'],
      examples: ['Let us make sure we are on the same page before proceeding.', 'After the meeting, we were all on the same page about the project goals.']
    },
    {
      vocabulary: {
        'on the same page': ['in agreement', 'on the same wavelength', 'see eye to eye'],
        'agree': ['be on the same page', 'share the same view']
      },
      structure: {
        'Do we all agree?': 'Are we all on the same page?',
        'We understand each other.': 'We are on the same page.'
      }
    },
    {
      question: 'Use "on the same page" for agreement.',
      keyPoints: ['business common', 'team communication', 'checking alignment', 'workplace idiom']
    }
  ),

  // 33. Idiom: Take something into account
  createCard(
    'vocab-idiom-intoaccount',
    CardType.LISTENING_KEYWORD,
    '习语: Take into account',
    '考虑到 - 表示考量因素',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['consider', 'factor in', 'bear in mind'],
      variations: ['take into consideration', 'take into account', 'factor in'],
      examples: ['We must take the budget into account when planning.', 'Taking all factors into account, this is the best option.']
    },
    {
      vocabulary: {
        'take into account': ['consider', 'factor in', 'allow for'],
        'think about': ['take into account', 'take into consideration']
      },
      structure: {
        'Think about the cost.': 'Take the cost into account.',
        'Consider all factors.': 'Take all factors into consideration.'
      }
    },
    {
      question: 'Use "take into account" for consideration.',
      keyPoints: ['formal consideration', 'decision-making', 'academic writing', 'business standard']
    }
  ),

  // 34. Idiom: Keep in mind
  createCard(
    'vocab-idiom-keepinmind',
    CardType.LISTENING_KEYWORD,
    '习语: Keep in mind',
    '记住、牢记 - 提醒注意',
    DifficultyLevel.CLB7,
    'neutral',
    {
      definition: ['remember', 'bear in mind', 'do not forget'],
      variations: ['bear in mind', 'keep in mind that', 'it should be kept in mind'],
      examples: ['Keep in mind that the deadline is next Friday.', 'Bear in mind that not everyone has the same experience.']
    },
    {
      vocabulary: {
        'keep in mind': ['remember', 'bear in mind', 'be aware of'],
        'remember': ['keep in mind', 'bear in mind']
      },
      structure: {
        'Remember that...': 'Keep in mind that...',
        'Do not forget...': 'Bear in mind...'
      }
    },
    {
      question: 'Use "keep in mind" for reminders.',
      keyPoints: ['polite reminder', 'common expression', 'instructions', 'presentations']
    }
  ),

  // 35. Idiom: The bottom line
  createCard(
    'vocab-idiom-bottomline',
    CardType.LISTENING_KEYWORD,
    '习语: The bottom line',
    '最重要的是 - 核心要点',
    DifficultyLevel.CLB8,
    'informal',
    {
      definition: ['the most important point', 'the essential fact', 'the final result'],
      origin: ['from accounting - final figure on financial statement'],
      examples: ['The bottom line is that we need to increase sales.', 'The bottom line is we cannot afford to wait any longer.']
    },
    {
      vocabulary: {
        'the bottom line': ['the main point', 'the crux', 'the essential fact'],
        'most importantly': ['the bottom line is', 'fundamentally']
      },
      structure: {
        'The most important thing is...': 'The bottom line is...',
        'What really matters is...': 'The bottom line is...'
      }
    },
    {
      question: 'Use "the bottom line" for key points.',
      keyPoints: ['business common', 'summarizing', 'emphasizing importance', 'direct communication']
    }
  ),

  // 36. Academic Verb: Contribute
  createCard(
    'vocab-academic-contribute',
    CardType.LISTENING_KEYWORD,
    '学术动词: Contribute',
    '贡献、促成 - 表示因果或参与',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['to give or add to', 'to be a factor in', 'to help bring about'],
      collocations: ['contribute to success', 'contribute significantly', 'contribute factors', 'contribute to society'],
      examples: ['Several factors contributed to the project failure.', 'Education contributes significantly to economic development.']
    },
    {
      vocabulary: {
        'contribute': ['add to', 'lead to', 'be a factor in'],
        'help': ['contribute to', 'play a role in', 'be part of']
      },
      structure: {
        'It helped cause the problem.': 'It contributed to the problem.',
        'Many things led to success.': 'Several factors contributed to the success.'
      }
    },
    {
      question: 'Use "contribute" for cause-effect relationships.',
      keyPoints: ['contribute to (not for)', 'academic standard', 'cause-effect', 'formal analysis']
    }
  ),

  // 37. Academic Verb: Indicate
  createCard(
    'vocab-academic-indicate',
    CardType.LISTENING_KEYWORD,
    '学术动词: Indicate',
    '表明、显示 - 引用证据',
    DifficultyLevel.CLB8,
    'formal',
    {
      definition: ['to show', 'to suggest', 'to point to'],
      collocations: ['research indicates', 'evidence indicates', 'findings indicate', 'clearly indicate'],
      examples: ['Recent studies indicate a strong correlation between exercise and mental health.', 'The data indicates that the trend is continuing.']
    },
    {
      vocabulary: {
        'indicate': ['show', 'suggest', 'point to', 'reveal'],
        'show': ['indicate', 'demonstrate', 'reveal']
      },
      structure: {
        'The study shows...': 'Research indicates that...',
        'This means...': 'This indicates that...'
      }
    },
    {
      question: 'Use "indicate" for citing evidence.',
      keyPoints: ['academic reporting', 'research writing', 'formal evidence', 'softer than prove']
    }
  ),

  // 38. Academic Verb: Require
  createCard(
    'vocab-academic-require',
    CardType.LISTENING_KEYWORD,
    '学术动词: Require',
    '需要、要求 - 表示必要性',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['to need', 'to demand', 'to make necessary'],
      collocations: ['require attention', 'require action', 'require approval', 'urgently require'],
      examples: ['This situation requires immediate attention.', 'All applications require supporting documents.']
    },
    {
      vocabulary: {
        'require': ['need', 'demand', 'necessitate', 'call for'],
        'need': ['require', 'necessitate', 'call for']
      },
      structure: {
        'We need to act now.': 'This requires immediate action.',
        'You must provide documents.': 'Documentation is required.'
      }
    },
    {
      question: 'Use "require" for formal necessity.',
      keyPoints: ['formal than need', 'obligation', 'official language', 'requirements']
    }
  ),

  // 39. Academic Verb: Suggest
  createCard(
    'vocab-academic-suggest',
    CardType.LISTENING_KEYWORD,
    '学术动词: Suggest',
    '建议、表明 - 谨慎表达',
    DifficultyLevel.CLB7,
    'formal',
    {
      definition: ['to propose', 'to indicate indirectly', 'to recommend'],
      collocations: ['suggest that', 'research suggests', 'strongly suggest', 'suggest alternatives'],
      examples: ['I suggest we postpone the meeting.', 'The evidence suggests a need for further investigation.']
    },
    {
      vocabulary: {
        'suggest': ['propose', 'recommend', 'indicate', 'imply'],
        'say maybe': ['suggest', 'propose', 'recommend']
      },
      structure: {
        'Maybe we should...': 'I suggest that we...',
        'The data shows maybe...': 'The findings suggest that...'
      }
    },
    {
      question: 'Use "suggest" for proposals and implications.',
      keyPoints: ['softer than state', 'academic hedging', 'proposals', 'evidence reporting']
    }
  ),

  // 40. Academic Verb: Establish
  createCard(
    'vocab-academic-establish',
    CardType.LISTENING_KEYWORD,
    '学术动词: Establish',
    '建立、确定 - 证实或创建',
    DifficultyLevel.CLB9,
    'formal',
    {
      definition: ['to prove definitively', 'to set up', 'to create firmly'],
      collocations: ['establish a connection', 'establish credibility', 'firmly establish', 'establish guidelines'],
      examples: ['The study establishes a clear link between the two variables.', 'We need to establish clear guidelines for the project.']
    },
    {
      vocabulary: {
        'establish': ['prove', 'confirm', 'set up', 'create'],
        'make': ['establish', 'create', 'found', 'institute']
      },
      structure: {
        'This proves that...': 'This establishes that...',
        'We will make rules.': 'We will establish guidelines.'
      }
    },
    {
      question: 'Use "establish" for proving or creating formally.',
      keyPoints: ['stronger than show', 'definitive proof', 'formal creation', 'academic standard']
    }
  )
];

// ==========================================
// === AI PROMPT 工具箱数据 ===
// ==========================================

export const aiPrompts = [
  {
    category: '写作助手',
    prompts: [
      {
        id: 'writing-task1-template',
        title: '邮件写作模板',
        prompt: `请帮我写一封CELPIP写作Task 1的邮件。要求：
1. 语气: [formal/semi-formal/informal]
2. 目的: [明确说明邮件目的]
3. 包含以下要点: [要点1, 要点2, 要点3]
4. 长度: 150-200词
5. 格式: 开头段落 + 主体段落 + 结尾段落

请提供完整的邮件内容，适合CELPIP考试要求。`,
        tags: ['写作Task 1', '邮件', '模板']
      },
      {
        id: 'writing-task2-outline',
        title: '观点论证提纲',
        prompt: `请帮我为CELPIP写作Task 2创建一个完整的议论文提纲。主题是"[主题]"。
要求：
1. 引言段：背景介绍 + 观点陈述 + 论点预告
2. 主体段3个：每个段落包含主题句 + 解释 + 例子 + 结论句
3. 结论段：重申观点 + 总结要点 + 建议或展望

请用英文提纲格式呈现。`,
        tags: ['写作Task 2', '议论文', '提纲']
      },
      {
        id: 'writing-vocabulary-upgrade',
        title: '词汇升级助手',
        prompt: `请帮我升级以下CELPIP写作中的基础词汇：

原文：[粘贴你的句子或段落]

要求：
1. 识别可以升级的基础词汇
2. 提供3-4个学术或高级替换词
3. 给出使用这些词汇的例句
4. 注意保持句子原意和语法正确

请保持正式的学术写作风格。`,
        tags: ['词汇', '升级', '写作提分']
      }
    ]
  },
  {
    category: '口语练习',
    prompts: [
      {
        id: 'speaking-practice',
        title: '口语练习伙伴',
        prompt: `请作为我的CELPIP口语练习伙伴。我会提供口语任务的类型和题目，请你：

1. 给出高质量的回答范例 (1-2分钟)
2. 分析回答的优点和改进建议
3. 提供相关词汇和表达
4. 给出类似题目供我练习

当前任务类型: [Speaking Task 1-8]
题目: [具体题目]`,
        tags: ['口语', '练习', '反馈']
      },
      {
        id: 'speaking-task-specific',
        title: '特定任务练习',
        prompt: `请帮我练习CELPIP口语 [Task X: 任务名称]。

任务要求：[描述任务要求]
准备时间：[X秒]
回答时间：[X秒]

请提供：
1. 答题结构模板
2. 适合此任务的过渡词和短语
3. 一个完整的示范回答
4. 常见错误和避免方法

针对CLB [7/8/9] 水平。`,
        tags: ['口语', '任务练习', '模板']
      },
      {
        id: 'pronunciation-feedback',
        title: '发音纠正',
        prompt: `请帮我纠正以下句子的发音和语调：

"[需要纠正的句子]"

请提供：
1. 正确的音标标注
2. 重音和语调指导
3. 常见错误提醒
4. 类似句子的练习建议

用中文解释，但用英文标注音标。`,
        tags: ['发音', '纠正', '语调']
      }
    ]
  },
  {
    category: '听力训练',
    prompts: [
      {
        id: 'listening-comprehension',
        title: '听力理解练习',
        prompt: `请给我设计一个CELPIP听力理解练习：

1. 选择一个听力场景：[日常对话/学术讲座/商务会谈/新闻广播]
2. 提供音频文本（200-300词）
3. 设计5个相关问题：[细节理解/推理判断/主旨大意/词汇含义/态度观点]
4. 提供答案和解析

难度等级：[CLB 7/8/9]`,
        tags: ['听力', '理解', '练习']
      },
      {
        id: 'listening-keywords',
        title: '关键词识别训练',
        prompt: `请帮我训练CELPIP听力中的关键词识别能力：

场景类型：[选择场景]

请提供：
1. 该场景常见的关键词列表（20-30个）
2. 信号词和转折词
3. 数字和时间表达
4. 态度和情感词汇
5. 模拟对话片段供练习

重点关注听力理解中容易遗漏的信息类型。`,
        tags: ['听力', '关键词', '信号词']
      },
      {
        id: 'note-taking-tips',
        title: '笔记技巧指导',
        prompt: `请给我提供CELPIP听力的有效笔记技巧：

1. 符号系统和缩写方法
2. 关键信息识别策略
3. 时间管理技巧
4. 实例练习

针对听力部分的不同题型给出具体建议。`,
        tags: ['笔记', '技巧', '策略']
      }
    ]
  },
  {
    category: '词汇扩展',
    prompts: [
      {
        id: 'vocabulary-builder',
        title: '主题词汇扩展',
        prompt: `请帮我扩展CELPIP相关主题词汇：

主题: [主题如：环境保护/科技发展/教育/健康]
要求：
1. 核心词汇 (20个)
2. 同义词和近义词 (每个3-5个)
3. 常用搭配和短语
4. 例句展示
5. 反义词

按词性和使用频率分类。`,
        tags: ['词汇', '扩展', '主题']
      },
      {
        id: 'collocations-practice',
        title: '搭配练习',
        prompt: `请帮我学习CELPIP常用的词汇搭配：

词汇类别：[动词搭配/名词搭配/形容词搭配/副词搭配]
水平：[CLB 7/8/9]

请提供：
1. 15-20个常用搭配
2. 每个搭配的例句
3. 错误搭配示例和纠正
4. 记忆技巧建议

重点关注自然、地道的表达方式。`,
        tags: ['搭配', '词汇', '地道表达']
      },
      {
        id: 'idiom-expressions',
        title: '习语和表达',
        prompt: `请提供与以下CELPIP常用主题相关的习语和表达：

主题: [如：工作/学习/日常生活/社会问题]

要求：
1. 习语解释和含义
2. 使用例句
3. 使用场合提醒
4. 类似表达

确保适合CELPIP考试使用。`,
        tags: ['习语', '表达', '固定搭配']
      }
    ]
  },
  {
    category: '模拟测试',
    prompts: [
      {
        id: 'mock-writing-task1',
        title: '写作Task 1模拟',
        prompt: `请给我一个CELPIP写作Task 1的模拟题目：

要求：
1. 提供真实考试格式的题目
2. 说明邮件类型和语气要求
3. 列出必须包含的要点
4. 提供评分标准参考
5. 在我完成后提供详细反馈

难度：[CLB 7/8/9]
题目类型：[投诉/请求/建议/道歉/感谢/邀请]`,
        tags: ['模拟', '写作', 'Task 1']
      },
      {
        id: 'mock-writing-task2',
        title: '写作Task 2模拟',
        prompt: `请给我一个CELPIP写作Task 2的模拟题目：

要求：
1. 提供调查问卷格式的题目
2. 给出两个选项供选择
3. 说明字数和时间要求
4. 提供高分范文参考
5. 在我完成后提供详细反馈和改进建议

难度：[CLB 7/8/9]
话题领域：[社会/科技/教育/环境/工作]`,
        tags: ['模拟', '写作', 'Task 2']
      },
      {
        id: 'mock-speaking',
        title: '口语全套模拟',
        prompt: `请给我一套完整的CELPIP口语模拟题目（Task 1-8）：

要求：
1. 每个任务提供真实考试格式的题目
2. 说明准备时间和回答时间
3. 提供示范答案
4. 给出每个任务的评分要点
5. 在我完成每个任务后提供反馈

目标分数：[CLB 7/8/9]`,
        tags: ['模拟', '口语', '全套']
      }
    ]
  }
];

// Export card count for statistics
export const cardStats = {
  total: sampleFlashcards.length,
  byType: {
    [CardType.WRITING_TASK1]: sampleFlashcards.filter(c => c.type === CardType.WRITING_TASK1).length,
    [CardType.WRITING_TASK2]: sampleFlashcards.filter(c => c.type === CardType.WRITING_TASK2).length,
    [CardType.SPEAKING_TASK]: sampleFlashcards.filter(c => c.type === CardType.SPEAKING_TASK).length,
    [CardType.LISTENING_KEYWORD]: sampleFlashcards.filter(c => c.type === CardType.LISTENING_KEYWORD).length,
  },
  byDifficulty: {
    [DifficultyLevel.CLB7]: sampleFlashcards.filter(c => c.difficulty === DifficultyLevel.CLB7).length,
    [DifficultyLevel.CLB8]: sampleFlashcards.filter(c => c.difficulty === DifficultyLevel.CLB8).length,
    [DifficultyLevel.CLB9]: sampleFlashcards.filter(c => c.difficulty === DifficultyLevel.CLB9).length,
  }
};
