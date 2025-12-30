-- =============================================
-- CELPIP Compass Flashcards Database Schema
-- 点句卡片系统数据库设计
-- =============================================

-- =============================================
-- 请在使用前执行以下命令创建数据库：
-- CREATE DATABASE celpip_compass;
-- \c celpip_compass;

-- =============================================
-- 1. 核心卡片表 (Core Card Tables)
-- =============================================

-- 卡片类型枚举
CREATE TYPE card_type AS ENUM (
  'writing-task1',    -- 写作 Task 1: 邮件写作
  'writing-task2',    -- 写作 Task 2: 观点论证
  'speaking-task',     -- 口 Task 1-8: 情景回应
  'listening-keyword'  -- 听力关键词预判
);

-- 卡片难度枚举
CREATE TYPE difficulty_level AS ENUM (
  'clb7',  -- CLB 7级别
  'clb8',  -- CLB 8级别
  'clb9'   -- CLB 9级别
);

-- 卡片状态枚举
CREATE TYPE card_status AS ENUM (
  'new',           -- 新卡片
  'learning',      -- 学习中
  'review',        -- 复习中
  'mastered',      -- 已掌握
  'archived'       -- 已归档
);

-- === 卡片主表 ===
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type card_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  scenario TEXT NOT NULL,                    -- 考试场景描述
  tone VARCHAR(50),                         -- 语气 (formal/semi-formal/informal)
  difficulty difficulty_level DEFAULT 'clb8',
  status card_status DEFAULT 'new',

  -- 核心学习内容
  essential_phrases JSONB NOT NULL,          -- {"opening": [], "purpose": [], "details": [], "closing": []}
  upgrades JSONB NOT NULL,                  -- {"vocabulary": {}, "structure": {}}
  practice JSONB,                           -- {"question": "", "keyPoints": []}

  -- 间隔重复数据
  metadata JSONB DEFAULT '{}',                -- SM2算法数据: {"ease": 2.5, "interval": 0, "repetitions": 0, "dueDate": "2025-12-29"}
  last_reviewed_at TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,

  -- 统计数据
  average_quality_score DECIMAL(3,2) DEFAULT 0.00,
  total_study_time INTEGER DEFAULT 0,       -- 总学习时间(秒)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- 卡片分类标签表
CREATE TABLE IF NOT EXISTS flashcard_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',  -- HEX颜色
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 卡片-标签关联表
CREATE TABLE IF NOT EXISTS flashcard_tags_map (
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES flashcard_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (flashcard_id, tag_id)
);

-- =============================================
-- 2. 用户学习记录表
-- =============================================

-- 学习会话表
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  cards_reviewed INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 卡片复习记录表
CREATE TABLE IF NOT EXISTS flashcard_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  study_session_id UUID REFERENCES study_sessions(id),

  -- 复习质量评估 (0-5分)
  accuracy_score SMALLINT CHECK (accuracy_score BETWEEN 0 AND 5),
  fluency_score SMALLINT CHECK (fluency_score BETWEEN 0 AND 5),
  completeness_score SMALLINT CHECK (completeness_score BETWEEN 0 AND 5),
  pronunciation_score SMALLINT CHECK (pronunciation_score BETWEEN 0 AND 5),
  structure_score SMALLINT CHECK (structure_score BETWEEN 0 AND 5),

  -- 综合质量分数
  overall_quality SMALLINT CHECK (overall_quality BETWEEN 0 AND 5),

  -- 复习详情
  review_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  time_taken_seconds INTEGER,                    -- 本次复习花费时间
  user_notes TEXT,                               -- 用户笔记
  is_correct BOOLEAN,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户收藏表
CREATE TABLE IF NOT EXISTS flashcard_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  favorited_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  PRIMARY KEY (user_id, flashcard_id)
);

-- =============================================
-- 3. 学习进度和统计表
-- =============================================

-- 用户卡片学习进度表
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,

  -- 学习状态
  status card_status DEFAULT 'new',
  current_step INTEGER DEFAULT 1,
  completed_steps INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 1,

  -- 进度数据
  progress_percentage DECIMAL(5,2) DEFAULT 0.00,
  streak_days INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,

  -- 统计数据
  total_reviews INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  average_response_time DECIMAL(6,2) DEFAULT 0.00,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, flashcard_id)
);

-- 每日学习统计表
CREATE TABLE IF NOT EXISTS daily_study_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  study_date DATE NOT NULL,

  -- 当日统计
  cards_reviewed INTEGER DEFAULT 0,
  new_cards_learned INTEGER DEFAULT 0,
  review_time_minutes INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5,2) DEFAULT 0.00,

  -- 成就统计
  perfect_scores INTEGER DEFAULT 0,
  study_streak INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, study_date)
);

-- =============================================
-- 4. 用户自定义表
-- =============================================

