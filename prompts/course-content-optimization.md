# CELPIP Compass Markdown 课程内容优化 — 千问 Worker Prompt

> 驱动通义千问 Code CLI + baoyu-skills
> 两阶段工作流：Phase 1 锁定优质内容 → Phase 2 视觉增强（一图抵千言）

## 用户背景

- IELTS 6.0，2026年4月底考 CELPIP，目标 CLB 8+
- 词汇量充足（1841 张 Anki 卡），口语强（Toastmasters VP Education）
- 不需要语言基础教学，只需要考试策略精华
- 闪卡已完成优化（199→41 张策略卡），本次优化 Markdown 课程文档

## baoyu-skills 全览

| Skill | 用途 | 阶段 |
|-------|------|------|
| `/baoyu-url-to-markdown` | 抓取网页验证链接、提取内容 | Phase 1 |
| `/baoyu-youtube-transcript` | 提取视频字幕，提炼策略要点 | Phase 1 |
| `/baoyu-danger-x-to-markdown` | 抓取 X 平台攻略帖 | Phase 1 |
| `/baoyu-translate` | 英文攻略翻译为中文摘要 | Phase 1 |
| `/baoyu-format-markdown` | 格式化最终 Markdown | Phase 1 |
| `/baoyu-infographic` | 专业信息图（流程图、对比图、时间线） | Phase 2 |
| `/baoyu-xhs-images` | 小红书风格系列卡片（1-10 张） | Phase 2 |
| `/baoyu-comic` | 知识漫画（记忆难点） | Phase 2 |
| `/baoyu-cover-image` | 课程章节封面图 | Phase 2 |
| `/baoyu-slide-deck` | 幻灯片风格策略卡 | Phase 2 |
| `/baoyu-article-illustrator` | 文章段落配图 | Phase 2 |
| `/baoyu-imagine` | 自定义 AI 图像 | Phase 2 |

---

# Phase 1：锁定优质内容

> 目标：压缩冗长文字、验证并升级参考素材、产出精炼的策略课程
> Phase 1 完成后交付给 Claude 审查，审查通过再进入 Phase 2

## 需要优化的文件

请先读取以下 4 个文件的完整内容：

| 文件 | 大小 | 当前问题 |
|------|------|---------|
| `4周加速备考方案.md` | 883行 | 内容冗长，用户只剩不到1个月 |
| `CELPIP_完整闪卡库.md` | 1715行 | 与已压缩的41张TypeScript闪卡高度重叠 |
| `视频博客资源库_App集成版.md` | 553行 | 部分链接可能失效，缺少2025-2026新资源 |
| `资源库最终总结.md` | 358行 | 与上一个文件重叠，应合并 |

---

### 任务 1.1：压缩 `4周加速备考方案.md` → `2周冲刺方案.md`

**压缩原则：**
- 4周→2周（用户时间不够）
- 删除基础语言学习内容（用户已有基础）
- 删除口语练习详情（用户是Toastmasters VP Education）
- 保留：时间分配策略、各部分核心技巧、模考安排
- 每天任务压缩为 3 个要点，不要长段文字
- 加入评分标准对照

**搜索最新信息：**
```
Web Search: "CELPIP 2026 changes format update"
Web Search: "CELPIP 2 week study plan CLB 9 2025"
→ 对有价值文章运行 /baoyu-url-to-markdown 提取要点
→ 英文内容用 /baoyu-translate（快速模式）生成中文摘要
```

### 任务 1.2：重写 `CELPIP_完整闪卡库.md` → `考试策略速查手册.md`

**重写原则：**
- 不再是闪卡格式（闪卡已在 TypeScript 中实现了 41 张）
- 改为「考场速查」风格，每个考试部分 1 页
- 格式统一为：评分标准 → 时间分配 → 3个必做 → 3个禁忌 → 核心模板
- 删除所有词汇列表、语法解释、例句练习

**每个部分的模板：**
```markdown
## [部分名] 速查

### ⏱ 时间分配
- [具体分配]

### ✅ 必做 (DO)
1. [要点]
2. [要点]
3. [要点]

### ❌ 禁忌 (DON'T)
1. [要点]
2. [要点]
3. [要点]

### 📊 评分维度
- [维度1] (X%)
- [维度2] (X%)

### 📝 核心模板
[最精简的可直接套用的模板]
```

### 任务 1.3：更新资源库 + 合并

