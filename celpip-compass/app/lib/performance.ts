// Performance monitoring and optimization utilities

interface PerformanceMetrics {
  navigationStart: number
  loadEventEnd: number
  domInteractive: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
}

// Initialize PerformanceObserver for modern browsers
export class PerformanceMonitor {
  private metrics: PerformanceMetrics
  private observer: PerformanceObserver | null

  constructor() {
    this.metrics = {
      navigationStart: 0,
      loadEventEnd: 0,
      domInteractive: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
    }

    this.observer = null
    this.init()
  }

  private init() {
    if (typeof window === 'undefined' || !window.performance) return

    // Get navigation timing metrics
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigation) {
      this.metrics.navigationStart = navigation.fetchStart
      this.metrics.loadEventEnd = navigation.loadEventEnd
      this.metrics.domInteractive = navigation.domInteractive
    }

    // Get paint timing metrics
    const paint = performance.getEntriesByType('paint')
    paint.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        this.metrics.firstContentfulPaint = entry.startTime
      }
    })

    // Setup PerformanceObserver for LCP and CLS
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        // Largest Contentful Paint
        this.observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.largestContentfulPaint = lastEntry.startTime
        })

        this.observer.observe({ entryTypes: ['largest-contentful-paint'] })

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ('value' in entry) {
              this.metrics.cumulativeLayoutShift += (entry as PerformanceEntry & { value: number }).value
            }
          }
        })

        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0]
          if (firstInput && 'processingStart' in firstInput) {
            this.metrics.firstInputDelay = (firstInput as PerformanceEntry & { processingStart: number }).processingStart - firstInput.startTime
          }
        })

        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('PerformanceObserver not supported:', e)
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  // Calculate Core Web Vitals
  getCoreWebVitals() {
    return {
      LCP: this.metrics.largestContentfulPaint,
      FID: this.metrics.firstInputDelay,
      CLS: this.metrics.cumulativeLayoutShift,
      FCP: this.metrics.firstContentfulPaint,
      LoadTime: this.metrics.loadEventEnd - this.metrics.navigationStart,
    }
  }

  // Check if metrics meet performance targets
  checkPerformanceTargets(): {
    lcp: boolean
    fid: boolean
    cls: boolean
    fcp: boolean
  } {
    const vitals = this.getCoreWebVitals()

    return {
      lcp: vitals.LCP <= 2500, // 2.5 seconds
      fid: vitals.FID <= 100,   // 100ms
      cls: vitals.CLS <= 0.1,   // 0.1
      fcp: vitals.FCP <= 1800,  // 1.8 seconds
    }
  }
}

// Create a global instance
export const performanceMonitor = new PerformanceMonitor()

// Chrome-specific memory interface
interface PerformanceMemory {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && window.performance && 'memory' in performance) {
    const memory = (performance as Performance & { memory?: PerformanceMemory }).memory
    if (memory) {
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      }
    }
  }
  return null
}

// Resource loading optimization
export const preloadCriticalResources = (resources: string[]) => {
  if (typeof document !== 'undefined') {
    resources.forEach(resource => {
      if (resource.endsWith('.js')) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'script'
        link.href = resource
        document.head.appendChild(link)
      } else if (resource.endsWith('.css')) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'style'
        link.href = resource
        document.head.appendChild(link)
      }
    })
  }
}

// Image optimization utilities
export const optimizeImages = () => {
  if (typeof document !== 'undefined') {
    // Replace img elements with optimized versions
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      // Add loading="lazy" for all images
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy')
      }

      // Add fetchpriority for above-the-fold images
      const rect = img.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        img.setAttribute('fetchpriority', 'high')
      }
    })
  }
}

// Debounce utility for scroll events
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

// Throttle utility for resize events
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