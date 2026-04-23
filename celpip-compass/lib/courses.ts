import fs from 'fs';
import path from 'path';

export interface Course {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  content: string;
}

const COURSES_DIR = path.join(process.cwd(), 'data/courses');

const courseMeta: Record<string, { title: string; description: string; coverImage?: string }> = {
  'writing-sprint': {
    title: 'Writing Sprint — 崩溃瞬间反向清单',
    description: '不讲写作，讲考场里会把分数弄丢的那 5 个瞬间。10 分钟读完 P0 拿 80% 分数杠杆。',
    coverImage: '/images/cover-strategy-handbook.png',
  },
  'reading-sprint': {
    title: 'Reading Sprint — Part 3/4 推断陷阱 + 时间失守',
    description: '不讲阅读，讲 Part 3/4 inference 陷阱 + 时间硬分配的那 5 个瞬间。',
    coverImage: '/images/cover-strategy-handbook.png',
  },
  'listening-sprint': {
    title: 'Listening Sprint — distractor + conflicting info',
    description: '不讲听力，讲 Part 5 flip-flop + Part 4 两人观点分栏笔记的那 5 个瞬间。',
    coverImage: '/images/cover-strategy-handbook.png',
  },
  'speaking-sprint': {
    title: 'Speaking Sprint — 最小模块（精简 P1）',
    description: '你基础已 OK。只处理 prep 浪费 + mid-sentence blank + Task 5/6/8 结构这 3 个考场特有崩溃点。',
    coverImage: '/images/cover-strategy-handbook.png',
  },
  '资源精选库': {
    title: 'CELPIP 资源精选库',
    description: '30+ 精选备考资源，全部验证有效，含2025-2026最新内容',
    coverImage: '/images/cover-resource-library.png',
  },
};

export function getAllCourses(): Omit<Course, 'content'>[] {
  return Object.entries(courseMeta).map(([slug, meta]) => ({
    slug,
    ...meta,
  }));
}

export function getCourse(slug: string): Course | null {
  const meta = courseMeta[slug];
  if (!meta) return null;

  const filePath = path.join(COURSES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Strip frontmatter
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      content = content.slice(endIndex + 3).trim();
    }
  }

  return { slug, ...meta, content };
}

export function getCourseSlugs(): string[] {
  return Object.keys(courseMeta);
}
