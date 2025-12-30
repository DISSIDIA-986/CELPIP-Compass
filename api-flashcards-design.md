# CELPIP Compass Flashcards API Design
## 点句卡片系统API设计文档

**版本:** 1.0
**日期:** 2025年12月29日
**状态:** Ready for Implementation
**API Version:** v1

---

## 📋 API设计原则

### 1. RESTful设计规范
- 使用标准HTTP方法 (GET, POST, PUT, DELETE)
- 资源导向的URL结构
- 统一的响应格式
- 状态码语义化

### 2. 认证与授权
- JWT Bearer Token (Authorization: Bearer <token>)
- Refresh Token机制
- 基于角色的访问控制 (RBAC)

### 3. 数据格式
- 请求/响应统一使用JSON
- 时间格式使用ISO 8601
- 分页使用标准limit/offset
- 搜索使用query参数

### 4. 错误处理
- 标准化错误响应
- 详细的错误信息
- HTTP状态码映射
- 验证错误详情

---

## 🔐 认证相关API

### 用户注册
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "clbSelfAssessment": {
    "listening": 7.0,
    "speaking": 7.0,
    "reading": 7.0,
    "writing": 7.0
  }
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "currentLevel": 7.0,
      "targetLevel": 8.0
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "refresh-token"
    }
  }
}
```

### 用户登录
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

---

## 📚 卡片管理API

### 获取卡片列表
```http
GET /api/v1/cards?type=writing-task1&difficulty=clb8&status=learning&limit=20&offset=0
Authorization: Bearer <token>
```

**查询参数:**
- `type`: 卡片类型 (writing-task1, writing-task2, speaking-task, listening-keyword)
- `difficulty`: 难度级别 (clb7, clb8, clb9)
- `status`: 学习状态 (new, learning, review, mastered, archived)
- `tags`: 标签过滤 (逗号分隔)
- `isDueForReview`: 是否到期复习 (true/false)
- `search`: 搜索关键词
- `limit`: 返回数量 (默认20，最大100)
- `offset`: 偏移量 (默认0)

**响应:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "type": "writing-task1",
        "title": "向邻居投诉噪音问题",
        "scenario": "邻居在夜间产生过多噪音，影响休息",
        "tone": "semi-formal",
        "difficulty": "clb8",
        "status": "learning",
        "essentialPhrases": {
          "opening": ["I hope this message finds you well.", ...],
          "purpose": ["The main reason for my message is...", ...],
          "details": ["The noise typically starts around...", ...],
          "closing": ["I would be grateful if we could...", ...]
        },
        "upgrades": {
          "vocabulary": {
            "noisy": ["excessive", "disturbing", "intrusive"]
          }
        },
        "practice": {
          "question": "Write an email to your neighbor about noise disturbance...",
          "keyPoints": ["specific times", "impact on you", ...]
        },
        "reviewCount": 3,
        "correctCount": 2,
        "averageQualityScore": 4.2,
        "nextReviewAt": "2025-12-31T10:00:00Z",
        "createdAt": "2025-12-29T00:00:00Z",
        "updatedAt": "2025-12-29T00:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 20,
    "totalPages": 3
  }
}
```

### 获取单个卡片详情
```http
GET /api/v1/cards/{id}
Authorization: Bearer <token>
```

