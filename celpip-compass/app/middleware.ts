import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Security headers configuration
const securityHeaders = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // XSS protection
  'X-XSS-Protection': '1; mode=block',
  // Content Security Policy
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.google-analytics.com; frame-ancestors 'none';",
  // Remove server info
  'Server': '',
  // Strict Transport Security (only in production)
  ...(process.env.NODE_ENV === 'production' && {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  }),
}

// Rate limiting configuration
const rateLimit = new Map()

const checkRateLimit = (ip: string) => {
  const now = Date.now()
  const windowStart = now - 15 * 60 * 1000 // 15 minutes window

  const requests = rateLimit.get(ip) || []
  const validRequests = requests.filter((timestamp: number) => timestamp > windowStart)

  if (validRequests.length >= 100) { // 100 requests per 15 minutes
    return false
  }

  validRequests.push(now)
  rateLimit.set(ip, validRequests)
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply security headers
  const response = NextResponse.next()

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting for auth endpoints
  if (pathname.startsWith('/api/auth/')) {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || 'unknown'

    if (!checkRateLimit(ip)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '900',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.floor(Date.now() / 1000 + 900).toString(),
        },
      })
    }
  }

  // Prevent access to sensitive files
  const sensitivePaths = [
    '/.env',
    '/.env.local',
    '/.env.production',
    '/config',
    '/database',
    '/admin',
    '/api/secrets',
    '/.git',
    '/.svn',
    '/.hg',
  ]

  for (const sensitivePath of sensitivePaths) {
    if (pathname.includes(sensitivePath)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  // CORS configuration for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')

    // Allowed origins
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'http://localhost:3001',
    ]

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin as string)
          ? origin
          : 'null',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      }

      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value as string)
      })

      return response
    }

    // Add CORS headers to actual requests
    const safeOrigin = origin || ''
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins.includes(safeOrigin)
      ? safeOrigin
      : 'null')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}

// Configure the matcher to exclude static assets and API routes from some security checks
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|uploads/).*)',
  ],
}