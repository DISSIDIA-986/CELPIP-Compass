---
title: "CELPIP Writing Sprint — 崩溃瞬间反向清单"
summary: "不讲写作，只讲考场里会把分数弄丢的那 6 个瞬间。10 分钟读完 P0 拿 80% 分数杠杆。"
date: 2026-04-23
tags: ["CELPIP", "Writing", "Sprint", "P0"]
coverImage: "/images/cover-strategy-handbook.png"
---

# Writing Sprint

> **用法：** 倒数第 7 天读 P0 + P1。倒数第 3 天再读一次 P0 + Rescue。考前 10 分钟只看 P0。
> **状态：** P0 为 hypothesis，待 2-3 次真实定时模考后替换为观察到的原话。
> **不是课程。是"在考场里别踩这 6 个坑"的操作手册。**

---

## 你现在什么情况？

点最像你的那一行，直接跳到对应 drill。

| 症状（你在考场里的原话） | 跳转 |
|---|---|
| "我开写就没想清楚 side，写到一半才定调" | [no-lock](#drill-no-lock) |
| "我 Task 2 写到一半立场飘了" | [stance-wobble](#drill-stance-wobble) |
| "最后 5 分钟我在乱写句子" | [time-collapse](#drill-time-collapse) |
| "邮件格式突然不确定有没有问题" | [email-format-fail](#drill-email-format-fail) |

---

## P0 — 必读（10 分钟，5 条）

每条格式：**失败 → 为什么扣分 → 立刻怎么办 → 备用桥接句**

> **P0 经过 Codex + Claude subagent 对抗审查（2026-04-23, iter 1）。原 v1 的 verb-repetition 和 170-word-anchor 规则被判为 textbook-level，已降级。所有 P0 仍为 hypothesis，待 2-3 次真实模考后最终锁定。**

### P0-1. 打字前 20-30 秒锁死 side + reason 1 + reason 2，才允许开写

- **失败：** 读完 prompt 直接开打 intro，写到 body 2 才意识到自己第二个理由说不清楚、或者跟第一个理由重了。立场漂移、filler、time collapse 全是这个失败的下游。
- **扣分点：** 上游影响 Content 40% + Coherence（立场 wobble）+ Grammar（时间崩导致的半截句）。
- **立刻怎么办：** 读完 prompt，心里默念（或草稿纸写）三行：
  ```
  Side: [A or B]
  R1:   [关键词 3-5 字]
  R2:   [关键词 3-5 字]
  ```
  三行没填满，不准动键盘。宁可多花 30 秒锁定，不要开写后返工。
- **桥接句：** 无。这是 pre-write 动作。

### P0-2. Task 2 到 35 分钟整点，停止写新内容，剩下全部用来检查

- **失败：** 分心看时间发现剩 3 分钟，还在写新论点，最后一句是半截的。
- **扣分点：** 半截句 + 拼写错误集中在最后一段 → Grammar 25% 崩 + 没有 conclusion → Content 扣。
- **立刻怎么办：** 设一个心里的 35min 硬截止。35min 之后只允许：补完当前半截句、扫一遍拼写、检查每段 topic sentence 是否回到立场。**不准开新 idea。**
- **桥接句：** 如果 35min 到了还缺结论，就写一句话：`Given these reasons, X is clearly the better choice.` 10 秒搞定。

### P0-3. Intro 第一句让立场可见，不强制模板

- **失败：** intro 前两句写背景/定义/现象，第三句才出立场。阅卷人 10 秒扫完 intro，立场靠后 = "position unclear"。
- **扣分点：** Coherence + Content。
- **立刻怎么办：** 第一句可见立场。不强制用 `I firmly believe...` 模板，但必须让读者第一句读完就知道你站哪边。
- **坏例子：** `Technology has become widespread in schools. Many debate whether it helps. I think it does help.`（立场在第三句）
- **好例子：** `Technology belongs in the classroom. While some worry about distraction, the interactive benefits outweigh the risks.`（第一句就表态）

### P0-4. Task 1 + Task 2 必须 cover prompt 里所有 bullet points

- **失败：** Task 1 prompt 要求"描述问题 / 说明影响 / 请求具体 action"三点，你只写了两点。Task 2 prompt 有两个子问题你只回答了一个。
- **扣分点：** Content 40% 里直接少 1/N（2 点漏 1 = 50%，3 点漏 1 = 33%）。单独这一个错误就能把 CLB 8 打回 CLB 6。
- **立刻怎么办：** 读 prompt 时用笔（或心里）编号所有显式要求（1、2、3...）。写每段时勾掉一个。**写完 intro 立刻验一次清单。** 结尾再验一次。
- **最常漏：** Task 2 的 "and why" / "and how" 尾巴。"Which is better, X or Y, and why?" —— 很多人只写 which better，不写 why。

### P0-5. Min 33 扫一遍 filler hedging 句，凡是没带新信息的删掉

- **失败：** 追求字数写出 `"In conclusion, I think this is a very important issue that affects many people in our society today."` —— 21 个字零信息量。
- **扣分点：** Vocabulary 25% 的 density 直接降；阅卷人看到空洞 hedging 会打 "lacks substance"。
- **立刻怎么办：** min 33 扫最后一段 + conclusion，看有没有只含下列词而不推进论点的句子：`very important / affects many / nowadays / our society / in general / many people think`。找到 → 删掉或合并。**宁可字数掉到 150 也不要留 filler。**
- **桥接句：** 结论句固定：`Given [R1 关键词] and [R2 关键词], X is clearly the better choice.` 18 字，零 filler。

---

## P1 — 次要（20 分钟，4 条）

读完 P0 还有时间再看。

### P1-1. 正式度锁定：写第一句时就选 formal 或 semi-formal，全文不切换

- Formal（Task 2、Task 1 投诉/正式请求）：no contractions（`don't` → `do not`），no `so`/`also`（用 `therefore`/`furthermore`）。
- Semi-formal（Task 1 给朋友/同事）：contractions OK，`so`/`also` OK。
- **禁止在同一篇里混**。Task 2 用了 `don't` 又用 `furthermore` = 双扣 vocab 和 grammar。
- Min-33 扫 `'t` 结尾的缩写（`don't`, `can't`, `it's`）→ 全部展开。

### P1-2. 每段最后一句和下一段第一句之间要有明确的 linking

- body 1 结尾 → body 2 开头：`Moreover` / `In addition` / `On the other hand` / `However`。
- 不要用 `Firstly / Secondly / Thirdly` —— 机械，CLB 7 味道。用 `My first reason... / I also believe... / Finally...`。

### P1-3. Task 1 Dear 后第一句就是 purpose，不寒暄

- 你日常工作邮件可能已经这么写了。考试紧张下会退化成 "I hope this email finds you well." → 20 字废话吃掉 80-120 字预算的 25%。
- 第一句固定：`Dear [Name], I am writing to [request / complain / inform about / confirm] [一句话目的].`

### P1-4. 每个 body 段开头要清楚标出：**我这段说什么 + 为什么支持我的 side**

- 不要求字面重复立场动词（那是假精准），要求每段 topic 能被独立拎出来回答"这段和我 intro 的 side 什么关系"。
- 坏：`One advantage is cost savings.`（没连回立场）
- 好：`First, technology saves costs, which is why I support it over traditional methods.`（立场+理由连在一起）

---

## P2 — 可选（textbook-level hygiene，10 分钟）

这些网上每个攻略都讲。你有时间再看。CLB 7→8 的杠杆不在这里。

- **Topic sentence 动词连贯：** body 段开头最好能让人一眼看出你还在支持同一 side。不要求字面重复动词（原 v1 P0-2 被降到这里，审查说"假精准"）。
- 高级词替换：`good → beneficial`, `bad → detrimental`, `help → facilitate`, `big → significant`, `a lot of → numerous`.
- 句式多样：复合句（`While X, Y`）+ 并列句（`X, and Y`）+ 简单句混用。
- 关联词：`moreover`, `furthermore`, `consequently`, `nevertheless`.
- 常见拼写坑：`recieve → receive`, `definately → definitely`, `seperate → separate`, `their/there/they're`.
- Task 1 邮件结尾：`Sincerely,` + 换行 + `[Your Name]`。
- Task 2 字数大致 150-200 词之间，不要强求 170 硬锚（原 v1 P0-5 被降到这里）。

**注意：** P2 不是错的，是低杠杆的。如果 P0/P1 都稳了再花时间在 P2。

---

## Drills — 崩溃瞬间操练

### Drill: no-lock

**没锁定就开写**

- **什么样子：** 读完 prompt 觉得"我大概知道怎么写"就开始打字。打到 body 2 时卡住 —— 发现 reason 2 说不清楚，或者和 reason 1 讲的其实是一件事。于是边写边想，立场就飘了。
- **为什么扣分：** 这是上游失败。下游一连串：stance-wobble + time-collapse + filler。Content + Coherence + Grammar 三合一扣。
- **立刻怎么办：** 执行 P0-1。开打前花 20-30 秒在草稿纸（或心里）写满三行：
  ```
  Side: A
  R1:   cost savings
  R2:   interactive learning
  ```
  三行都具体（不是"好处多"这种词），才允许开写。
- **坏例子：** "I think tech is good." → 开打 intro → 写到 body 2 才想 "cost? flexibility? engagement?"
- **好例子：** 花 30 秒锁定：`Side: Tech wins. R1: cost savings. R2: interactive learning.` → 开打，每段目标明确。

### Drill: stance-wobble

**立场漂移**

- **什么样子：** Task 2 intro 写 "I support technology in classrooms." body 2 写到一半发现自己在论证 "但传统书本也很重要"。
- **为什么扣分：** Coherence 崩。阅卷人标记 "position unclear" —— 这一项就直接掉到 CLB 6。
- **立刻怎么办（35 分钟还没到）：** 不要回头改 body 2。在 body 2 最后加一句反驳：`However, this does not outweigh the benefits of [你原本的立场].` 然后正常写结论。
- **坏例子：** `Technology helps students, but books still matter because students learn focus from them. In conclusion, both have value.` （立场崩成中立）
- **好例子：** `Technology helps students. While books do offer focus benefits, the interactive nature of technology makes it the superior choice. In conclusion, technology should lead the classroom.` （立场守住 + 承认对立 + 回到立场）

### Drill: time-collapse

**时间崩**

- **什么样子：** 剩 5 分钟，Task 2 第 3 段刚写到一半，没有结论，手在抖。
- **为什么扣分：** 没有 conclusion = Content 扣 + 最后一句是半截 → Grammar 扣。双扣。
- **立刻怎么办：** 立刻结束当前 body 段（一句话收尾，半成品就半成品），换行，写这一句然后停笔：`Given these reasons, X is the better choice.` 10 秒搞定 conclusion。
- **预防：** P0-4。35 分钟不写新内容。
- **坏例子：** 最后一句 `However, some people might say that` —— 卡在半截。
- **好例子：** 最后一句是完整的 `Given these reasons, I firmly believe technology should lead.` —— 结构完整。

### Drill: email-format-fail

**邮件格式崩**

- **什么样子：** Task 1 写完发现：漏了 `Dear [X]` / 漏了 `Sincerely,` / 三个 bullet points 写成了一段长段落 / 给老板的邮件用了 `Hi buddy`。
- **为什么扣分：** Format 10% 全部 → 扣 1 整个 CLB 等级。
- **立刻怎么办：**
  1. 第一行必须是 `Dear [Role 或 Name],` 带逗号。
  2. 最后一行必须是 `Sincerely,` 或 `Best regards,` 然后换行写名字。
  3. 如果 prompt 里有三点要求，分成三段。
- **坏例子：** `Hi, I wanted to tell you about a problem with the service and also ask you to fix it and refund me. Thanks John`
- **好例子：**
  ```
  Dear Customer Service Manager,

  I am writing to report a problem with my recent order #12345.
  [details...]

  I would appreciate a full refund.

  Sincerely,
  John Smith
  ```

*（原 v1 register-mix drill 已被 Codex + subagent 判为"cosmetic"——reviewer 说正式度混搭是 P1-1 的话题，不够格做独立 drill。合并到 P1-1 扫描动作里。）*

---

## Rescue Checklists

### Last-3-min-rescue（Task 2 最后 3 分钟扫描，同时也是 min-33 扫描）

- [ ] 有没有半截句？最后一句是完整句号结尾？
- [ ] 有 conclusion？哪怕一句话？（P0-2）
- [ ] Prompt 里的每个 bullet point 都回答到？（P0-4）
- [ ] 扫一遍 filler：`very important / affects many / nowadays / our society` → 删 or 合并（P0-5）
- [ ] 没有 `don't` / `can't` / `it's` 之类缩写？（P1-1）

### Pre-submit-scan（两个 task 全交之前 60 秒）

- [ ] Task 1：`Dear ...` + `Sincerely,` + 名字都在？
- [ ] Task 1：prompt 里的每个要求点都回答到？（P0-4）
- [ ] Task 2：intro 第一句读者能看出你站哪边？（P0-3）
- [ ] Task 2：prompt 里 "and why" / "and how" 的尾巴回答到？（P0-4）
- [ ] 拼写重点查：`receive / definitely / separate / their-there-they're`。

---

## 元信息

- **所有 P0 规则当前状态：** hypothesis，已过 iter-1 对抗审查（Codex high reasoning + Claude subagent，2026-04-23）。两轮审查一致降级了原 v1 的 verb-repetition（P0-2 → P2）和 170-word-anchor（P0-5 → P2）。
- **P0 最终排名（审查后，高杠杆到低）：** P0-1 pre-draft lock（upstream） > P0-2 35min hard stop > P0-4 cover all bullets > P0-3 stance visible in s1 > P0-5 min-33 filler scan.
- **等你跑 2-3 次定时模考后**，用真实观察到的崩溃瞬间替换对不上的条目。如果你的真实崩溃瞬间完全不包括以上 5 条中的某一条，那条就降 P1。
- **Supersedes：** `考试策略速查手册.md`, `2周冲刺方案.md`（已从 course registry 删除）。
- **上游 design：** `~/.gstack/projects/DISSIDIA-986-CELPIP-Compass/niuyp-main-design-20260423-015500.md`
