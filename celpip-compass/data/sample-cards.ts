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
  // === WRITING TASK 1: 邮件写作 (9张) ===
  // ========================================

  // 1. 投诉类模板（合并所有投诉卡）
  createCard(
    'writing-task1-complaint',
    CardType.WRITING_TASK1,
    '投诉邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：产品/服务/噪音/宠物/网购投诉',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to express my dissatisfaction with...',
        'I am contacting you regarding a concerning issue with...',
        'I would like to bring to your attention a problem regarding...'
      ],
      details: [
        'The issue is that [specific problem] which has been occurring since [timeframe].',
        'This situation has caused [specific impact] and requires immediate attention.',
        'I have attempted [previous actions] without satisfactory resolution.'
      ],
      closing: [
        'I would appreciate a prompt resolution to this matter.',
        'Please contact me at your earliest convenience to discuss next steps.',
        'I look forward to your response and a satisfactory resolution.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封投诉邮件？如何平衡礼貌语气与明确表达不满？',
      keyPoints: ['首段直接说明投诉对象', '中段提供具体证据和影响', '末段明确要求解决方案', '全程保持正式礼貌语气']
    }
  ),

  // 2. 请求类模板
  createCard(
    'writing-task1-request',
    CardType.WRITING_TASK1,
    '请求邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：维修/休假/信息/延期/灵活工作安排',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to formally request...',
        'I would like to request your approval for...',
        'I am reaching out regarding a request for...'
      ],
      details: [
        'The reason for this request is [specific reason with dates/details].',
        'I have made arrangements to ensure [coverage/alternative plan].',
        'I will remain [available/accessible] for any urgent matters.'
      ],
      closing: [
        'I would be grateful if you could approve this request.',
        'Please let me know if you require any additional information.',
        'Thank you for considering my request.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封请求邮件？如何清晰说明理由和后续安排？',
      keyPoints: ['首段明确请求类型和日期', '中段解释理由和保障措施', '末段表达感谢和期待回复']
    }
  ),

  // 3. 建议类模板
  createCard(
    'writing-task1-suggestion',
    CardType.WRITING_TASK1,
    '建议邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：流程改进/环境改善/效率提升',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to share a suggestion that could benefit our team.',
        'I would like to propose an idea for improving our current workflow.',
        'I hope you will consider this suggestion for enhancing our operations.'
      ],
      details: [
        'Currently, [describe the problem or inefficiency with specific data].',
        'I propose implementing [specific solution] which would [expected benefit].',
        'Based on my research, [supporting evidence or comparison].'
      ],
      closing: [
        'I would welcome the opportunity to discuss this proposal in more detail.',
        'Please let me know if you would like me to prepare a formal presentation.',
        'Thank you for considering my suggestion.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封建议邮件？如何用数据支撑建议？',
      keyPoints: ['首段委婉提出建议意图', '中段用数据说明问题和方案', '末段表达进一步讨论的意愿']
    }
  ),

  // 4. 道歉类模板
  createCard(
    'writing-task1-apology',
    CardType.WRITING_TASK1,
    '道歉邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：错过会议/缺席活动/工作失误',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to sincerely apologize for...',
        'Please accept my deepest apologies for...',
        'I deeply regret that I was unable to...'
      ],
      details: [
        'Due to [brief reason without excessive detail], I was unable to [what was missed].',
        'I have already [steps taken to mitigate the impact].',
        'I am committed to ensuring this will not happen again by [prevention measure].'
      ],
      closing: [
        'I hope we can [reschedule/make up] at your convenience.',
        'Thank you for your understanding and patience.',
        'I assure you this will not occur again.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封道歉邮件？如何平衡解释与承担责任？',
      keyPoints: ['首段直接真诚道歉', '中段简要解释+补救措施', '末段承诺不再犯并感谢理解']
    }
  ),

  // 5. 感谢类模板
  createCard(
    'writing-task1-thanks',
    CardType.WRITING_TASK1,
    '感谢邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：感谢推荐/感谢帮助/感谢指导/面试后感谢',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I am writing to express my sincere gratitude for...',
        'I wanted to take a moment to thank you for...',
        'I deeply appreciate your support regarding...'
      ],
      details: [
        'Your [specific help/support] played a crucial role in [positive outcome].',
        'I particularly appreciate [specific aspect that was most helpful].',
        'This achievement would not have been possible without your [specific contribution].'
      ],
      closing: [
        'I hope to stay in touch and perhaps repay your kindness.',
        'Thank you once again for your invaluable support.',
        'I will keep you updated on my progress.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封感谢邮件？如何让感谢显得真诚而非泛泛？',
      keyPoints: ['首段直接表达感谢', '中段具体说明对方的帮助和成果', '末段表达保持联系的意愿']
    }
  ),

  // 6. 邀请类模板
  createCard(
    'writing-task1-invitation',
    CardType.WRITING_TASK1,
    '邀请邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：团队聚会/送别派对/产品发布会/活动邀请',
    DifficultyLevel.CLB7,
    'semi-formal',
    {
      opening: [
        'I hope this message finds you well!',
        'I am excited to share some news with you.',
        'I would like to invite you to...'
      ],
      details: [
        'The event will be held on [date] at [time] at [location].',
        'We are organizing this to [purpose/occasion].',
        '[What\'s included: dinner, drinks, activities, etc.]'
      ],
      closing: [
        'Please RSVP by [date] so we can finalize arrangements.',
        'Feel free to reach out if you have any questions.',
        'Looking forward to celebrating with you!'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封邀请邮件？如何确保所有关键信息都包含？',
      keyPoints: ['首段说明邀请意图和背景', '中段包含日期/时间/地点/内容', '末段要求RSVP和联系方式']
    }
  ),

  // 7. 询问类模板
  createCard(
    'writing-task1-inquiry',
    CardType.WRITING_TASK1,
    '询问邮件通用模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：服务咨询/课程信息/政策查询/工作机会',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to inquire about...',
        'I would appreciate some information regarding...',
        'I am interested in learning more about...'
      ],
      details: [
        'Specifically, I would like to know about [specific question 1].',
        'Additionally, could you provide details on [specific question 2]?',
        'I am also interested in understanding [specific question 3].'
      ],
      closing: [
        'I would appreciate if someone could contact me to discuss these options.',
        'Thank you for your assistance.',
        'I look forward to hearing from you soon.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封询问邮件？如何提出清晰具体的问题？',
      keyPoints: ['首段说明询问目的', '中段列出2-3个具体问题', '末段表达期待回复和感谢']
    }
  ),

  // 8. 推荐类模板
  createCard(
    'writing-task1-recommendation',
    CardType.WRITING_TASK1,
    '推荐邮件模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：推荐同事/推荐候选人',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to highly recommend [name] for [position/opportunity].',
        'It is my pleasure to recommend [name] for...',
        'I would like to express my strong support for [name]\'s application.'
      ],
      details: [
        'I have known [name] for [duration] in my capacity as [relationship].',
        'During this time, [name] has demonstrated [specific qualities/achievements].',
        'One notable example is [specific achievement or strength].'
      ],
      closing: [
        'I am confident that [name] would be an excellent fit for this role.',
        'Please feel free to contact me if you need any additional information.',
        'Thank you for considering this recommendation.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封推荐邮件？如何用具体事例支撑推荐？',
      keyPoints: ['首段明确推荐意图', '中段用具体事例说明被推荐人能力', '末段表达信心和提供进一步信息']
    }
  ),

  // 9. 申请类模板
  createCard(
    'writing-task1-application',
    CardType.WRITING_TASK1,
    '申请邮件模板',
    '评分维度：内容相关性 + 语言运用 + 格式规范 | 适用场景：志愿者/奖学金/会员/职位申请',
    DifficultyLevel.CLB8,
    'formal',
    {
      opening: [
        'I am writing to formally apply for [position/opportunity].',
        'I would like to submit my application for...',
        'Please accept this email as my formal application for...'
      ],
      details: [
        'My background in [relevant experience] makes me a strong candidate because...',
        'I have [specific qualifications/achievements] that align with the requirements.',
        'I am particularly drawn to this opportunity because [motivation].'
      ],
      closing: [
        'I have attached my [resume/documents] for your review.',
        'I would welcome the opportunity to discuss my application further.',
        'Thank you for considering my application.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 8 分钟内完成一封申请邮件？如何突出自身优势？',
      keyPoints: ['首段明确申请目标', '中段展示匹配资质和动机', '末段附材料并表达面试意愿']
    }
  ),

  // ==========================================
  // === WRITING TASK 2: 观点论证 (7张) ===
  // ==========================================

  // 1. 论证结构模板
  createCard(
    'writing-task2-argument-structure',
    CardType.WRITING_TASK2,
    '观点论证结构模板',
    '评分维度：内容充分性 + 语言运用 + 逻辑连贯性 | 适用于所有 Task 2 话题',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introduction: [
        '[Topic] has become a subject of considerable debate in recent years.',
        'I firmly believe that [clear stance].',
        'This essay will explore the key reasons supporting my position.'
      ],
      body1: [
        'First and foremost, [main argument 1 with topic sentence].',
        '[Supporting evidence or example].',
        'This demonstrates that [link back to thesis].'
      ],
      body2: [
        'Furthermore, [main argument 2 with topic sentence].',
        '[Supporting evidence or example].',
        'This further strengthens the case for [thesis].'
      ],
      counterargument: [
        'While some may argue that [opposing view],',
        'This perspective overlooks [counter-point].',
        'In reality, [rebuttal with evidence].'
      ],
      conclusion: [
        'In conclusion, [restate thesis in different words].',
        'The evidence clearly supports [summary of main points].',
        'Therefore, [final thought or recommendation].'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 25 分钟内完成一篇结构完整的观点论证文章？如何平衡正反论证？',
      keyPoints: ['5分钟规划结构', '正文两段各一个核心论点', '必须包含反方观点+反驳', '3分钟检查语法和连贯性']
    }
  ),

  // 2. 评分标准卡
  createCard(
    'writing-task2-scoring',
    CardType.WRITING_TASK2,
    'Task 2 评分标准与时间分配',
    '评分维度：内容充分性(40%) + 语言运用(30%) + 逻辑连贯性(30%) | 总时间25分钟',
    DifficultyLevel.CLB9,
    'neutral',
    {
      content: [
        'Clear position stated in introduction and maintained throughout',
        'At least two well-developed arguments with supporting evidence',
        'Counter-argument acknowledged and effectively rebutted'
      ],
      language: [
        'Varied sentence structures (simple, compound, complex)',
        'Appropriate academic vocabulary and formal register',
        'Minimal grammatical errors that don\'t impede comprehension'
      ],
      timeAllocation: [
        '5 min: Plan structure and brainstorm arguments',
        '15 min: Write introduction, 2 body paragraphs, counter-argument',
        '3 min: Write conclusion'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 25 分钟内最大化 Task 2 分数？各评分维度如何针对性提升？',
      keyPoints: ['内容占40%最重要', '必须有明确立场和论据', '语言多样性影响30%分数', '留2分钟检查语法错误']
    }
  ),

  // 3. 高分连接词卡
  createCard(
    'writing-task2-connectors',
    CardType.WRITING_TASK2,
    '高分连接词和过渡表达',
    '精选15个最关键的连接词，覆盖添加、对比、因果、让步、总结',
    DifficultyLevel.CLB8,
    'neutral',
    {
      addition: ['Furthermore', 'Moreover', 'In addition'],
      contrast: ['However', 'On the other hand', 'Nevertheless'],
      causeEffect: ['Consequently', 'As a result', 'Therefore'],
      conclusion: ['In conclusion', 'To summarize', 'Ultimately']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在写作中自然使用连接词提升连贯性分数？哪些连接词最容易提分？',
      keyPoints: ['每段至少用2个连接词', '避免重复使用同一个', 'However/Furthermore/Consequently 最实用', '结论段用In conclusion']
    }
  ),

  // 4. 远程工作话题卡
  createCard(
    'writing-task2-remote-work',
    CardType.WRITING_TASK2,
    '远程工作话题',
    '高频考题：公司是否应该允许远程工作？| 评分维度：内容充分性 + 语言运用 + 逻辑连贯性',
    DifficultyLevel.CLB8,
    'neutral',
    {
      arguments: [
        'Improves work-life balance and reduces commuting time',
        'Increases productivity through flexible working environments',
        'Attracts and retains top talent globally'
      ],
      counterargument: [
        'Some argue remote work reduces collaboration, but modern tools (Zoom, Slack) enable seamless virtual teamwork'
      ],
      keyVocabulary: ['flexible work arrangements', 'work-life integration', 'remote collaboration']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何论证远程工作的利弊？如何在25分钟内组织完整的远程工作话题文章？',
      keyPoints: ['支持方：工作生活平衡+生产力提升', '反对方：协作减少但可被技术弥补', '结论：利大于弊']
    }
  ),

  // 5. 环保话题卡
  createCard(
    'writing-task2-environment',
    CardType.WRITING_TASK2,
    '环保话题',
    '高频考题：环保 vs 经济发展 | 评分维度：内容充分性 + 语言运用 + 逻辑连贯性',
    DifficultyLevel.CLB9,
    'neutral',
    {
      arguments: [
        'Environmental degradation poses existential threats to human survival',
        'Green economy creates jobs and stimulates innovation',
        'Sustainable practices improve long-term profitability'
      ],
      counterargument: [
        'Critics argue regulations harm competitiveness, but evidence shows sustainable companies outperform competitors'
      ],
      keyVocabulary: ['sustainable development', 'carbon footprint', 'renewable energy']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何论证环保与经济发展的关系？如何避免极端立场？',
      keyPoints: ['立场：环保优先但兼顾经济', '论据：绿色经济机遇+长期成本', '反驳：可持续发展证明双赢']
    }
  ),

  // 6. 社交媒体话题卡
  createCard(
    'writing-task2-social-media',
    CardType.WRITING_TASK2,
    '社交媒体话题',
    '高频考题：社交媒体对社会的影响 | 评分维度：内容充分性 + 语言运用 + 逻辑连贯性',
    DifficultyLevel.CLB9,
    'neutral',
    {
      arguments: [
        'Democratizes information and amplifies marginalized voices',
        'Provides powerful tools for business and education',
        'Enables global connection and community building'
      ],
      counterargument: [
        'Misinformation and mental health concerns are valid but addressable through media literacy and platform design'
      ],
      keyVocabulary: ['information democratization', 'digital literacy', 'online community']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何辩证分析社交媒体的影响？如何提出建设性解决方案？',
      keyPoints: ['正面：信息民主化+商业教育工具', '负面：虚假信息+心理健康', '方案：媒体素养教育+平台责任']
    }
  ),

  // 7. 工作生活平衡话题卡
  createCard(
    'writing-task2-work-life-balance',
    CardType.WRITING_TASK2,
    '工作与生活平衡话题',
    '高频考题：工作与生活平衡的重要性 | 评分维度：内容充分性 + 语言运用 + 逻辑连贯性',
    DifficultyLevel.CLB8,
    'neutral',
    {
      arguments: [
        'Burnout reduces productivity and increases healthcare costs',
        'Work-life balance improves employee retention and job satisfaction',
        'Flexible policies benefit both employers and employees'
      ],
      counterargument: [
        'Some argue long hours equal dedication, but research shows rested workers are more efficient'
      ],
      keyVocabulary: ['work-life integration', 'employee wellbeing', 'burnout prevention']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何论证工作与生活平衡的重要性？如何用研究数据支撑论点？',
      keyPoints: ['论据：生产力提升+离职率降低', '反驳：长时间工作≠高产出', '结论：企业应推行灵活政策']
    }
  ),

  // ==========================================
  // === SPEAKING: 口语 (4张) ===
  // ==========================================

  // 1. Task 1 建议类格式
  createCard(
    'speaking-task1-advice',
    CardType.SPEAKING_TASK,
    'Task 1: 给出建议 — 考试格式',
    'CELPIP口语Task 1特有格式：90秒准备 + 60秒回答 | 评分维度：内容+词汇+连贯性+听力理解',
    DifficultyLevel.CLB8,
    'informal',
    {
      structure: [
        'Opening (10s): Acknowledge the situation and show empathy',
        'Advice 1-2 (25s): Two recommendations with brief reasons',
        'Closing (10s): Encouragement and offer further help'
      ],
      keyPhrases: [
        'I would strongly recommend...',
        'Another thing you could try is...',
        'Whatever you decide, I\'m here to support you.'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 60 秒内完成 Task 1 建议类回答？如何组织3条建议的结构？',
      keyPoints: ['开头10秒共情+引入', '3条建议各15秒', '结尾10秒鼓励', '用连接词过渡']
    }
  ),

  // 2. Task 2 个人经历格式
  createCard(
    'speaking-task2-experience',
    CardType.SPEAKING_TASK,
    'Task 2: 描述个人经历 — 考试格式',
    'CELPIP口语Task 2特有格式：90秒准备 + 60秒回答 | 评分维度：内容+词汇+连贯性',
    DifficultyLevel.CLB8,
    'informal',
    {
      structure: [
        'Introduction (10s): State what experience and why memorable',
        'Details + Feelings (25s): What happened and your emotions',
        'Conclusion (10s): Significance and what you learned'
      ],
      keyPhrases: [
        'I would like to share an experience that...',
        'What happened was...',
        'Looking back, this experience taught me...'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 60 秒内完整描述一个个人经历？如何平衡细节和结构？',
      keyPoints: ['开头点明经历', '中段2-3个具体细节', '分享感受和影响', '结尾总结意义']
    }
  ),

  // 3. Task 3 场景描述格式
  createCard(
    'speaking-task3-scene',
    CardType.SPEAKING_TASK,
    'Task 3: 描述场景 — 考试格式',
    'CELPIP口语Task 3特有格式：60秒准备 + 60秒回答 | 评分维度：内容+词汇+连贯性',
    DifficultyLevel.CLB7,
    'neutral',
    {
      structure: [
        'Overview (10s): General description of the scene',
        'Foreground + Middleground (25s): Key activities in front and middle',
        'Background + Atmosphere (15s): What\'s behind and overall mood'
      ],
      keyPhrases: [
        'This image shows a scene of...',
        'In the foreground, I can see...',
        'The overall atmosphere seems...'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 60 秒内系统描述一个场景？如何按空间顺序组织描述？',
      keyPoints: ['先总览后细节', '从前到后空间顺序', '描述人物活动', '总结整体氛围']
    }
  ),

  // 4. Task 4-8 统一格式卡
  createCard(
    'speaking-task4to8-format',
    CardType.SPEAKING_TASK,
    'Task 4-8: 预测/比较/困难情境/观点/异常 — 考试格式汇总',
    'CELPIP口语Task 4-8共用格式框架 | 每个Task 60-90秒回答时间',
    DifficultyLevel.CLB8,
    'neutral',
    {
      task4Prediction: [
        'Introduction: State your prediction clearly',
        'Prediction 1-2: Two areas of change with reasons',
        'Conclusion: Acknowledge uncertainty, summarize'
      ],
      task5Compare: [
        'Introduction: State what you\'re comparing',
        'Comparison + Preference: Fair analysis with recommendation',
        'Persuasion: Strong closing argument'
      ],
      task6Difficult: [
        'Opening: Polite and non-confrontational',
        'Problem + Request: Explain issue factually, make specific request',
        'Closing: Thank them for understanding'
      ],
      task7Opinion: [
        'Introduction: State the issue and your position',
        'Arguments + Counter: Supporting points with brief rebuttal',
        'Conclusion: Restate position confidently'
      ],
      task8Unusual: [
        'Setting + Problem: When/where/who and what went wrong',
        'Reaction + Resolution: How you responded and what you learned'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: 'CELPIP口语Task 4-8各有什么格式要求？如何在有限时间内组织回答？',
      keyPoints: ['Task 4: 预测3个领域', 'Task 5: 比较+说服', 'Task 6: 礼貌处理困难情境', 'Task 7: 表达观点+反驳', 'Task 8: 描述异常经历']
    }
  ),

  // ==========================================
  // === READING: 阅读策略 (12张) ===
  // ==========================================

  // 1. Part 1 邮件结构
  createCard(
    'reading-part1-email-structure',
    CardType.READING,
    'Part 1: 邮件结构识别',
    '评分维度：信息定位准确性 | Part 1 占考试阅读约25%，主要测试邮件/信函理解',
    DifficultyLevel.CLB7,
    'structural',
    {
      structureElements: [
        'Greeting → determines formality level (Dear/Hi/To Whom)',
        'Opening sentence → states the purpose directly',
        'Body → provides details, requests, actions',
        'Closing → expected response or next steps'
      ],
      strategy: [
        'Read the question first, then scan the email for answers',
        'Identify formality level from greeting and sign-off',
        'First paragraph usually contains the main purpose'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 1 快速识别邮件类型和目的？如何区分正式/非正式邮件？',
      keyPoints: ['先看题目再读邮件', '首段找目的', '称呼判断正式程度', '注意具体日期/时间/地点细节']
    }
  ),

  // 2. Part 1 推理技巧
  createCard(
    'reading-part1-inference',
    CardType.READING,
    'Part 1: 信函推理技巧',
    '评分维度：信息定位准确性 | 从字里行间推断写信人态度和隐含意思',
    DifficultyLevel.CLB8,
    'inferential',
    {
      toneIndicators: [
        'Positive: delighted, appreciate, thank you',
        'Negative: disappointed, unfortunately, concern',
        'Urgent: as soon as possible, immediately'
      ],
      strategy: [
        'Notice word choice — vocabulary reveals attitude',
        'Look for modifiers (very, extremely, deeply) for intensity',
        'Infer unstated expectations from context'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何从邮件用词推断写信人的真实态度？如何识别隐含的期望？',
      keyPoints: ['词汇选择暴露态度', '修饰词显示强度', '从上下文推断未明说的期望']
    }
  ),

  // 3. Part 2 图表+文本
  createCard(
    'reading-part2-visual-text',
    CardType.READING,
    'Part 2: 图表与文本结合',
    '评分维度：信息定位准确性 | Part 2 测试图表信息整合能力',
    DifficultyLevel.CLB7,
    'visual',
    {
      diagramTypes: ['Floor plans', 'Organizational charts', 'Process diagrams'],
      strategy: [
        'Study the diagram FIRST before reading text',
        'Match text descriptions to visual elements',
        'Cross-reference: verify details between text and diagram',
        'Pay attention to labels, titles, and directional indicators'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何高效结合图表和文本回答问题？应该先看图表还是先读文本？',
      keyPoints: ['先看图表建立框架', '再读文本填充信息', '交叉验证细节', '注意方位词和标签']
    }
  ),

  // 4. Part 3 略读技巧
  createCard(
    'reading-part3-skimming',
    CardType.READING,
    'Part 3: 快速略读技巧',
    '评分维度：信息定位准确性 | Part 3 长文本略读是2026年变更后的难点',
    DifficultyLevel.CLB8,
    'efficient',
    {
      skimmingSteps: [
        'Read titles, subtitles, and section headings first (10s)',
        'Read first sentence of each paragraph (30s)',
        'Note bold text, numbers, names, and dates (10s)'
      ],
      timeRule: ['60-90 seconds per skim pass', 'Budget 13 min total for Part 3']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 13 分钟内完成 Part 3 的长文本阅读？先略读还是先看题？',
      keyPoints: ['先看题目再带着问题略读', '60-90秒完成首次略读', '标记关键位置再精读', '不要逐字阅读']
    }
  ),

  // 5. Part 3 扫读技巧
  createCard(
    'reading-part3-scanning',
    CardType.READING,
    'Part 3: 精准扫读技巧',
    '评分维度：信息定位准确性 | 带着问题快速定位特定信息',
    DifficultyLevel.CLB8,
    'targeted',
    {
      scanningTargets: [
        'Numbers: dates, times, prices, percentages, statistics',
        'Names: people, places, organizations (capital letters)',
        'Keywords: from questions, plus synonyms and paraphrases'
      ],
      strategy: [
        'Read the question FIRST to know what you\'re looking for',
        'Use visual cues — numbers and capitals stand out',
        'Confirm answer by reading surrounding sentence'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何快速在长文本中定位特定信息？扫读时应该关注什么视觉线索？',
      keyPoints: ['先看题目明确目标', '利用数字和大写字母', 'Z字形扫读', '定位后读上下文确认']
    }
  ),

  // 6. Part 4 观点识别
  createCard(
    'reading-part4-opinion-identification',
    CardType.READING,
    'Part 4: 观点识别技巧',
    '评分维度：信息定位准确性 | Part 4 测试多文本观点识别和归属',
    DifficultyLevel.CLB8,
    'critical',
    {
      opinionMarkers: [
        'In my view / I believe / It seems to me (personal)',
        'According to / X claims that / Research suggests (attribution)',
        'However / In contrast / Critics counter (disagreement)'
      ],
      strategy: [
        'Track WHO says WHAT — note which opinion belongs to which source',
        'Distinguish fact (verifiable) from opinion (subjective)',
        'Note agreement and disagreement between sources'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在多文本中追踪不同作者的观点？如何区分事实和观点？',
      keyPoints: ['标记每个观点的来源', '事实可验证，观点主观', '注意同意/不同意的信号词']
    }
  ),

  // 7. Part 4 论证分析
  createCard(
    'reading-part4-argument-analysis',
    CardType.READING,
    'Part 4: 论证分析技巧',
    '评分维度：信息定位准确性 | 分析论证强度和证据类型',
    DifficultyLevel.CLB9,
    'evaluative',
    {
      evidenceTypes: ['Statistics and data', 'Expert opinions', 'Research findings'],
      reasoningPatterns: ['Cause and effect', 'Comparison', 'Problem-solution', 'Chronological'],
      strategy: [
        'Evaluate evidence quality — is it reliable and relevant?',
        'Check if conclusions logically follow from evidence',
        'Look for emotional appeals vs. logical reasoning'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何评估论证的强度？哪些证据类型最有说服力？',
      keyPoints: ['统计数据和研究结果最有力', '检查逻辑链条', '区分情感诉求和逻辑推理']
    }
  ),

  // 8. 通用时间管理
  createCard(
    'reading-general-time-management',
    CardType.READING,
    '通用策略: 阅读时间管理',
    '评分维度：信息定位准确性 | 阅读部分总时间分配策略',
    DifficultyLevel.CLB7,
    'strategic',
    {
      timeAllocation: [
        'Part 1 (Correspondence): ~12 minutes',
        'Part 2 (Diagram): ~10 minutes',
        'Part 3 (Information): ~17 minutes'
      ],
      strategy: [
        'Answer easy questions first, return to difficult ones',
        'Set mental checkpoints at each section',
        'Don\'t spend more than 2 minutes on any single question'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在阅读考试中有效分配时间？各部分应该花多少时间？',
      keyPoints: ['Part 1: 12min, Part 2: 10min, Part 3: 17min, Part 4: 16min', '先易后难', '每题不超过2分钟']
    }
  ),

  // 9. 通用词汇推断
  createCard(
    'reading-general-vocabulary',
    CardType.READING,
    '通用策略: 词汇推断',
    '评分维度：信息定位准确性 | 遇到生词时的推断策略',
    DifficultyLevel.CLB8,
    'vocabulary',
    {
      contextClues: [
        'Look at surrounding words and sentence meaning',
        'Check for synonyms or antonyms nearby',
        'Identify prefixes/suffixes for word meaning'
      ],
      strategy: [
        'Not all unknown words matter — focus on key vocabulary',
        'Use overall comprehension to skip unknown words',
        'If the word is crucial, the text usually explains it'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '遇到不认识的单词时如何推断意思？什么时候应该跳过生词？',
      keyPoints: ['先用上下文推断', '分析词根词缀', '不是每个生词都重要', '关键生词通常有解释']
    }
  ),

  // 10. 通用排除法
  createCard(
    'reading-general-answer-elimination',
    CardType.READING,
    '通用策略: 排除法答题',
    '评分维度：信息定位准确性 | 用排除法提高答题准确率',
    DifficultyLevel.CLB8,
    'tactical',
    {
      eliminationCriteria: [
        'Too extreme (always, never, everyone, nobody)',
        'Not mentioned in the text',
        'True but irrelevant to the specific question'
      ],
      strategy: [
        'Start by eliminating clearly wrong answers',
        'The correct answer should be supported by text evidence',
        'Beware of trap answers: correct info for wrong question'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何用排除法提高选择题准确率？常见的陷阱答案有哪些特征？',
      keyPoints: ['先排除明显错误选项', '正确答案必须有文本证据', '警惕"正确但无关"的陷阱']
    }
  ),

  // 11. 学术阅读词汇
  createCard(
    'reading-academic-vocabulary',
    CardType.READING,
    '学术阅读高频词汇',
    '评分维度：信息定位准确性 | Part 3-4 长文本中最常见的学术词汇',
    DifficultyLevel.CLB9,
    'academic',
    {
      analysisWords: ['examine', 'evaluate', 'assess'],
      argumentWords: ['contend', 'assert', 'claim'],
      connectionWords: ['consequently', 'therefore', 'furthermore'],
      evaluationWords: ['significant', 'substantial', 'crucial']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '哪些学术词汇在CELPIP阅读中出现频率最高？如何快速识别？',
      keyPoints: ['分析类动词最常考', '连接词决定逻辑关系', '评价词影响语气判断']
    }
  ),

  // 12. Part 1 题型分析（合并原 question-types 卡）
  createCard(
    'reading-part1-question-types',
    CardType.READING,
    'Part 1: 常见题型分析',
    '评分维度：信息定位准确性 | 熟悉Part 1的4种问题类型',
    DifficultyLevel.CLB8,
    'strategic',
    {
      questionTypes: [
        'Purpose: Why did the writer write this email?',
        'Detail: According to the email, what/when/where/how?',
        'Inference: What can be inferred about the writer?'
      ],
      strategy: [
        'Purpose questions → read first and last paragraphs',
        'Detail questions → scan for specific information',
        'Inference questions → look for tone and implied meaning'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: 'Part 1 有哪几种问题类型？每种应该用什么策略回答？',
      keyPoints: ['目的题读首尾段', '细节题扫读定位', '推理题看语气用词', '词汇题看上下文']
    }
  ),

  // ==========================================
  // === LISTENING: 听力策略 (9张) ===
  // ==========================================

  // 1. 信号词识别（最高优先级）
  createCard(
    'listening-signal-words',
    CardType.LISTENING_KEYWORD,
    '信号词和过渡语识别',
    '评分维度：信息捕捉准确性 | 信号词是听力答题的最关键线索',
    DifficultyLevel.CLB8,
    'neutral',
    {
      contrastSignals: ['however', 'but', 'although'],
      additionSignals: ['furthermore', 'moreover', 'in addition'],
      causeEffectSignals: ['therefore', 'consequently', 'as a result'],
      emphasisSignals: ['most importantly', 'the key point is', 'particularly']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在听力中快速识别信号词？哪些信号词最常考？',
      keyPoints: ['转折信号后通常是答案', '因果信号连接关键信息', '强调信号提示重点', '添加信号表示新论点']
    }
  ),

  // 2. Part 1 问题解决
  createCard(
    'listening-part1-problem-solving',
    CardType.LISTENING_KEYWORD,
    'Part 1: 问题解决听力策略',
    '评分维度：信息捕捉准确性 | Part 1 测试日常问题解决对话理解',
    DifficultyLevel.CLB7,
    'neutral',
    {
      problemSignals: ['The issue is...', 'We\'re having trouble with...', 'Something seems wrong'],
      suggestionSignals: ['Why don\'t we...?', 'Have you considered...?', 'One option would be...'],
      decisionSignals: ['That sounds good', 'Let\'s go with that', 'I think that would work']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 1 问题解决对话中捕捉关键信息？如何识别问题和解决方案？',
      keyPoints: ['听问题描述抓核心', '注意建议短语', '标记决定和下一步行动']
    }
  ),

  // 3. Part 2 日常对话
  createCard(
    'listening-part2-daily-life',
    CardType.LISTENING_KEYWORD,
    'Part 2: 日常对话听力策略',
    '评分维度：信息捕捉准确性 | Part 2 测试购物、预约、服务等日常场景',
    DifficultyLevel.CLB7,
    'neutral',
    {
      shoppingSignals: ['How much does this cost?', 'Is this on sale?', 'Can I try this on?'],
      appointmentSignals: ['I\'d like to schedule...', 'When is the earliest...?', 'I need to reschedule'],
      serviceSignals: ['How long will this take?', 'What does it include?', 'Is there a warranty?']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 2 日常对话中快速识别场景和关键信息？',
      keyPoints: ['先判断场景类型', '注意价格/时间/服务细节', '关注付款和预约信息']
    }
  ),

  // 4. Part 3 信息获取
  createCard(
    'listening-part3-information',
    CardType.LISTENING_KEYWORD,
    'Part 3: 信息获取听力策略',
    '评分维度：信息捕捉准确性 | Part 3 测试说明性对话中的信息提取',
    DifficultyLevel.CLB8,
    'neutral',
    {
      instructionSignals: ['First, you need to...', 'Make sure you...', 'Don\'t forget to...'],
      sequenceSignals: ['To begin with...', 'After that...', 'Finally...'],
      emphasisSignals: ['It\'s essential that...', 'Please note that...', 'Pay special attention to...']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 3 说明性对话中追踪步骤和关键信息？',
      keyPoints: ['注意顺序词追踪步骤', '标记强调信号', '记录数字和具体要求']
    }
  ),

  // 5. Part 4 新闻听力
  createCard(
    'listening-part4-news',
    CardType.LISTENING_KEYWORD,
    'Part 4: 新闻听力策略',
    '评分维度：信息捕捉准确性 | Part 4 测试新闻报道理解能力',
    DifficultyLevel.CLB8,
    'neutral',
    {
      introSignals: ['According to a recent report...', 'A study has found that...', 'Officials announced...'],
      sourceSignals: ['Experts say...', 'Researchers believe...', 'Government data shows...'],
      impactSignals: ['This will affect...', 'As a result...', 'The consequences include...'],
      predictionSignals: ['It is expected that...', 'This trend is likely to...', 'Future projections suggest...']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 4 新闻中捕捉关键事实和影响？如何识别信息来源？',
      keyPoints: ['听开头抓核心事实', '注意信息来源引用', '标记影响和预测']
    }
  ),

  // 6. Part 5 多人讨论
  createCard(
    'listening-part5-discussion',
    CardType.LISTENING_KEYWORD,
    'Part 5: 多人讨论听力策略',
    '评分维度：信息捕捉准确性 | Part 5 测试追踪多人讨论中观点的能力',
    DifficultyLevel.CLB9,
    'neutral',
    {
      opinionSignals: ['In my opinion...', 'I believe that...', 'From my perspective...'],
      agreementSignals: ['I completely agree', 'That\'s exactly what I think', 'You make a valid point'],
      disagreementSignals: ['I see your point, but...', 'I respectfully disagree', 'However...'],
      transitionSignals: ['Moving on...', 'On the other hand...', 'In contrast...']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 5 多人讨论中追踪每个发言者的观点？如何识别同意和分歧？',
      keyPoints: ['标记每个发言者的立场', '注意同意/不同意信号', '追踪话题转换']
    }
  ),

  // 7. Part 6 观点对比
  createCard(
    'listening-part6-viewpoints',
    CardType.LISTENING_KEYWORD,
    'Part 6: 观点对比听力策略',
    '评分维度：信息捕捉准确性 | Part 6 测试识别和比较不同观点',
    DifficultyLevel.CLB9,
    'neutral',
    {
      positionSignals: ['The first speaker argues...', 'Another perspective is...', 'Some people believe...'],
      evidenceSignals: ['Research supports...', 'This is demonstrated by...', 'Evidence suggests...'],
      counterSignals: ['On the contrary...', 'However, opponents argue...', 'A different view holds...'],
      evaluationSignals: ['The strongest argument is...', 'A weakness in this position is...', 'Both sides have merit, but...']
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何在 Part 6 中比较不同观点的强弱？如何识别证据和反驳？',
      keyPoints: ['识别每个立场的核心论点', '注意证据类型', '标记反驳和评估']
    }
  ),

  // 8. 通用预览策略
  createCard(
    'listening-general-preview',
    CardType.LISTENING_KEYWORD,
    '通用策略: 预览时间利用',
    '评分维度：信息捕捉准确性 | 利用播放前的预览时间预判内容',
    DifficultyLevel.CLB7,
    'strategic',
    {
      previewStrategy: [
        'Read all questions and answer choices before audio starts',
        'Underline keywords in questions (who, what, when, where)',
        'Note any numbers, dates, or names mentioned'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '如何利用听力考试前的预览时间？预览时应该关注什么？',
      keyPoints: ['读所有题目和选项', '标记关键词', '预判场景和话题', '注意数字和人名']
    }
  ),

  // 9. 通用答题技巧
  createCard(
    'listening-general-answer',
    CardType.LISTENING_KEYWORD,
    '通用策略: 听力答题技巧',
    '评分维度：信息捕捉准确性 | 听力考试通用答题策略',
    DifficultyLevel.CLB7,
    'tactical',
    {
      answerStrategy: [
        'Listen for the main idea first, details second',
        'If you miss an answer, move on — don\'t dwell',
        'Eliminate obviously wrong options first'
      ],
      noteTaking: [
        'Use abbreviations and symbols (→ for leads to, ↑ for increase)',
        'Focus on keywords from questions, not everything',
        'Write numbers and names immediately'
      ]
    },
    { vocabulary: {}, structure: {} },
    {
      question: '听力考试中如何高效答题？如何做笔记而不影响听力？',
      keyPoints: ['先抓主旨再听细节', '错过就跳过', '用缩写和符号记笔记', '先排除明显错误选项']
    }
  )
];

// AI Prompts (保持不变，从原文件复制)
export const aiPrompts = [
  {
    id: 'writing-task1-prompt',
    title: 'Writing Task 1 邮件写作助手',
    prompt: 'You are a CELPIP Writing Task 1 expert. Help the user write a professional email based on the following scenario. Use appropriate tone (formal/semi-formal/informal), include all required elements, and aim for CLB 8+ level vocabulary and structure. Keep the email between 150-200 words.',
    applicableCards: ['writing-task1-complaint', 'writing-task1-request', 'writing-task1-suggestion', 'writing-task1-apology', 'writing-task1-thanks', 'writing-task1-invitation', 'writing-task1-inquiry', 'writing-task1-recommendation', 'writing-task1-application']
  },
  {
    id: 'writing-task2-prompt',
    title: 'Writing Task 2 观点论证助手',
    prompt: 'You are a CELPIP Writing Task 2 expert. Help the user write a well-structured argumentative essay. Include a clear introduction with thesis statement, at least two body paragraphs with supporting evidence, a counter-argument with rebuttal, and a strong conclusion. Aim for 250-300 words at CLB 8+ level.',
    applicableCards: ['writing-task2-argument-structure', 'writing-task2-scoring', 'writing-task2-connectors', 'writing-task2-remote-work', 'writing-task2-environment', 'writing-task2-social-media', 'writing-task2-work-life-balance']
  },
  {
    id: 'speaking-task-prompt',
    title: 'Speaking Task 练习助手',
    prompt: 'You are a CELPIP Speaking expert. Help the user practice speaking for the given task. Provide a model response that fits within the time limit (60-90 seconds), uses appropriate vocabulary and structure, and demonstrates CLB 8+ proficiency. Include timing markers for each section.',
    applicableCards: ['speaking-task1-advice', 'speaking-task2-experience', 'speaking-task3-scene', 'speaking-task4to8-format']
  },
  {
    id: 'reading-strategy-prompt',
    title: 'Reading 策略练习助手',
    prompt: 'You are a CELPIP Reading expert. Help the user improve their reading skills using the strategies from this card. Provide practice examples, explain the reasoning behind correct answers, and teach time management techniques. Focus on CLB 8+ level comprehension.',
    applicableCards: ['reading-part1-email-structure', 'reading-part1-inference', 'reading-part1-question-types', 'reading-part2-visual-text', 'reading-part3-skimming', 'reading-part3-scanning', 'reading-part4-opinion-identification', 'reading-part4-argument-analysis', 'reading-general-time-management', 'reading-general-vocabulary', 'reading-general-answer-elimination', 'reading-academic-vocabulary']
  },
  {
    id: 'listening-strategy-prompt',
    title: 'Listening 策略练习助手',
    prompt: 'You are a CELPIP Listening expert. Help the user improve their listening skills using the strategies from this card. Provide practice scenarios, teach signal word recognition, and explain note-taking techniques. Focus on CLB 8+ level comprehension.',
    applicableCards: ['listening-signal-words', 'listening-part1-problem-solving', 'listening-part2-daily-life', 'listening-part3-information', 'listening-part4-news', 'listening-part5-discussion', 'listening-part6-viewpoints', 'listening-general-preview', 'listening-general-answer']
  }
];
