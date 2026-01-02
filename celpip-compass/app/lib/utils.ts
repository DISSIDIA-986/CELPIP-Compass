import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance utilities
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

// Image optimization utilities
export const getOptimizedImageSrc = (
  src: string,
  width?: number,
  quality = 75
): string => {
  if (!src) return ''

  // If it's an external image, return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const url = new URL(src)
    url.searchParams.set('q', quality.toString())
    if (width) {
      url.searchParams.set('w', width.toString())
    }
    return url.toString()
  }

  // For local images, Next.js will handle optimization
  return src
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && window.performance) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  } else {
    fn()
  }
}