**Step 1: 验证现有链接**
```
对每个 YouTube 链接运行 /baoyu-youtube-transcript
  → 成功 = 有效，同时从字幕提炼 3 个核心策略要点作为摘要
  → 失败 = 标记失效

对每个网站链接运行 /baoyu-url-to-markdown
  → 成功 = 有效
  → 失败 = 标记失效
```

**Step 2: 搜索高质量新资源**
```
Web Search: "site:bilibili.com 思培 CELPIP 2025 2026 高分"
Web Search: "site:youtube.com CELPIP tips strategy 2025 2026"
Web Search: "site:xiaohongshu.com CELPIP 思培 攻略"
Web Search: "site:zhihu.com CELPIP 思培 备考 CLB9"
Web Search: "site:x.com CELPIP tips CLB9 2025"

→ 用 /baoyu-url-to-markdown 验证网页内容
→ 用 /baoyu-youtube-transcript 提取视频字幕
→ 用 /baoyu-danger-x-to-markdown 抓取推文
→ 用 /baoyu-translate 翻译英文内容
```

**Step 3: 质量分级**
- ⭐⭐⭐⭐⭐ 必看（高互动 + 内容精准 + 2025-2026最新）
- ⭐⭐⭐⭐ 推荐（内容好但不是最新）
- ⭐⭐⭐ 参考（有价值但非必需）
- 删除低于3星的资源

**Step 4: 合并** `资源库最终总结.md` 的不重复内容，删除该文件

### 任务 1.4：格式化

对每个产出文件运行 `/baoyu-format-markdown`，确保 frontmatter、标题层级、表格对齐。

---

### Phase 1 交付物

| # | 文件 | 说明 |
|---|------|------|
| 1 | `2周冲刺方案.md` | 从883行压缩为精简2周计划 |
| 2 | `考试策略速查手册.md` | 从1715行闪卡库重写为速查格式 |
| 3 | `资源精选库.md` | 合并+验证+更新+分级 |
| 4 | `link-validation-report.md` | 链接验证结果 + 每个视频的3句话摘要 |

**Phase 1 完成后，先停下来。把这 4 个文件交给 Claude 审查。审查通过后再进入 Phase 2。**

---

# Phase 2：视觉增强（一图抵千言）

> 前提：Phase 1 的内容已经过 Claude 审查锁定
> 目标：将锁定的优质内容转化为精美图片，辅助记忆和快速浏览

## 设计原则

- 每张图片必须基于 Phase 1 锁定的文字内容，不凭空创造
- 图片的价值 = 把需要读 3 分钟的文字压缩成扫一眼就能记住的画面
- 优先做考场最需要的：策略速查 > 时间分配 > 评分标准 > 模板结构

## 任务 2.1：策略速查信息图

从 `考试策略速查手册.md` 的每个部分生成 1 张信息图（共 4 张）：

```
/baoyu-infographic

内容来源：考试策略速查手册.md 的 [Writing/Reading/Listening/Speaking] 速查部分
包含：
- 评分维度和权重（饼图或条形图）
- 时间分配（时间线或表格）
- 3个必做 + 3个禁忌（对比布局）
- 核心模板结构（流程图）
视觉风格：专业清晰，适合打印或手机查看
```

## 任务 2.2：2周冲刺路线图

从 `2周冲刺方案.md` 生成 1 张总览信息图：

```
/baoyu-infographic

内容来源：2周冲刺方案.md
布局：时间线
- Week 1 每天的 3 个核心任务
- Week 2 每天的 3 个核心任务
- 两个周的里程碑目标
视觉风格：高对比度，一目了然
```

## 任务 2.3：小红书风格知识卡片

将速查手册中信息密度最高的知识点做成手机友好的卡片系列：

**Writing 系列（3张）：**
```
/baoyu-xhs-images

内容来源：考试策略速查手册.md Writing 部分
卡片1: Task 1 邮件黄金结构（开头→正文→结尾 三段式流程）
卡片2: Task 2 论证万能模板（立场→论据1→论据2→总结 四段论）
卡片3: 评分标准 + 常见扣分 TOP 5
风格：明亮配色，适合手机竖屏浏览
```

**Reading 系列（3张）：**
```
/baoyu-xhs-images

内容来源：考试策略速查手册.md Reading 部分
卡片1: Part 1-4 时间分配黄金比例
卡片2: 略读 vs 精读：什么时候用哪个（决策树）
卡片3: Part 3&4 概念匹配攻略（2026重点变化）
风格：蓝绿学术配色
```

**Listening 系列（2张）：**
```
/baoyu-xhs-images

内容来源：考试策略速查手册.md Listening 部分
卡片1: 信号词四类速查（对比/因果/转折/总结）
卡片2: 笔记速记符号表 + Part 1-6 各Part关键听力点
风格：深蓝科技感
```

