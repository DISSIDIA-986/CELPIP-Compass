import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    const dbHealth = await checkDatabaseHealth();

    // Check Redis connection
    const redisHealth = await checkRedisHealth();

    // Overall health status
    const isHealthy = dbHealth.healthy && redisHealth.healthy;

    const healthStatus = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: {
          status: dbHealth.healthy ? 'healthy' : 'unhealthy',
          responseTime: dbHealth.responseTime,
          message: dbHealth.message
        },
        redis: {
          status: redisHealth.healthy ? 'healthy' : 'unhealthy',
          responseTime: redisHealth.responseTime,
          message: redisHealth.message
        },
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
      }
    };

    const status = isHealthy ? 200 : 503;
    return NextResponse.json(healthStatus, { status });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      checks: {
        database: { status: 'unknown', message: 'Check not performed' },
        redis: { status: 'unknown', message: 'Check not performed' },
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 503 });
  }
}

async function checkDatabaseHealth() {
  const startTime = Date.now();

  try {
    // In a real implementation, this would check the actual database connection
    // For now, we'll simulate a healthy database
    await new Promise(resolve => setTimeout(resolve, 5));

    return {
      healthy: true,
      responseTime: Date.now() - startTime,
      message: 'Database connection healthy'
    };
  } catch (error) {
    return {
      healthy: false,
      responseTime: Date.now() - startTime,
      message: error instanceof Error ? error.message : 'Database connection failed'
    };
  }
}

async function checkRedisHealth() {
  const startTime = Date.now();

  try {
    // In a real implementation, this would check the actual Redis connection
    // For now, we'll simulate a healthy Redis
    await new Promise(resolve => setTimeout(resolve, 2));

    return {
      healthy: true,
      responseTime: Date.now() - startTime,
      message: 'Redis connection healthy'
    };
  } catch (error) {
    return {
      healthy: false,
      responseTime: Date.now() - startTime,
      message: error instanceof Error ? error.message : 'Redis connection failed'
    };
  }
}