'use client';

import { useState } from 'react';
import {
  LazyStudyDashboard,
  LazyStudyProgress,
  LazySampleCardsGrid
} from '@/components/LazyComponents';

type ViewType = 'dashboard' | 'progress' | 'cards';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <LazyStudyDashboard />;
      case 'progress':
        return <LazyStudyProgress />;
      case 'cards':
        return (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">CELPIP 卡片库</h1>
              <p className="text-lg text-gray-600">浏览和管理所有学习卡片</p>
            </div>
            <LazySampleCardsGrid
              onCardSelect={(card) => console.log('Selected card:', card)}
              showFilters={true}
              limit={50}
            />
          </div>
        );
      default:
        return <LazyStudyDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">CELIPS Compass</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'dashboard'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    学习中心
                  </button>
                  <button
                    onClick={() => setCurrentView('progress')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'progress'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    学习进度
                  </button>
                  <button
                    onClick={() => setCurrentView('cards')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'cards'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    卡片库
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">间隔重复学习系统</span>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端导航 */}
        <div className="md:hidden">
          <div className="flex justify-around py-2 border-t">
            {[
              { key: 'dashboard', label: '学习中心' },
              { key: 'progress', label: '学习进度' },
              { key: 'cards', label: '卡片库' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key as ViewType)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === key
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main>
        {renderContent()}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 CELPIP Compass. 基于 SM2 间隔重复算法的智能学习系统</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
