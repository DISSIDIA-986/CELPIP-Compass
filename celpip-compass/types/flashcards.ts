// =============================================
// CELPIP Compass Flashcards TypeScript Interfaces
// 点句卡片系统TypeScript类型定义
// =============================================

// 卡片类型枚举
export enum CardType {
  WRITING_TASK1 = 'writing-task1',     // 写作 Task 1: 邮件写作
  WRITING_TASK2 = 'writing-task2',     // 写作 Task 2: 观点论证
  SPEAKING_TASK = 'speaking-task',     // 口 Task 1-8: 情景回应
  LISTENING_KEYWORD = 'listening-keyword' // 听力关键词预判
}

// 难度级别枚举
export enum DifficultyLevel {
  CLB7 = 'clb7',
  CLB8 = 'clb8',
  CLB9 = 'clb9'
}

// 卡片状态枚举
export enum CardStatus {
  NEW = 'new',           // 新卡片
  LEARNING = 'learning', // 学习中
  REVIEW = 'review',     // 复习中
  MASTERED = 'mastered', // 已掌握
  ARCHIVED = 'archived'  // 已归档
}

// 学习质量评分接口
export interface QualityScores {
  accuracy: number;      // 回忆准确度 (0-5)
  fluency: number;       // 流利度 (0-5)
  completeness: number; // 完整性 (0-5)
  pronunciation?: number; // 发音准确度 (口语卡片)
  structure?: number;   // 语法结构 (写作卡片)
}

// 核心表达接口
export interface EssentialPhrases {
  [key: string]: string[];  // 灵活的结构，支持不同卡片类型
}

// 词汇升级接口
export interface VocabularyUpgrade {
  [basic: string]: string[]; // 基础词汇 → 高分词汇
}

// 结构升级接口
export interface StructureUpgrade {
  [simple: string]: string; // 简单句 → 复杂句
}

// 升级包接口
export interface UpgradePackage {
  vocabulary: VocabularyUpgrade;
  structure?: StructureUpgrade;
}

// 练习题目接口
export interface PracticeItem {
  question: string;   // 模拟题目
  keyPoints: string[]; // 必须包含的要点
}

// 间隔重复元数据
export interface SpacedRepetitionMetadata {
  ease: number;       // 难度系数
  interval: number;    // 间隔(天)
  repetitions: number; // 重复次数
  dueDate: Date;      // 下次复习日期
}

// 卡片主接口
export interface Flashcard {
  id: string;
  type: CardType;
  title: string;
  scenario: string;
  tone?: string;
  difficulty: DifficultyLevel;
  status: CardStatus;

  // 学习内容
  essentialPhrases: EssentialPhrases;
  upgrades: UpgradePackage;
  practice?: PracticeItem;

  // 间隔重复数据
  metadata?: SpacedRepetitionMetadata;
  lastReviewedAt?: Date;
  nextReviewAt?: Date;
  reviewCount: number;
  correctCount: number;

  // 统计数据
  averageQualityScore: number;
  totalStudyTime: number; // 总学习时间(秒)

  // 时间戳
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// 标签接口
export interface Tag {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
}

// 学习会话接口
export interface StudySession {
  id: string;
  userId: string;
  sessionStart: Date;
  sessionEnd?: Date;
  durationSeconds: number;
  cardsReviewed: number;
  accuracyRate: number;
  createdAt: Date;
}

// 复习记录接口
export interface ReviewRecord {
  id: string;
  userId: string;
  flashcardId: string;
  studySessionId?: string;

  // 质量评分
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  pronunciationScore?: number;
  structureScore?: number;

  // 综合评分
  overallQuality: number;

  // 复习详情
  reviewTime: Date;
  timeTakenSeconds?: number;
  userNotes?: string;
  isCorrect: boolean;

  createdAt: Date;
}

// 收藏接口
export interface Favorite {
  id: string;
  userId: string;
  flashcardId: string;
  favoritedAt: Date;
  notes?: string;
}

// 用户进度接口
export interface UserProgress {
  id: string;
  userId: string;
  flashcardId: string;

  // 学习状态
  status: CardStatus;
  currentStep: number;
  completedSteps: number;
  totalSteps: number;

