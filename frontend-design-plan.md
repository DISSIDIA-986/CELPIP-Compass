# CELPIP Compass 前端UI设计方案
## Frontend UI Design Plan

**版本:** 1.0
**设计日期:** 2025年12月29日
**设计工具:** Figma (待创建) + Tailwind CSS

---

## 🎨 设计理念

### 核心原则
1. **简洁直观** - 降低学习成本，专注内容
2. **激励性** - 通过进度和成就激励用户
3. **专业性** - 体现教育产品的权威感
4. **个性化** - 根据用户特征动态展示内容

### 色彩系统
```css
主色调:
- Primary: #2563eb (Celipi Blue - 代表专业和信任)
- Secondary: #10b981 (Success Green - 代表进步和成长)
- Accent: #f59e0b (Warning Orange - 代表重要提醒)

背景色:
- Primary BG: #ffffff (白色)
- Secondary BG: #f8fafc (浅灰)
- Card BG: #ffffff (卡片背景)

文字色:
- Primary Text: #1f2937 (深灰)
- Secondary Text: #6b7280 (中灰)
- Disabled Text: #9ca3af (浅灰)
```

### 字体系统
```css
英文字体:
- Inter (主要) - 现代简洁，可读性强
- Arial (备用) - 系统默认字体

中文字体:
- PingFang SC (macOS)
- Microsoft YaHei (Windows)
- San Francisco (移动端)

字体大小:
- 标题: text-2xl (24px) - text-4xl (36px)
- 正文: text-base (16px) - text-lg (18px)
- 说明: text-sm (14px) - text-xs (12px)
```

---

## 📱 页面设计

### 1. 首页 Dashboard

#### 布局结构 (桌面端)
```
┌─────────────────────────────────────────────────────┐
│ 顶部导航栏 (用户头像 + 通知 + 学习时长)              │
├──────────────────┬─────────────────────────────────┤
│                  │                                 │
│  侧边栏          │     主内容区                   │
│  (固定宽度)      │                                 │
│                  │                                 │
│ • 学习概览       │  欢迎区域 + 今日任务            │
│ • 资源库         │  学习进度图表                   │
│ • 学习路径       │  推荐资源                       │
│ • 社区           │  最近活动                       │
│ • 设置           │                                 │
└──────────────────┴─────────────────────────────────┘
```

#### 响应式设计
- **桌面端:** 侧边栏 + 主内容区
- **平板端:** 底部导航 + 主内容区
- **手机端:** 顶部标签页 + 主内容区

#### 关键组件设计

**1. 欢迎区域**
```jsx
<div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
  <h1 className="text-3xl font-bold mb-2">早上好，张明！</h1>
  <p className="text-blue-100 mb-4">今天是您学习的第 28 天</p>
  <div className="flex items-center space-x-4">
    <div className="bg-white/20 rounded-lg p-3">
      <p className="text-sm">目标进度</p>
      <p className="text-2xl font-bold">75%</p>
    </div>
    <div className="bg-white/20 rounded-lg p-3">
      <p className="text-sm">预计考试</p>
      <p className="text-2xl font-bold">45天</p>
    </div>
  </div>
</div>
```

**2. 今日任务卡片**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <TaskCard
    title="听力练习"
    description="完成CELPIP听力Part 3-4"
    duration="30分钟"
    progress={60}
    icon="🎧"
    priority="high"
  />
  <TaskCard
    title="口语练习"
    description="Task 5: Describing a Picture"
    duration="20分钟"
    progress={0}
    icon="🗣️"
    priority="medium"
  />
  <TaskCard
    title="词汇复习"
    description="复习Unit 7高频词汇"
    duration="15分钟"
    progress={100}
    icon="📚"
    priority="low"
  />
</div>
```

**3. 学习进度图表**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-4">学习进度</h3>
  <div className="space-y-4">
    <ProgressBar
      label="听力"
      progress={75}
      target={90}
      color="bg-blue-500"
    />
    <ProgressBar
      label="口语"
      progress={60}
      target={85}
      color="bg-green-500"
    />
    <ProgressBar
      label="阅读"
      progress={80}
      target={80}
      color="bg-purple-500"
    />
    <ProgressBar
      label="写作"
      progress={70}
      target={90}
      color="bg-orange-500"
    />
  </div>
</div>
```

