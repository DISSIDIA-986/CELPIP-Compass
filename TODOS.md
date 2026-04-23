# TODOS

## Pending

### Refactor lib/courses.ts to frontmatter-driven registry
- **What:** Replace hardcoded `courseMeta` const map with auto-scan of `data/courses/*.md` using `gray-matter` to pull `title/summary/coverImage` from frontmatter.
- **Why:** Adding a course currently requires editing two files (md + TS const). Drift risk grows with course count.
- **Context:** `getCourse()` at `celpip-compass/lib/courses.ts:42-48` already strips frontmatter manually; extend to also parse it. Deferred from eng review on 2026-04-23 — scope creep during CELPIP exam sprint.
- **Depends on / blocked by:** Do AFTER exam (end of April 2026). Not blocking sprint content rebuild.
- **Added:** 2026-04-23 via /plan-eng-review

## Completed

### Slide Deck Generation
- **What:** Generate 12 slide-deck images (each exam section × 3 slides) using `/baoyu-slide-deck` or `baoyu-imagine`
- **Why:** Exam-day last-10-minutes quick review material
- **Completed:** 2026-04-03 — 12 slides generated via DashScope qwen-image-2.0-pro, embedded in 考试策略速查手册 course page
