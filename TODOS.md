# TODOS

## Pending

### Slide Deck Generation
- **What:** Generate 12 slide-deck images (each exam section × 3 slides) using `/baoyu-slide-deck` or `baoyu-imagine`
- **Why:** Exam-day last-10-minutes quick review material
- **Prompt ready:** `images/prompts/slide-deck.md`
- **Command:** `cd ~/.qwen/skills/baoyu-imagine && npx -y bun scripts/main.ts --promptfiles images/prompts/slide-deck.md --image images/slide-deck.png --provider dashscope --model qwen-image-2.0-pro --ar 16:9 --quality 2k`
- **Priority:** Low (nice-to-have, infographics already cover this)