**4. 推荐资源**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">推荐资源</h3>
    <button className="text-blue-500 text-sm">查看全部</button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ResourceCard
      title="CELPIP听力完整指南"
      instructor="HZad Education"
      duration="50分钟"
      rating={4.8}
      thumbnail="/images/listening-thumb.jpg"
      type="video"
    />
    <ResourceCard
      title="写作Task 2高分技巧"
      instructor="ILAC"
      duration="30分钟"
      rating={4.6}
      thumbnail="/images/writing-thumb.jpg"
      type="article"
    />
  </div>
</div>
```

### 2. 学习路径页面

#### 布局结构
```
┌─────────────────────────────────────────────────────┐
│ 顶部导航栏                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  学习路径时间轴                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ Week 1  │  │ Week 2  │  │ Week 3  │ → ...      │
│  │ (完成)  │  │ (进行中)│  │ (未开始)│           │
│  └─────────┘  └─────────┘  └─────────┘           │
│                                                     │
│  详细任务列表                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │ ☑️ 听力基础练习 (完成)                          │ │
│  │ ☑️ 口音适应训练 (完成)                          │ │
│  │ ☑️ 词汇量测试 (完成)                           │ │
│  │ 🟡 阅读技巧训练 (进行中 - 60%)                 │ │
│  │ ⬜ 写作Task 1 (未开始)                          │ │
│  │ ⬜ 口语模拟测试 (未开始)                        │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  学习日历                                          │
│  [日历视图显示学习计划和任务]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 关键组件设计

**1. 路径时间轴**
```jsx
<div className="flex space-x-4 overflow-x-auto pb-4">
  {weeks.map((week) => (
    <WeekCard
      key={week.id}
      week={week.number}
      title={`Week ${week.number}`}
      status={week.status}
      progress={week.progress}
      duration={week.duration}
      onClick={() => selectWeek(week.id)}
    />
  ))}
</div>
```

**2. 任务详情面板**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-semibold">Week 2 学习任务</h3>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">完成度</span>
      <span className="text-2xl font-bold text-blue-600">60%</span>
    </div>
  </div>

  <TaskList>
    <TaskItem
      title="CELPIP听力Part 1-2训练"
      description="练习日常对话理解技巧"
      duration="45分钟"
      completed={true}
      resources={[
        { type: 'video', title: '听力基础指南', instructor: 'HZad' },
        { type: 'practice', title: '模拟练习题', count: 10 }
      ]}
    />
    <TaskItem
      title="口语Task 2练习"
      description="描述个人经历和感受"
      duration="30分钟"
      completed={false}
      inProgress={true}
      resources={[
        { type: 'video', title: '口语技巧', instructor: 'Mad English TV' }
      ]}
    />
  </TaskList>
</div>
```

**3. 学习日历**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <Calendar
    selectedDate={selectedDate}
    onDateSelect={handleDateSelect}
    tasks={calendarTasks}
    renderDay={(date) => (
      <DayComponent
        date={date}
        hasTasks={hasTasksOnDate(date)}
        completed={isDateCompleted(date)}
      />
    )}
  />
</div>
```

### 3. 资源库页面

#### 布局结构
```
┌─────────────────────────────────────────────────────┐
│ 顶部导航栏 + 搜索框                                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  分类筛选栏                                        │
│  [科目▼] [难度▼] [类型▼] [时间▼]                   │
│                                                     │
│  资源网格/列表切换                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ 资源卡片1     │  │ 资源卡片2    │  │ 资源卡片3  │ │
│  │ 🎧 听力      │  │ 📝 写作     │  │ 🗣️ 口语    │ │
│  │ HZad        │  │ ILAC       │  │ 叶老师     │ │
│  │ 50分钟      │  │ 30分钟      │  │ 45分钟     │ │
│  │ 4.8⭐       │  │ 4.6⭐       │  │ 4.9⭐      │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ 资源卡片4     │  │ 资源卡片5    │  │ 资源卡片6  │ │
│  │ 📚 阅读      │  │ 🎬 视频     │  │ 📖 文章    │ │
│  │ 官方        │  │ Mad English │  │ E2Language │ │
│  │ 60分钟      │  │ 40分钟      │  │ 25分钟     │ │
│  │ 5.0⭐       │  │ 4.7⭐       │  │ 4.5⭐      │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
│                                                     │
│  收藏夹/历史记录标签页                             │
│  [全部] [收藏] [历史] [下载]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 关键组件设计

**1. 资源卡片**
```jsx
<ResourceCard
  title="CELPIP听力Part 3实战训练"
  instructor="HZad Education"
  duration="50分钟"
  rating={4.8}
  views="125K"
  thumbnail="/images/listening-part3.jpg"
  type="video"
  difficulty="CLB 8"
  tags={["听力", "实战", "技巧"]}
  onPlay={handlePlay}
  onFavorite={handleFavorite}
  favorited={false}
