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
  '2周冲刺方案': {
    title: 'CELPIP 2周冲刺方案',
    description: '针对有基础考生的CLB 8+冲刺计划，每天3个核心任务',
    coverImage: '/images/cover-2week-plan.png',
  },
  '考试策略速查手册': {
    title: 'CELPIP 考试策略速查手册',
    description: '考场速查风格，Writing/Reading/Listening/Speaking 各部分策略',
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
