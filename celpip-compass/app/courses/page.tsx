import Link from 'next/link';
import Image from 'next/image';
import { getAllCourses } from '@/lib/courses';

export const metadata = {
  title: 'CELPIP 攻略课程 | CELPIP Compass',
  description: 'CELPIP 考试备考攻略课程，包含冲刺方案、策略速查和资源精选',
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← 返回学习中心
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">攻略课程</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Course Grid */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${encodeURIComponent(course.slug)}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {course.coverImage && (
                <div className="relative h-44 bg-gray-100">
                  <Image
                    src={course.coverImage}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