/>
```

**2. 筛选器**
```jsx
<div className="flex flex-wrap gap-2 mb-6">
  <FilterButton
    label="科目"
    options={["全部", "听力", "口语", "阅读", "写作"]}
    selected="全部"
    onChange={handleFilterChange}
  />
  <FilterButton
    label="难度"
    options={["CLB 7", "CLB 8", "CLB 9"]}
    selected="CLB 7"
    onChange={handleFilterChange}
  />
  <FilterButton
    label="类型"
    options={["全部", "视频", "文章", "练习"]}
    selected="全部"
    onChange={handleFilterChange}
  />
  <FilterButton
    label="时长"
    options={["全部", "<30分钟", "30-60分钟", ">60分钟"]}
    selected="全部"
    onChange={handleFilterChange}
  />
</div>
```

**3. 资源详情模态框**
```jsx
<Modal isOpen={showResourceDetail} onClose={closeModal}>
  <div className="bg-white rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
    <VideoPlayer
      src={selectedResource.videoUrl}
      title={selectedResource.title}
      thumbnail={selectedResource.thumbnail}
    />
    <ResourceInfo
      title={selectedResource.title}
      instructor={selectedResource.instructor}
      description={selectedResource.description}
      outline={selectedResource.outline}
      duration={selectedResource.duration}
      rating={selectedResource.rating}
      tags={selectedResource.tags}
    />
    <ResourceActions
      onPlay={handlePlay}
      onDownload={handleDownload}
      onShare={handleShare}
      onFavorite={handleFavorite}
    />
  </div>
</Modal>
```

### 4. 用户个人中心

#### 布局结构
```
┌─────────────────────────────────────────────────────┐
│ 顶部导航栏                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  用户信息区域                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │ [头像] 张明                                      │ │
│  │ 目标分数: CLB 8                                │ │
│  │ 当前水平: CLB 7.2                              │ │
│  │ 学习天数: 28天                                 │ │
│  │ 总学习时长: 45小时                             │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  学习统计                                          │
│  ┌─────────────────────────────────────────────────┐ │
│  │ 📊 本周学习: 12小时 (比上周+20%)                │ │
│  │ 🎯 完成任务: 45/60                              │ │
│  │ 📈 进步趋势: ↗️ CLB 7.0 → 7.2                  │ │
│  │ 🏆 获得成就: 连续学习7天                       │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  设置选项                                           │
│  ┌─────────────────────────────────────────────────┐ │
│  │ 个人信息                                        │ │
│  │ 学习偏好                                        │ │
│  ├─────────────────────────────────────────────────┤ │
│  │ 通知设置                                        │ │
│  │ 隐私设置                                        │ │
│  ├─────────────────────────────────────────────────┤ │
│  │ 账户管理                                        │ │
│  │ 修改密码                                        │ │
│  ├─────────────────────────────────────────────────┤ │
│  │ 帮助与反馈                                      │ │
│  │ 关于我们                                        │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 关键组件设计