-- 用户自定义卡片表
CREATE TABLE IF NOT EXISTS user_custom_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,

  -- 卡片内容
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,                    -- 自定义卡片内容
  type card_type NOT NULL,
  difficulty difficulty_level DEFAULT 'clb8',
  tags TEXT[] DEFAULT '{}',                   -- 用户标签

  -- 共享设置
  is_public BOOLEAN DEFAULT FALSE,            -- 是否公开分享
  is_approved BOOLEAN DEFAULT FALSE,          -- 是否官方批准

  usage_count INTEGER DEFAULT 0,              -- 使用次数
  rating DECIMAL(3,2) DEFAULT 0.00,           -- 用户评分

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 卡片评论和反馈表
CREATE TABLE IF NOT EXISTS flashcard_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,

  -- 反馈内容
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  suggestions TEXT,                           -- 改进建议
  issue_type VARCHAR(50),                     -- 问题类型

  -- 反馈状态
  status VARCHAR(20) DEFAULT 'pending',       -- pending/resolved/closed
  reviewed_by UUID,
  resolved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. 索引优化
-- =============================================

-- 卡片表索引
CREATE INDEX IF NOT EXISTS idx_flashcards_type ON flashcards(type);
CREATE INDEX IF NOT EXISTS idx_flashcards_difficulty ON flashcards(difficulty);
CREATE INDEX IF NOT EXISTS idx_flashcards_status ON flashcards(status);
CREATE INDEX IF NOT EXISTS idx_flashcards_next_review ON flashcards(next_review_at);
CREATE INDEX IF NOT EXISTS idx_flashcards_created_at ON flashcards(created_at);

-- 复合索引优化查询
CREATE INDEX IF NOT EXISTS idx_flashcards_user_status ON user_progress(user_id, status);
CREATE INDEX IF NOT EXISTS idx_flashcards_review_type ON flashcard_reviews(user_id, flashcard_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_daily_stats ON daily_study_stats(user_id, study_date);

-- 全文搜索索引
CREATE INDEX IF NOT EXISTS idx_flashcards_search ON flashcards USING GIN(to_tsvector('english', title || ' ' || scenario));

-- 标签索引
CREATE INDEX IF NOT EXISTS idx_tags_name ON flashcard_tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_map_flashcard ON flashcard_tags_map(flashcard_id);
CREATE INDEX IF NOT EXISTS idx_tags_map_tag ON flashcard_tags_map(tag_id);

-- 用户学习记录索引
CREATE INDEX IF NOT EXISTS idx_study_sessions_user ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON study_sessions(session_start);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON flashcard_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_card ON flashcard_reviews(flashcard_id);
CREATE INDEX IF NOT EXISTS idx_reviews_session ON flashcard_reviews(study_session_id);

-- =============================================
-- 6. 示例数据插入
-- =============================================

-- 插入常用标签
INSERT INTO flashcard_tags (name, description, color) VALUES
  ('邮件写作', 'CELPIP写作Task 1相关卡片', '#3B82F6'),
  ('观点论证', 'CELPIP写作Task 2相关卡片', '#10B981'),
  ('口语描述', '口语Task 5描述类题目', '#F59E0B'),
  ('个人经历', '口语Task 1-2个人经历', '#EF4444'),
  ('听力技巧', '听力部分关键词和信号词', '#8B5CF6'),
  ('高分表达', 'CLB 8-9级高分表达', '#EC4899')
  ON CONFLICT (name) DO NOTHING;

-- 插入示例写作Task 1卡片
INSERT INTO flashcards (type, title, scenario, tone, difficulty, essential_phrases, upgrades, practice) VALUES
(
  'writing-task1',
  '向邻居投诉噪音问题',
  '邻居在夜间产生过多噪音，影响休息',
  'semi-formal',
  'clb8',
  '{
    "opening": [
      "I hope this message finds you well.",
      "I''m writing to discuss a matter that''s been concerning me.",
      "I would appreciate it if we could address this issue."
    ],
    "purpose": [
      "The main reason for my message is to address the noise issue.",
      "I wanted to bring to your attention the excessive noise during evenings.",
      "My concern is about the disturbance this is causing."
    ],
    "details": [
      "The noise typically starts around 10 PM and continues until midnight.",
      "It''s making it difficult for me to sleep and focus during work.",
      "I''ve noticed this has been happening for the past two weeks."
    ],
    "closing": [
      "I would be grateful if we could find a solution to this matter.",
      "Thank you for your understanding and cooperation.",
      "I look forward to your response."
    ]
  }',
  '{
    "vocabulary": {
      "noisy": ["excessive", "disturbing", "intrusive"],
      "problem": ["issue", "concern", "matter"],
      "make": ["cause", "result in", "lead to"],
      "stop": ["cease", "discontinue", "terminate"]
    },
    "structure": {
      "I''m worried about the noise.": "I''m deeply concerned about the excessive noise that has been occurring.",
      "Can you stop it?": "I would greatly appreciate it if you could take measures to reduce the noise levels."
    }
  }',
  '{
    "question": "Write an email to your neighbor about noise disturbance during evenings.",
    "keyPoints": ["specific times", "impact on you", "requested solution", "polite tone"]
  }'
);