  // 进度数据
  progressPercentage: number;
  streakDays: number;
  lastAccessedAt?: Date;

  // 统计数据
  totalReviews: number;
  successRate: number;
  averageResponseTime: number;

  createdAt: Date;
  updatedAt: Date;
}

// 每日学习统计接口
export interface DailyStudyStats {
  id: string;
  userId: string;
  studyDate: Date;

  // 当日统计
  cardsReviewed: number;
  newCardsLearned: number;
  reviewTimeMinutes: number;
  accuracyRate: number;

  // 成就统计
  perfectScores: number;
  studyStreak: number;

  createdAt: Date;
}

// 自定义卡片接口
export interface CustomCard {
  id: string;
  userId: string;

  // 卡片内容
  title: string;
  content: any; // JSONB，灵活存储
  type: CardType;
  difficulty: DifficultyLevel;
  tags: string[];

  // 共享设置
  isPublic: boolean;
  isApproved: boolean;

  // 统计数据
  usageCount: number;
  rating: number;

  createdAt: Date;
  updatedAt: Date;
}

// 反馈接口
export interface Feedback {
  id: string;
  userId: string;
  flashcardId: string;

  // 反馈内容
  rating: number;
  comment?: string;
  suggestions?: string;
  issueType?: string;

  // 反馈状态
  status: string;
  reviewedBy?: string;
  resolvedAt?: Date;

  createdAt: Date;
}

// 质量选择器组件Props
export interface QualitySelectorProps {
  onQualitySelect: (quality: number) => void;
  disabled?: boolean;
}

// 卡片组件Props
export interface FlashcardComponentProps {
  card: Flashcard;
  onReview: (cardId: string, quality: QualityScores) => void;
  showAnswer?: boolean;
  onShowAnswer?: () => void;
}

// 学习统计概览
export interface LearningOverview {
  totalCards: number;
  newCards: number;
  reviewCards: number;
  masteredCards: number;
  todayReviews: number;
  studyStreak: number;
  accuracyRate: number;
  averageStudyTime: number;
}

// 用户学习偏好
export interface LearningPreferences {
  dailyGoalMinutes: number;
  preferredStudyTimes: string[]; // ["morning", "evening"]
  difficultyFocus: DifficultyLevel[];
  weakAreas: CardType[];
  strongAreas: CardType[];
  reminderEnabled: boolean;
}

// 学习计划生成选项
export interface StudyPlanOptions {
  targetDate: Date;
  availableTimePerDay: number; // 分钟
  currentLevel: DifficultyLevel;
  targetLevel: DifficultyLevel;
  focusAreas: CardType[];
  weeklyPlan: boolean;
}

// 学习路径推荐
export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  estimatedDuration: number; // 天数
  difficulty: DifficultyLevel;
  cardIds: string[];
  milestones: {
    title: string;
    cardCount: number;
    targetDate: Date;
  }[];
  createdAt: Date;
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
}

// 分页接口
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 搜索查询接口
export interface SearchQuery {
  keyword?: string;
  type?: CardType;
  difficulty?: DifficultyLevel;
  tags?: string[];
  status?: CardStatus;
  createdAfter?: Date;
  createdBefore?: Date;
}

// 排序选项接口
export interface SortOption {
  field: keyof Flashcard | 'reviewCount' | 'averageQualityScore';
  direction: 'asc' | 'desc';
}

// 卡片筛选器
export interface CardFilter {
  type?: CardType;
  difficulty?: DifficultyLevel;
  status?: CardStatus;
  tags?: string[];
  isDueForReview?: boolean;
  isFavorite?: boolean;
  search?: string;
}

// 学习报告
export interface LearningReport {
  userId: string;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalStudyTime: number;
    cardsReviewed: number;
    newCardsLearned: number;
    accuracyRate: number;
    improvedAreas: CardType[];
    weakAreas: CardType[];
  };
  dailyStats: DailyStudyStats[];
  progressByType: {
    [key in CardType]: {
      reviewed: number;
      mastered: number;
      accuracy: number;
    };
  };
 recommendations: string[];
  generatedAt: Date;
}