**响应:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "writing-task1",
    "title": "向邻居投诉噪音问题",
    "scenario": "邻居在夜间产生过多噪音，影响休息",
    "tone": "semi-formal",
    "difficulty": "clb8",
    "status": "learning",
    "essentialPhrases": {
      "opening": [
        "I hope this message finds you well.",
        "I'm writing to discuss a matter that's been concerning me.",
        "I would appreciate it if we could address this issue."
      ],
      "purpose": [
        "The main reason for my message is to address the noise issue.",
        "I wanted to bring to your attention the excessive noise during evenings.",
        "My concern is about the disturbance this is causing."
      ],
      "details": [
        "The noise typically starts around 10 PM and continues until midnight.",
        "It's making it difficult for me to sleep and focus during work.",
        "I've noticed this has been happening for the past two weeks."
      ],
      "closing": [
        "I would be grateful if we could find a solution to this matter.",
        "Thank you for your understanding and cooperation.",
        "I look forward to your response."
      ]
    },
    "upgrades": {
      "vocabulary": {
        "noisy": ["excessive", "disturbing", "intrusive"],
        "problem": ["issue", "concern", "matter"],
        "make": ["cause", "result in", "lead to"]
      },
      "structure": {
        "I'm worried about the noise.": "I'm deeply concerned about the excessive noise that has been occurring.",
        "Can you stop it?": "I would greatly appreciate it if you could take measures to reduce the noise levels."
      }
    },
    "practice": {
      "question": "Write an email to your neighbor about noise disturbance during evenings.",
      "keyPoints": ["specific times", "impact on you", "requested solution", "polite tone"]
    },
    "metadata": {
      "ease": 2.5,
      "interval": 3,
      "repetitions": 2,
      "dueDate": "2025-12-31T10:00:00Z"
    },
    "reviewCount": 3,
    "correctCount": 2,
    "averageQualityScore": 4.2,
    "totalStudyTime": 450,
    "lastReviewedAt": "2025-12-29T00:00:00Z",
    "nextReviewAt": "2025-12-31T10:00:00Z",
    "tags": ["邮件写作", "高分表达"],
    "createdAt": "2025-12-29T00:00:00Z",
    "updatedAt": "2025-12-29T00:00:00Z"
  }
}
```

### 创建自定义卡片
```http
POST /api/v1/cards
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "自定义邮件写作",
  "type": "writing-task1",
  "scenario": "自定义场景描述",
  "tone": "formal",
  "difficulty": "clb8",
  "essentialPhrases": {
    "opening": ["自定义开场白"],
    "purpose": ["自定义目的"],
    "details": ["自定义细节"],
    "closing": ["自定义结束语"]
  },
  "upgrades": {
    "vocabulary": {
      "good": ["excellent", "outstanding"]
    }
  },
  "practice": {
    "question": "自定义练习题目",
    "keyPoints": ["要点1", "要点2"]
  },
  "tags": ["自定义", "邮件"]
}
```

### 更新卡片状态
```http
PUT /api/v1/cards/{id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "mastered"
}
```

### 删除卡片
```http
DELETE /api/v1/cards/{id}
Authorization: Bearer <token>
```

---

## 🔄 间隔重复API

### 记录复习
```http
POST /api/v1/cards/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "cardId": "uuid",
  "studySessionId": "uuid",
  "scores": {
    "accuracy": 4,
    "fluency": 3,
    "completeness": 4,
    "pronunciation": 4,
    "structure": 5
  },
  "timeTakenSeconds": 120,
  "userNotes": "今天记得比较牢固",
  "isCorrect": true
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "reviewId": "uuid",
    "cardId": "uuid",
    "nextReviewAt": "2025-12-31T10:00:00Z",
    "interval": 5,
    "repetitions": 3,
    "ease": 2.55,
    "stats": {
      "totalReviews": 3,
      "successRate": 85.7,
      "averageQuality": 4.0,
      "averageResponseTime": 115
    }
  }
}
```

### 获取复习计划
```http
GET /api/v1/cards/schedule?limit=50
Authorization: Bearer <token>
```

**查询参数:**
- `limit`: 返回数量 (默认50)
- `includeNew`: 是否包含新卡片 (默认false)

**响应:**
```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "cardId": "uuid",
        "type": "writing-task1",
        "title": "向邻居投诉噪音问题",
        "reviewType": "review", // review 或 new
        "dueDate": "2025-12-29T10:00:00Z",
        "priority": 1,
        "streakCount": 2
      }
    ],
    "summary": {
      "dueToday": 10,
      "dueTomorrow": 8,
      "newAvailable": 5,
      "totalPending": 23
    }
  }
}
```

### 重置卡片进度
```http
POST /api/v1/cards/{id}/reset
Authorization: Bearer <token>
```

---

## 🏷️ 标签管理API

### 获取标签列表
```http
GET /api/v1/tags
Authorization: Bearer <token>
```

**响应:**
```json
{
  "success": true,
  "data": {
    "tags": [
      {
        "id": "uuid",
        "name": "邮件写作",
        "description": "CELPIP写作Task 1相关卡片",
        "color": "#3B82F6",
        "usageCount": 25,
        "createdAt": "2025-12-29T00:00:00Z"
      }
    ]
  }
}
```

### 添加标签到卡片
```http
POST /api/v1/cards/{id}/tags
Authorization: Bearer <token>
Content-Type: application/json

