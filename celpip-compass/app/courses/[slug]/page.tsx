import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourse, getCourseSlugs } from '@/lib/courses';
import { MarkdownViewer } from '@/components/MarkdownViewer';

export async function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(decodeURIComponent(slug));
  if (!course) return { title: 'Not Found' };
  return {
    title: `${course.title} | CELPIP Compass`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(decodeURIComponent(slug));
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700 text-sm">
            ← 攻略课程
          </Link>
          <h1 className="text-sm font-medium text-gray-700 truncate max-w-xs">
            {course.title}
          </h1>
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
            学习中心
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <MarkdownViewer content={course.content} />
      </main>
    </div>
  );
}