**Speaking 系列（1张）：**
```
/baoyu-xhs-images

内容来源：考试策略速查手册.md Speaking 部分
卡片1: Task 1-8 时间分配 + 框架结构总览
风格：橙色活力
```

## 任务 2.4：难点知识漫画

选 2-3 个最容易犯错的知识点，用漫画让人印象深刻：

```
/baoyu-comic

漫画1: "时间管理灾难"
来源：Reading 速查中的时间分配策略
4格对比：
× 错误做法：认真读完全文 → 没时间做题 → 疯狂猜 → 惨
✓ 正确做法：先看题 → 带问题略读 → 精准定位 → 高分
画风：简约线条 / 幽默

漫画2: "Writing 格式陷阱"
来源：Writing 速查中的禁忌
4格：写了完美文章 → 忘记 Dear.../Sincerely → 格式分全扣 → 原来是邮件不是作文
画风：Q版搞笑

漫画3: "信号词的魔力"（可选）
来源：Listening 速查中的信号词
4格：漫无目的听 → 听到"However" → 集中注意力 → 抓到关键转折
画风：动漫风格
```

## 任务 2.5：课程封面图

为 Phase 1 的 3 个文档各生成 1 张封面：

```
/baoyu-cover-image

封面1: "CELPIP 2周冲刺方案" — 倒计时钟 + 目标靶心 + CLB 8+
封面2: "CELPIP 考试策略速查手册" — 四象限分区（W/R/L/S 各一色）
封面3: "CELPIP 资源精选库" — 社交媒体图标拼贴风格
```

## 任务 2.6（可选）：考前速览幻灯片

```
/baoyu-slide-deck

将速查手册转为 12 张幻灯片（每部分3张）：
- Slide 1: 评分标准 + 时间分配
- Slide 2: 必做 + 禁忌
- Slide 3: 核心模板
风格：极简大字体，考场外最后 10 分钟用
```

---

### Phase 2 交付物

| # | 类型 | Skill | 数量 |
|---|------|-------|------|
| 1 | 考试部分策略速查图 | `/baoyu-infographic` | 4张 |
| 2 | 2周冲刺路线图 | `/baoyu-infographic` | 1张 |
| 3 | Writing 知识卡片 | `/baoyu-xhs-images` | 3张 |
| 4 | Reading 知识卡片 | `/baoyu-xhs-images` | 3张 |
| 5 | Listening 知识卡片 | `/baoyu-xhs-images` | 2张 |
| 6 | Speaking 知识卡片 | `/baoyu-xhs-images` | 1张 |
| 7 | 难点知识漫画 | `/baoyu-comic` | 2-3张 |
| 8 | 课程封面图 | `/baoyu-cover-image` | 3张 |
| 9 | 考前幻灯片（可选） | `/baoyu-slide-deck` | 12张 |

所有图片保存到 `images/` 目录，在 Markdown 中用 `![](images/xxx.png)` 引用。

---

## 执行顺序总览

```
Phase 1: 锁定内容（先做完，交 Claude 审查）
  1.1 验证资源库链接         ← /baoyu-youtube-transcript + /baoyu-url-to-markdown
  1.2 搜索补充新资源         ← Web Search + /baoyu-url-to-markdown + /baoyu-translate
  1.3 压缩4周→2周方案       ← 文字处理
  1.4 重写闪卡库→速查手册    ← 文字处理
  1.5 合并+更新资源库        ← /baoyu-format-markdown
  → 交付 4 个文件给 Claude 审查

Phase 2: 视觉增强（内容审查通过后再做）
  2.1 策略速查信息图 ×4     ← /baoyu-infographic
  2.2 冲刺路线图 ×1         ← /baoyu-infographic
  2.3 知识卡片 ×9           ← /baoyu-xhs-images
  2.4 知识漫画 ×2-3         ← /baoyu-comic
  2.5 封面图 ×3             ← /baoyu-cover-image
  2.6 幻灯片 ×12（可选）    ← /baoyu-slide-deck
```

## 重要提醒

- **Phase 1 是基础，Phase 2 是增强。** 没有好内容的图片是空中楼阁
- **Phase 2 的每张图必须基于 Phase 1 锁定的文字。** 不凭空设计
- 不要编造链接，用 baoyu-skills 验证每个链接
- 已完成的 41 张 TypeScript 策略闪卡不要重复
- 保持中文为主，英文考试术语保留原文