{
  "tagIds": ["uuid1", "uuid2"]
}
```

### 从卡片移除标签
```http
DELETE /api/v1/cards/{id}/tags/{tagId}
Authorization: Bearer <token>
```

---

## 📊 学习进度API

### 获取用户学习进度
```http
GET /api/v1/progress/cards
Authorization: Bearer <token>
```

**响应:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalCards": 100,
      "newCards": 20,
      "learningCards": 30,
      "reviewCards": 25,
      "masteredCards": 25,
      "todayReviews": 5,
      "studyStreak": 7,
      "accuracyRate": 82.5,
      "averageStudyTime": 15.2
    },
    "byType": {
      "writing-task1": {"total": 30, "mastered": 10, "accuracy": 85.0},
      "writing-task2": {"total": 25, "mastered": 8, "accuracy": 78.0},
      "speaking-task": {"total": 30, "mastered": 5, "accuracy": 80.0},
      "listening-keyword": {"total": 15, "mastered": 2, "accuracy": 75.0}
    },
    "byDifficulty": {
      "clb7": {"total": 40, "mastered": 15, "accuracy": 88.0},
      "clb8": {"total": 35, "mastered": 8, "accuracy": 80.0},
      "clb9": {"total": 25, "mastered": 2, "accuracy": 70.0}
    }
  }
}
```

### 获取卡片学习进度
```http
GET /api/v1/progress/cards/{cardId}
Authorization: Bearer <token>
```

**响应:**
```json
{
  "success": true,
  "data": {
    "progress": {
      "cardId": "uuid",
      "status": "learning",
      "currentStep": 3,
      "completedSteps": 2,
      "totalSteps": 5,
      "progressPercentage": 40.0,
      "streakDays": 3,
      "totalReviews": 8,
      "successRate": 87.5,
      "averageResponseTime": 125.5,
      "lastAccessedAt": "2025-12-29T00:00:00Z",
      "firstAccessedAt": "2025-12-27T00:00:00Z"
    },
    "recentReviews": [
      {
        "reviewId": "uuid",
        "reviewDate": "2025-12-29T00:00:00Z",
        "quality": 4,
        "timeTakenSeconds": 120,
        "isCorrect": true
      }
    ]
  }
}
```

### 记录学习会话
```http
POST /api/v1/progress/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionStart": "2025-12-29T10:00:00Z",
  "sessionEnd": "2025-12-29T10:25:00Z",
  "cardsReviewed": 5,
  "accuracyRate": 80.0
}
```

---

## 📈 统计分析API

### 获取学习报告
```http
GET /api/v1/analytics/report?period=last-week
Authorization: Bearer <token>
```

**查询参数:**
- `period`: 时间周期 (today, yesterday, last-week, last-month, custom)
- `startDate`: 自定义开始日期 (YYYY-MM-DD)
- `endDate`: 自定义结束日期 (YYYY-MM-DD)

