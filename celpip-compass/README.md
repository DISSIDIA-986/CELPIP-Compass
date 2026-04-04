# CELPIP Compass

CELPIP 考试备考间隔重复学习系统，帮助考生高效掌握考试策略。

## 功能

- **41 张策略闪卡** — 按 Writing/Reading/Listening/Speaking 分类，聚焦考试技巧而非语言学习
- **SM2 间隔重复** — 自动安排复习间隔，优化记忆效果
- **攻略课程** — 3 份精简课程文档（2周冲刺方案、策略速查手册、资源精选库）
- **策展链接** — 每张卡片关联高质量社媒攻略（YouTube、知乎等）
- **21 张视觉资产** — 策略信息图、小红书风格卡片、知识漫画、课程封面

## 技术栈

- **前端**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **数据库**: PostgreSQL (Neon) + Prisma ORM
- **部署**: Vercel（自动部署）
- **Markdown 渲染**: react-markdown + remark-gfm

## 开发

```bash
cd celpip-compass
npm install
npm run dev        # http://localhost:3000
```

## 路由

| 路由 | 说明 |
|------|------|
| `/` | 学习中心（闪卡复习、学习进度、卡片库） |
| `/courses` | 攻略课程列表 |
| `/courses/[slug]` | 课程详情（Markdown 渲染） |
| `/api/v1/cards` | 闪卡 API |
| `/api/v1/data/sample-cards` | 样本数据 API |

## 项目结构

```
celpip-compass/
├── app/                  # Next.js App Router
│   ├── courses/          # 攻略课程页面
│   ├── api/v1/           # REST API
│   └── page.tsx          # 首页（学习中心）
├── components/           # React 组件
│   ├── Cards/            # 闪卡组件（含 curatedLinks 渲染）
│   └── MarkdownViewer.tsx # Markdown 渲染器（Server Component）
├── data/
│   ├── sample-cards.ts   # 41 张策略闪卡 + 社媒链接
│   └── courses/          # Markdown 课程文件
├── lib/courses.ts        # 课程数据加载
├── services/             # 业务逻辑（SM2 算法、数据服务）
├── types/flashcards.ts   # 类型定义（含 CuratedLink、READING 枚举）
├── public/images/        # 21 张视觉资产
└── prisma/               # 数据库 schema
```