-- 插入示例写作Task 2卡片
INSERT INTO flashcards (type, title, scenario, difficulty, essential_phrases, upgrades, practice) VALUES
(
  'writing-task2',
  '远程工作的优势',
  '讨论远程工作对员工和雇主的积极影响',
  'clb8',
  '{
    "introduction": [
      "The concept of remote work has revolutionized traditional employment patterns.",
      "Working from home presents numerous compelling advantages for both employees and employers.",
      "This essay will explore the multifaceted benefits of telecommuting arrangements."
    ],
    "topicSentence": [
      "One primary advantage of remote work is the significant enhancement of work-life balance.",
      "The flexibility inherent in home-based employment contributes substantially to job satisfaction.",
      "From a productivity perspective, remote work offers unparalleled advantages."
    ],
    "supporting": [
      "Employees gain the ability to structure their day according to personal productivity peaks.",
      "The elimination of commuting time translates into substantial work-life improvements.",
      "Family responsibilities can be managed more effectively alongside professional commitments."
    ],
    "examples": [
      "For instance, parents can attend to children''s needs without sacrificing work performance.",
      "A notable example is the increased time available for exercise and leisure activities.",
      "Studies have shown that remote workers report 25% higher satisfaction levels."
    ],
    "conclusion": [
      "In conclusion, the advantages of working from home extend beyond individual benefits.",
      "Therefore, organizations should consider implementing flexible work policies.",
      "Ultimately, remote work represents a paradigm shift in modern employment practices."
    ]
  }',
  '{
    "vocabulary": {
      "good": ["advantageous", "beneficial", " advantageous"],
      "important": ["crucial", "essential", "vital"],
      "many": ["numerous", "multiple", "abundant"]
    }
  }',
  '{
    "question": "What are the advantages of working from home?",
    "keyPoints": ["work-life balance", "productivity", "cost savings", "flexibility"]
  }'
);

-- 插入卡片标签关联
INSERT INTO flashcard_tags_map (flashcard_id, tag_id)
SELECT
  f.id,
  t.id
FROM flashcards f
CROSS JOIN flashcard_tags t
WHERE f.title IN ('向邻居投诉噪音问题', '远程工作的优势')
  AND t.name IN ('邮件写作', '观点论证');

-- =============================================
-- 7. 触发器函数
-- =============================================

-- 更新卡片最后复习时间
CREATE OR REPLACE FUNCTION update_flashcard_last_reviewed()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  IF NEW.next_review_at IS NOT NULL AND NEW.next_review_at <= NOW() THEN
    NEW.last_reviewed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER trg_flashcard_timestamps
  BEFORE UPDATE ON flashcards
  FOR EACH ROW
  EXECUTE FUNCTION update_flashcard_last_reviewed();

-- 更新用户进度统计
CREATE OR REPLACE FUNCTION update_user_progress_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE user_progress
    SET
      total_reviews = total_reviews + 1,
      last_accessed_at = NOW(),
      success_rate = (
        SELECT (COUNT(*) * 100.0 / NULLIF(COUNT(*), 0))
        FROM flashcard_reviews
        WHERE user_id = NEW.user_id
          AND flashcard_id = NEW.flashcard_id
          AND is_correct = true
      )
    WHERE user_id = NEW.user_id AND flashcard_id = NEW.flashcard_id;

    -- 更新每日统计
    INSERT INTO daily_study_stats (user_id, study_date, cards_reviewed)
    VALUES (NEW.user_id, DATE(NEW.review_time), 1)
    ON CONFLICT (user_id, study_date)
    DO UPDATE SET
      cards_reviewed = daily_study_stats.cards_reviewed + 1,
      review_time_minutes = daily_study_stats.review_time_minutes +
        COALESCE(NEW.time_taken_seconds, 0) / 60;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER trg_update_user_progress
  AFTER INSERT OR UPDATE ON flashcard_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_stats();

-- =============================================
-- 完成
-- =============================================

-- 输出表统计信息
DO $$
DECLARE
  table_count INTEGER;
  card_count INTEGER;
  tag_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name LIKE 'flashcard%';

  SELECT COUNT(*) INTO card_count FROM flashcards;
  SELECT COUNT(*) INTO tag_count FROM flashcard_tags;

  RAISE NOTICE 'Flashcards database schema created successfully!';
  RAISE NOTICE 'Tables created: %', table_count;
  RAISE NOTICE 'Sample cards inserted: %', card_count;
  RAISE NOTICE 'Tags created: %', tag_count;
END $$;