**1. 学习统计图表**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-4">学习统计</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <StatCard
      title="本周学习"
      value="12小时"
      change="+20%"
      icon="📊"
      positive={true}
    />
    <StatCard
      title="完成任务"
      value="45/60"
      change="75%"
      icon="🎯"
      positive={true}
    />
    <StatCard
      title="当前水平"
      value="CLB 7.2"
      change="+0.2"
      icon="📈"
      positive={true}
    />
    <StatCard
      title="连续天数"
      value="7天"
      change="🔥"
      icon="🏆"
      positive={true}
    />
  </div>
  <ProgressChart
    type="weekly"
    data={weeklyData}
    onPeriodChange={handlePeriodChange}
  />
</div>
```

**2. 成就展示**
```jsx
<div className="bg-white rounded-xl p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-4">我的成就</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <AchievementBadge
      icon="🔥"
      title="连续学习"
      level="7天"
      unlocked={true}
      progress={7}
      max={30}
    />
    <AchievementBadge
      icon="📚"
      title="学习达人"
      level="50小时"
      unlocked={true}
      progress={45}
      max={50}
    />
    <AchievementBadge
      icon="🎯"
      title="任务大师"
      level="100任务"
      unlocked={false}
      progress={45}
      max={100}
    />
    <AchievementBadge
      icon="⭐"
      title="高分学员"
      title="CLB 8"
      unlocked={false}
      progress={7.2}
      max={8.0}
    />
  </div>
</div>
```

### 5. CLB自评估页面

#### 布局结构
```
┌─────────────────────────────────────────────────────┐
│ 顶部导航栏                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  评估进度指示器                                     │
│  第3步/共4步 (听力评估)                             │
│  [进度条]                                          │
│                                                     │
│  评估内容区域                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │ 🎧 听力能力自评估                                │ │
│  │                                                 │ │
│  │ 请根据您的实际能力选择最符合的描述：              │ │
│  │                                                 │ │
│  │ Question 1: 理解日常对话                        │ │
│  │ ☐ CLB 7: 能理解简单日常对话                     │ │
│  │ ☐ CLB 8: 能理解复杂日常对话                     │ │
│  │ ☐ CLB 9: 能理解专业讨论                         │ │
│  │                                                 │ │
│  │ [上一题] [下一题]                               │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  评估结果预览                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │ 当前得分预测:                                   │ │
│  │ 听力: CLB 7.5                                   │ │
│  │ 口语: CLB 6.8                                   │ │
│  │ 阅读: CLB 7.2                                   │ │
│  │ 写作: CLB 6.5                                   │ │
│  │                                                 │ │
│  │ [查看详细分析]                                  │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 关键组件设计

**1. 进度指示器**
```jsx
<div className="mb-8">
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm text-gray-600">评估进度</span>
    <span className="text-sm text-gray-600">3/4</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: '75%' }}
    />
  </div>
  <div className="flex justify-between mt-2">
    <span className="text-xs text-gray-500">听力</span>
    <span className="text-xs text-gray-500">口语</span>
    <span className="text-xs text-gray-500">阅读</span>
    <span className="text-xs text-gray-500">写作</span>
  </div>
</div>
```

**2. 评估题目**
```jsx
<div className="bg-white rounded-xl p-8 shadow-sm">
  <QuestionCard
    question="在正式场合，您能理解多长的演讲内容？"
    type="radio"
    options={[
      {
        value: "clb7",
        label: "CLB 7: 能理解5-10分钟的简单演讲",
        description: "语速较慢，话题熟悉"
      },
      {
        value: "clb8",
        label: "CLB 8: 能理解15-20分钟的复杂演讲",
        description: "语速正常，话题广泛"
      },
      {
        value: "clb9",
        label: "CLB 9: 能理解30分钟以上的专业演讲",
        description: "语速快，话题专业"
      }
    ]}
    selected={selectedOption}
    onChange={handleOptionChange}
  />
  <div className="flex justify-between mt-8">
    <button
      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      disabled={!canGoBack}
      onClick={handleBack}
    >
      上一题
    </button>
    <button
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      disabled={!canGoNext}
      onClick={handleNext}
    >
      下一题
    </button>
  </div>
</div>
```

---

## 📐 响应式设计规范

### 断点定义
```css
/* Tailwind CSS 断点 */
xs: 0px - 480px   (手机竖屏)
sm: 481px - 768px (手机横屏/小平板)
md: 769px - 1024px (平板)
lg: 1025px - 1440px (小桌面)
xl: 1441px+        (大桌面)
```

