'use client'

import { lazy, Suspense } from 'react'
import { LoadingSpinner } from './ui/LoadingSpinner'
import type { Flashcard } from '@/types/flashcards'

// Lazy load heavy components for better performance
export const StudyDashboard = lazy(() =>
  import('@/components/Study/StudyDashboard').then(mod => ({ default: mod.StudyDashboard }))
)

export const StudyProgress = lazy(() =>
  import('@/components/Study/StudyProgress').then(mod => ({ default: mod.StudyProgress }))
)

export const SampleCardsGrid = lazy(() =>
  import('@/components/Cards/SampleCardsGrid').then(mod => ({ default: mod.SampleCardsGrid }))
)

// Wrapper for lazy-loaded components with loading state
export const LazyComponentWrapper = ({
  children,
  fallback = <LoadingSpinner />
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}

// Individual lazy components for fine-grained loading
export const LazyStudyDashboard = () => (
  <LazyComponentWrapper>
    <StudyDashboard />
  </LazyComponentWrapper>
)

export const LazyStudyProgress = () => (
  <LazyComponentWrapper>
    <StudyProgress />
  </LazyComponentWrapper>
)

export const LazySampleCardsGrid = ({
  onCardSelect,
  showFilters,
  limit
}: {
  onCardSelect?: (card: Flashcard) => void
  showFilters?: boolean
  limit?: number
}) => (
  <LazyComponentWrapper>
    <SampleCardsGrid
      onCardSelect={onCardSelect}
      showFilters={showFilters}
      limit={limit}
    />
  </LazyComponentWrapper>
)