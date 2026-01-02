# 生产数据库设置指南

## Vercel Postgres (推荐)

### 步骤 1: 创建数据库

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择 `celpip-compass` 项目
3. 点击 **Storage** 标签
4. 点击 **Create Database**
5. 选择 **Postgres** (由Neon提供支持)
6. 选择区域: `us-east-1` (与部署区域一致)
7. 点击 **Create**

### 步骤 2: 连接项目

数据库创建后，`DATABASE_URL` 会自动添加到项目环境变量。

### 步骤 3: 运行迁移

```bash
# 本地拉取环境变量
vercel env pull .env.local

# 运行Prisma迁移
npx prisma migrate deploy

# 填充初始数据
npx prisma db seed
```

### 步骤 4: 重新部署

```bash
vercel --prod
```

## 免费层限制

| 资源 | Hobby限制 |
|------|-----------|
| 计算时间 | 60小时/月 |
| 存储 | 256 MB |
| 数据传输 | 1 GB |

## 替代方案: Neon 直连

如果需要更多功能（时间旅行、分支），可以直接使用 [Neon](https://neon.tech):

1. 创建Neon账户
2. 新建项目，选择区域
3. 复制连接字符串
4. 添加到Vercel环境变量:
   ```bash
   vercel env add DATABASE_URL production
   ```

## 本地开发

使用Docker运行本地PostgreSQL:

```bash
docker-compose up -d
npm run db:push
npm run db:seed
```

## 验证连接

访问 https://celpip-compass.vercel.app/api/health

成功响应:
```json
{
  "status": "healthy",
  "checks": {
    "database": { "status": "healthy" }
  }
}
```
