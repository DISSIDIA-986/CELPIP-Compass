'use client'

import { useEffect, useState } from 'react'
import React from 'react'

interface SecurityFeatures {
  isSecure: boolean
  hasCSP: boolean
  hasHTTPS: boolean
  hasXSSProtection: boolean
  hasFrameProtection: boolean
  rateLimited: boolean
}

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeatures>({
    isSecure: false,
    hasCSP: false,
    hasHTTPS: false,
    hasXSSProtection: false,
    hasFrameProtection: false,
    rateLimited: false,
  })

  useEffect(() => {
    // Check security features
    const checkSecurity = () => {
      const features: SecurityFeatures = {
        isSecure: false,
        hasCSP: false,
        hasHTTPS: false,
        hasXSSProtection: false,
        hasFrameProtection: false,
        rateLimited: true, // Rate limiting is handled by middleware
      }

      // Check if HTTPS is being used
      if (typeof window !== 'undefined') {
        features.hasHTTPS = window.location.protocol === 'https:'

        // Check security headers
        features.hasCSP = document.head.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null
        features.hasXSSProtection = document.head.querySelector('meta[http-equiv="X-XSS-Protection"]') !== null
        features.hasFrameProtection = document.head.querySelector('meta[http-equiv="X-Frame-Options"]') !== null

        // Overall security check
        features.isSecure = features.hasHTTPS && features.hasCSP
      }

      setSecurityFeatures(features)
    }

    checkSecurity()

    // Setup security event listeners
    const handleSecurityEvent = (event: Event) => {
      console.log('Security event detected:', event)
      // Implement security breach handling
    }

    window.addEventListener('securitypolicyviolation', handleSecurityEvent)
    window.addEventListener('x-frame-options', handleSecurityEvent)

    return () => {
      window.removeEventListener('securitypolicyviolation', handleSecurityEvent)
      window.removeEventListener('x-frame-options', handleSecurityEvent)
    }
  }, [])

  // Security monitoring
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add security event listeners
      const handleSecurityEvent = (event: Event) => {
        console.warn('Security event detected:', event.type)
      }

      // Listen for potential security violations
      window.addEventListener('x-frame-options', handleSecurityEvent)
      window.addEventListener('security-policy-violation', handleSecurityEvent)

      // Monitor for suspicious patterns in console
      const originalConsole = console
      console = {
        ...console,
        log: (...args: any[]) => {
          args.forEach(arg => {
            if (typeof arg === 'string' && arg.includes('<script>')) {
              console.warn('Potential XSS attempt in console.log')
            }
          })
          originalConsole.log.apply(originalConsole, args)
        },
        warn: (...args: any[]) => {
          args.forEach(arg => {
            if (typeof arg === 'string' && arg.includes('<script>')) {
              console.warn('Potential XSS attempt in console.warn')
            }
          })
          originalConsole.warn.apply(originalConsole, args)
        }
      }
    }
  }, [])

  return (
    <div className="security-provider">
      {/* Security status indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white p-2 rounded text-xs">
          <div>Security Status:</div>
          <div className={securityFeatures.isSecure ? 'text-green-400' : 'text-red-400'}>
            {securityFeatures.isSecure ? '✅ Secure' : '❌ Insecure'}
          </div>
          <div>HTTPS: {securityFeatures.hasHTTPS ? '✅' : '❌'}</div>
          <div>CSP: {securityFeatures.hasCSP ? '✅' : '❌'}</div>
          <div>XSS: {securityFeatures.hasXSSProtection ? '✅' : '❌'}</div>
          <div>Frame: {securityFeatures.hasFrameProtection ? '✅' : '❌'}</div>
        </div>
      )}

      {children}
    </div>
  )
}

// Input sanitization component
interface SanitizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onValueChange: (value: string) => void
  dangerousPatterns?: RegExp[]
}

export function SanitizedInput({
  value,
  onValueChange,
  dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
  ],
  ...props
}: SanitizedInputProps) {
  const sanitizeInput = (input: string): string => {
    let sanitized = input

    // Remove dangerous patterns
    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '')
    })

    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '')

    return sanitized
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value)
    onValueChange(sanitizedValue)
  }

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
      className="security-sanitized-input"
    />
  )
}

// CSRF protection component
export function CSRFToken() {
  const [csrfToken, setCSRFToken] = useState('')

  useEffect(() => {
    // Generate or retrieve CSRF token
    const token = generateCSRFToken()
    setCSRFToken(token)
  }, [])

  const generateCSRFToken = (): string => {
    const array = new Uint32Array(8)
    crypto.getRandomValues(array)
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('')
  }

  return (
    <input
      type="hidden"
      name="csrf_token"
      value={csrfToken}
      className="csrf-token"
    />
  )
}

// Rate limiting display component
export function RateLimitIndicator() {
  const [remaining, setRemaining] = useState(100)
  const [resetTime, setResetTime] = useState(Date.now() + 15 * 60 * 1000)

  useEffect(() => {
    // Simulate rate limiting countdown
    const interval = setInterval(() => {
      if (remaining > 0) {
        setRemaining(prev => prev - 1)
      }
    }, 9000) // 100 requests / 15 minutes = 1 request every 9 seconds

    return () => clearInterval(interval)
  }, [remaining])

  if (remaining > 20) return null

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded text-xs">
      Rate Limited: {remaining} requests remaining
      <div className="mt-1">
        Resets in: {Math.ceil((resetTime - Date.now()) / 1000)}s
      </div>
    </div>
  )
}

// Error boundary for security errors
export class SecurityErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasSecurityError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasSecurityError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    // Handle security-related errors
    const securityErrors = [
      'Security policy violation',
      'XSS attempt',
      'CSRF token mismatch',
      'Invalid input detected',
    ]

    const isSecurityError = securityErrors.some(err => error.message.includes(err))

    return {
      hasSecurityError: isSecurityError,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Security error caught:', error, errorInfo)

    // Send security alert
    if (this.state.hasSecurityError) {
      alert('Security violation detected. Please refresh the page.')
    }
  }

  render() {
    if (this.state.hasSecurityError) {
      return (
        <div className="error-boundary">
          <h2>Security Alert</h2>
          <p>A potential security issue has been detected.</p>
          <p>Please refresh the page and try again.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}