**响应:**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2025-12-22T00:00:00Z",
      "end": "2025-12-29T00:00:00Z"
    },
    "summary": {
      "totalStudyTime": 1245, // 秒
      "cardsReviewed": 48,
      "newCardsLearned": 15,
      "accuracyRate": 82.5,
      "improvedAreas": ["writing-task1", "speaking-task"],
      "weakAreas": ["listening-keyword"]
    },
    "dailyStats": [
      {
        "date": "2025-12-22",
        "studyTimeMinutes": 20,
        "cardsReviewed": 8,
        "accuracyRate": 85.0
      }
    ],
    "progressByType": {
      "writing-task1": {
        "reviewed": 15,
        "mastered": 5,
        "accuracy": 85.0
      },
      "writing-task2": {
        "reviewed": 12,
        "mastered": 3,
        "accuracy": 80.0
      }
    },
    "recommendations": [
      "建议加强听力关键词练习，准确率偏低",
      "写作Task 1掌握良好，可以尝试更高难度"
    ],
    "generatedAt": "2025-12-29T00:00:00Z"
  }
}
```

### 获取记忆保持率分析
```http
GET /api/v1/analytics/retention
Authorization: Bearer <token>
```

**响应:**
```json
{
  "success": true,
  "data": {
    "retentionRates": {
      "1_day": 95.2,
      "3_days": 88.7,
      "7_days": 82.4,
      "14_days": 76.8,
      "30_days": 71.2
    },
    "comparedToAverage": {
      "better": true,
      "difference": 5.3
    }
  }
}
```

### 获取学习效果趋势
```http
GET /api/v1/analytics/trends?days=30
Authorization: Bearer <token>
```

---

## ❤️ 收藏管理API

### 添加卡片到收藏
```http
POST /api/v1/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "cardId": "uuid",
  "notes": "这个句型很有用"
}
```

### 获取收藏列表
```http
GET /api/v1/favorites?limit=20&offset=0
Authorization: Bearer <token>
```

### 移除收藏
```http
DELETE /api/v1/favorites/{favoriteId}
Authorization: Bearer <token>
```

---

## ⚡ 批量操作API

### 批量复习
```http
POST /api/v1/cards/review/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviews": [
    {
      "cardId": "uuid1",
      "scores": {"accuracy": 4, "fluency": 4, "completeness": 4},
      "timeTakenSeconds": 90
    },
    {
      "cardId": "uuid2",
      "scores": {"accuracy": 3, "fluency": 3, "completeness": 3},
      "timeTakenSeconds": 150
    }
  ]
}
```

### 批量更新状态
```http
PUT /api/v1/cards/batch/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "cardIds": ["uuid1", "uuid2", "uuid3"],
  "status": "mastered"
}
```

---

## 🔍 搜索API

### 卡片内容搜索
```http
GET /api/v1/cards/search?q=neighbor+noise&type=writing-task1&limit=10
Authorization: Bearer <token>
```

**查询参数:**
- `q`: 搜索关键词
- `type`: 卡片类型过滤
- `difficulty`: 难度过滤
- `tags`: 标签过滤
- `limit`: 结果数量限制

---

## 🔄 Webhook支持

### 卡片状态变更Webhook
```http
POST /api/v1/webhooks/card-status
Authorization: Bearer <token>

{
  "event": "card_mastered",
  "data": {
    "cardId": "uuid",
    "userId": "uuid",
    "previousStatus": "learning",
    "newStatus": "mastered",
    "timestamp": "2025-12-29T00:00:00Z"
  }
}
```

---

## 📝 错误响应格式

### 标准错误响应
```json
{
  "success": false,
  "error": {
    "code": "CARD_NOT_FOUND",
    "message": "Card not found",
    "details": "The requested card does not exist or has been deleted"
  }
}
```

### 验证错误响应
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "scores": {
        "accuracy": "must be between 0 and 5"
      }
    }
  }
}
```

### 认证错误响应
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

---

## 📊 API性能指标

- **响应时间**: < 200ms (95% of requests)
- **并发支持**: 1000+ concurrent requests
- **数据限制**:
  - List APIs: max 100 items per page
  - File uploads: max 10MB
- **缓存策略**:
  - Static data: 1 hour cache
  - User data: no cache
- **Rate Limiting**:
  - Authentication: 5 requests per minute
  - API endpoints: 100 requests per minute

---

**CELPIP Compass Flashcards API Design v1.0**
**Ready for Implementation**