import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/app/utils/logger';

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const requestId = generateRequestId();

  // Add request ID to response headers
  const response = NextResponse.next({
    headers: {
      'X-Request-ID': requestId,
      'X-Response-Time': '0',
    },
  });

  // Log request details
  logger.http('Incoming request', {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip,
  });

  // Add performance monitoring
  response.headers.set('X-Response-Time', `${Date.now() - startTime}`);

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Rate limiting check (simplified)
  const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (await isRateLimited(clientIp)) {
    logger.warn('Rate limit exceeded', { requestId, ip: clientIp });
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Performance monitoring for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    monitorApiPerformance(request, response, startTime, requestId);
  }

  return response;
}

function generateRequestId(): string {
  return Math.random().toString(36).substr(2, 9);
}

async function isRateLimited(ip: string): Promise<boolean> {
  // In a real implementation, this would check Redis or similar
  // For now, we'll use a simple in-memory counter
  const rateLimitKey = `rate_limit:${ip}`;
  const currentCount = (global as any)[rateLimitKey] || 0;

  if (currentCount > 100) { // 100 requests per window
    return true;
  }

  (global as any)[rateLimitKey] = currentCount + 1;

  // Reset counter every 15 minutes
  setTimeout(() => {
    (global as any)[rateLimitKey] = 0;
  }, 15 * 60 * 1000);

  return false;
}

function monitorApiPerformance(
  request: NextRequest,
  response: NextResponse,
  startTime: number,
  requestId: string
): void {
  const endTime = Date.now();
  const duration = endTime - startTime;

  // Log API performance metrics
  logger.info('API performance', {
    requestId,
    method: request.method,
    url: request.url,
    statusCode: response.status,
    duration,
    timestamp: new Date().toISOString(),
  });

  // Track slow requests (> 1 second)
  if (duration > 1000) {
    logger.warn('Slow API request', {
      requestId,
      method: request.method,
      url: request.url,
      duration,
      timestamp: new Date().toISOString(),
    });
  }

  // Add performance headers for monitoring
  response.headers.set('X-API-Duration', duration.toString());
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};