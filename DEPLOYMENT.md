# CELPIP Compass 部署指南

## 概述

本文档提供了 CELPIP Compass 应用的完整部署指南，包括本地开发、测试和生产环境的部署流程。

## 目录

- [环境要求](#环境要求)
- [本地开发部署](#本地开发部署)
- [Docker 部署](#docker-部署)
- [云平台部署](#云平台部署)
- [监控和日志](#监控和日志)
- [安全配置](#安全配置)
- [故障排除](#故障排除)

## 环境要求

### 系统要求
- **操作系统**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: 20.x 或更高版本
- **内存**: 最少 4GB RAM，推荐 8GB+
- **存储**: 最少 2GB 可用空间

### 依赖服务
- **PostgreSQL**: 15.x
- **Redis**: 7.x
- **Docker** (可选，用于容器化部署)

## 本地开发部署

### 1. 克隆项目

```bash
git clone https://github.com/your-repo/celpip-compass.git
cd celpip-compass
```

### 2. 安装依赖

```bash
# 安装根目录依赖
npm install

# 进入前端目录安装依赖
cd celpip-compass
npm install
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

必要的环境变量：

```env
# 应用配置
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000

# 数据库配置
DATABASE_URL=postgresql://postgres:password@localhost:5432/celpip_dev

# Redis 配置
REDIS_URL=redis://localhost:6379

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key

# Sentry 配置 (可选)
SENTRY_DSN=https://your-sentry-dsn
```

### 4. 启动数据库服务

使用 Docker 启动 PostgreSQL 和 Redis：

```bash
# 启动数据库服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 5. 运行数据库迁移

```bash
# 进入项目目录
cd celpip-compass

# 运行迁移
npx prisma migrate dev

# 查看数据库
npx prisma studio
```

### 6. 启动开发服务器

```bash
# 使用 Turbopack (推荐)
npm run dev

# 或者使用普通开发模式
npm run dev -- --port 3000
```

应用将在 `http://localhost:3000` 启动。

## Docker 部署

### 1. 本地 Docker 部署

```bash
# 构建镜像
docker build -t celpip-compass .

# 运行容器
docker-compose up -d

# 查看日志
docker-compose logs -f celpip-app
```

### 2. Docker Compose 高级配置

```bash
# 停止所有服务
docker-compose down

# 重新构建并启动
docker-compose up -d --build

# 清理旧镜像
docker system prune -f
```

### 3. 生产环境 Docker 部署

修改 `docker-compose.yml` 中的环境变量：

```yaml
environment:
  - NODE_ENV=production
  - DATABASE_URL=postgresql://user:password@postgres:5432/celpip_prod
  - JWT_SECRET=production-secret-key
  - SENTRY_DSN=https://production-sentry-dsn
```

## 云平台部署

### Render 部署

1. **创建 Web Service**
   - 连接 GitHub 仓库
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Environment: Production

2. **配置环境变量**
   - 在 Render Dashboard 中设置所有必要的环境变量

3. **数据库服务**
   - 创建 PostgreSQL 和 Redis 服务
   - 更新连接字符串

### Vercel 部署

1. **连接 Vercel**
   - 使用 Vercel CLI 或 GitHub 集成
   - 选择 `celpip-compass` 目录

2. **配置环境变量**
   - 在 Vercel Dashboard 中设置环境变量

3. **部署命令**
   ```bash
   # 本地预览
   npx vercel preview

   # 生产部署
   npx vercel --prod
   ```

### AWS ECS 部署

1. **构建并推送镜像**
   ```bash
   # 标记镜像
   docker tag celpip-compass:latest your-account.dkr.ecr.region.amazonaws.com/celpip-compass:latest

   # 推送到 ECR
   docker push your-account.dkr.ecr.region.amazonaws.com/celpip-compass:latest
   ```

2. **定义 ECS 任务**
   - 创建任务定义文件
   - 配置环境变量
   - 设置日志配置

3. **部署服务**
   - 使用 ECS CLI 或 AWS Console
   - 设置自动扩缩容

## 监控和日志

### 1. 应用监控

**Sentry 配置**
```javascript
// app/utils/sentry.client.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

**性能监控**
- 使用 React Performance API
- Core Web Vitals 跟踪
- API 响应时间监控

### 2. 日志管理

**日志级别**
- `error`: 错误和异常
- `warn`: 警告信息
- `info`: 一般信息
- `debug`: 调试信息

**日志文件位置**
- 开发环境: 控制台输出
- 生产环境: `/logs/` 目录
- Docker 容器: 使用 `docker logs`

### 3. 健康检查

应用提供 `/api/health` 端点用于健康检查：

```bash
curl http://localhost:3000/api/health
```

响应示例：
```json
{
  "status": "healthy",
  "timestamp": "2025-12-30T10:00:00.000Z",
  "version": "1.0.0",
  "checks": {
    "database": { "status": "healthy" },
    "redis": { "status": "healthy" }
  }
}
```

## 安全配置

### 1. 环境安全

**密钥管理**
- 使用强随机生成的密钥
- 定期轮换 JWT 密钥
- 不要将密钥提交到版本控制

**CORS 配置**
```javascript
// middleware.ts
const allowedOrigins = [
  'https://your-domain.com',
  'https://staging.your-domain.com'
];
```

### 2. 数据库安全

**连接安全**
- 使用 SSL 连接 PostgreSQL
- 限制数据库访问权限
- 定期备份数据

**Redis 安全**
- 设置密码认证
- 使用 TLS 加密
- 限制内存使用

### 3. 应用安全

**安全头**
```javascript
// next.config.js
headers: async () => {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ];
}
```

## 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 使用不同端口
   npm run dev -- --port 3001
   ```

2. **数据库连接失败**
   ```bash
   # 检查数据库服务状态
   docker-compose ps postgres

   # 查看数据库日志
   docker-compose logs postgres
   ```

3. **构建失败**
   ```bash
   # 清除缓存重新构建
   rm -rf .next
   npm run build
   ```

4. **内存不足**
   ```bash
   # 增加可用内存
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

### 调试工具

- **Chrome DevTools**: 网络和性能分析
- **Prisma Studio**: 数据库查看
- **Sentry Dashboard**: 错误监控
- **Grafana**: 监控仪表板

### 日志分析

```bash
# 查看应用日志
tail -f logs/combined.log

# 查看错误日志
tail -f logs/error.log

# 搜索特定错误
grep "ERROR" logs/combined.log
```

## 性能优化

### 1. 前端优化

**代码分割**
```javascript
// 使用 React.lazy 进行懒加载
const StudyDashboard = React.lazy(() => import('./components/StudyDashboard'));
```

**图片优化**
```javascript
// 使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  width={500}
  height={300}
  alt="Description"
  formats={['webp', 'avif']}
/>
```

### 2. 后端优化

**数据库优化**
- 添加适当的索引
- 使用连接池
- 优化查询语句

**缓存策略**
- Redis 缓存热点数据
- HTTP 缓存头配置
- CDN 静态资源缓存

### 3. 构建优化

**Bundle 分析**
```bash
# 分析包大小
npm run analyze

# 优化结果
# 1. 减少依赖包大小
# 2. 代码分割
# 3. Tree shaking
```

## 备份和恢复

### 1. 数据库备份

```bash
# 创建备份
docker exec celpip-postgres pg_dump -U postgres celpip_dev > backup.sql

# 恢复备份
docker exec -i celpip-postgres psql -U postgres celpip_dev < backup.sql
```

### 2. 配置备份

```bash
# 备份所有配置文件
tar -czf config-backup.tar.gz \
  .env \
  docker-compose.yml \
  next.config.js \
  prisma/schema.prisma
```

## 更新和维护

### 1. 依赖更新

```bash
# 检查过时的包
npm outdated

# 更新依赖
npm update

# 安全更新
npm audit fix
```

### 2. 定期维护

- 每周检查安全更新
- 每月备份生产数据
- 每季度审查性能指标
- 每年更新依赖版本

---

## 支持

如果遇到部署问题，请：

1. 查看 [故障排除](#故障排除) 部分
2. 检查应用日志
3. 查看 GitHub Issues
4. 联系开发团队

**文档版本**: 1.0.0
**最后更新**: 2025-12-30