### 响应式组件示例

**1. 响应式网格**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 卡片内容 -->
</div>
```

**2. 响应式导航**
```jsx
{/* 桌面端 */}
<nav className="hidden lg:flex space-x-6">
  <a href="#" className="nav-link">首页</a>
  <a href="#" className="nav-link">学习路径</a>
  <a href="#" className="nav-link">资源库</a>
</nav>

{/* 移动端 */}
<nav className="lg:hidden">
  <div className="flex justify-around border-t">
    <a href="#" className="nav-link-mobile">🏠</a>
    <a href="#" className="nav-link-mobile">📚</a>
    <a href="#" className="nav-link-mobile">📊</a>
  </div>
</nav>
```

**3. 响应式侧边栏**
```jsx
<div className="hidden lg:block lg:w-64 lg:mr-6">
  <!-- 侧边栏内容 -->
</div>
```

---

## 🎯 交互设计

### 1. 动画效果
```css
/* 平滑过渡 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 悬停效果 */
.hover-scale:hover {
  transform: scale(1.05);
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 2. 微交互
- **按钮点击**: 轻微缩放效果
- **卡片悬浮**: 阴影加深 + 微上移
- **进度条**: 平滑的宽度动画
- **加载状态**: 骨架屏或旋转图标

### 3. 反馈机制
- **操作成功**: ✅ 绿色提示 + 淡出动画
- **操作失败**: ❌ 红色提示 + 重试按钮
- **加载中**: ⏳ 进度指示器
- **空状态**: 📝 友好提示 + 操作引导

---

## 🔧 技术实现规范

### 1. 组件库结构
```
frontend/src/
├── components/
│   ├── ui/                 # 基础UI组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/            # 布局组件
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── features/          # 功能组件
│   │   ├── Dashboard/
│   │   ├── LearningPath/
│   │   ├── ResourceLibrary/
│   │   └── Profile/
│   └── hooks/             # 自定义Hooks
│       ├── useAuth.ts
│       ├── useProgress.ts
│       └── useResources.ts
```

### 2. 状态管理
```typescript
// 使用Zustand进行状态管理
interface Store {
  user: User | null;
  progress: Progress;
  resources: Resource[];
  settings: Settings;

  // Actions
  setUser: (user: User) => void;
  updateProgress: (progress: Progress) => void;
  setResources: (resources: Resource[]) => void;
}

const useStore = create<Store>(...);
```

### 3. 数据获取
```typescript
// 使用TanStack Query进行数据获取
const { data: resources, isLoading } = useQuery({
  queryKey: ['resources', filters],
  queryFn: () => fetchResources(filters),
  staleTime: 5 * 60 * 1000, // 5分钟
});

const { mutate: updateProgress } = useMutation({
  mutationFn: (progress: Progress) => updateProgressAPI(progress),
  onSuccess: () => {
    queryClient.invalidateQueries(['progress']);
  },
});
```

---

## 📋 设计资源

### 1. 图标库
- **Heroicons** (主要图标库)
- **Material Icons** (补充图标)
- **自定义SVG** (品牌相关)

### 2. 图片资源
- **占位图片**: 使用unsplash的教育类图片
- **缩略图**: 统一尺寸 (16:9)
- **用户头像**: 支持上传和裁剪

### 3. 字体优化
- **字体加载**: font-display: swap
- **字体预加载**: 预加载关键字体文件
- **字体压缩**: 使用subset减少文件大小

---

## 🎯 下一步行动

### 1. 设计验证
- [ ] 创建Figma高保真原型
- [ ] 用户测试和反馈收集
- [ ] 设计系统建立

### 2. 开发实施
- [ ] 搭建Next.js + Tailwind CSS框架
- [ ] 实现响应式布局
- [ ] 开发关键组件
- [ ] 集成数据和状态管理

### 3. 性能优化
- [ ] 图片懒加载
- [ ] 代码分割
- [ ] 缓存策略
- [ ] SEO优化

---

**CELPIP Compass UI设计方案 v1.0**
**📧 联系: design@celpip-compass.com**
**🌐 官网: https://www.celpip-compass.com**