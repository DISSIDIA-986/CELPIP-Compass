# 测试文档

## 测试概述

CELPIP Compass 项目包含完整的测试覆盖，包括单元测试和端到端测试。

## 测试结构

```
tests/
├── unit/                    # 单元测试
│   ├── auth.test.js        # 认证API测试
│   ├── database.test.js    # 数据库服务测试
│   └── spaced-repetition.test.js  # 间隔重复算法测试
└── e2e/                     # 端到端测试
    ├── auth-flow.spec.js   # 认证流程测试
    └── study-functionality.spec.js  # 学习功能测试
```

## 运行测试

### 单元测试

```bash
# 运行所有单元测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监视模式运行测试
npm run test:watch
```

### E2E测试

```bash
# 安装Playwright浏览器（首次运行）
npx playwright install

# 运行E2E测试
npm run test:e2e

# 运行E2E测试并显示浏览器界面
npm run test:e2e -- --headed

# 运行特定测试文件
npx playwright test tests/e2e/auth-flow.spec.js

# 运行测试并生成报告
npx playwright test --reporter=list
```

### 测试配置

#### Jest配置
- 位置：`jest.config.ts`
- 环境：jsdom (模拟浏览器环境)
- 转换：使用ts-jest处理TypeScript
- 覆盖率：支持多种报告格式

#### Playwright配置
- 位置：`playwright.config.ts`
- 浏览器：Chromium, Firefox, WebKit
- 并行：支持多浏览器并行测试
- 响应式测试：支持不同屏幕尺寸

## 单元测试覆盖范围

### 认证API测试 (`auth.test.js`)
- ✅ 用户登录成功/失败场景
- ✅ 用户注册验证和错误处理
- ✅ 输入验证（邮箱格式、密码强度）
- ✅ 令牌验证和错误处理

### 数据库服务测试 (`database.test.js`)
- ✅ Mock数据库CRUD操作
- ✅ 用户查询和创建
- ✅ 偏好设置管理
- ✅ 数据完整性验证

### 间隔重复算法测试 (`spaced-repetition.test.js`)
- ✅ 复习间隔计算
- ✅ 卡片状态转换
- ✅ 质量评分影响
- ✅ 学习统计计算

## E2E测试覆盖范围

### 认证流程测试 (`auth-flow.spec.js`)
- ✅ 登录页面显示和验证
- ✅ 注册流程和验证
- ✅ 表单错误处理
- ✅ 页面导航
- ✅ 响应式设计验证

### 学习功能测试 (`study-functionality.spec.js`)
- ✅ 仪表板页面显示
- ✅ 卡片类型筛选
- ✅ 学习会话管理
- ✅ 质量评分反馈
- ✅ 学习完成统计
- ✅ 空状态处理
- ✅ 移动端适配

## 持续集成

项目配置了GitHub Actions CI/CD流水线：

```yaml
# .github/workflows/test.yml
test:        # 单元测试 + 覆盖率
e2e-test:   # E2E测试
build-test: # 构建和代码质量检查
```

### CI触发条件
- 推送到main/develop分支
- Pull Request请求

### CI检查项目
- 单元测试覆盖率
- E2E功能测试
- 构建检查
- ESLint代码质量

## 测试最佳实践

### 单元测试
- 每个测试用例专注单一功能点
- 使用Mock隔离依赖
- 测试正常、异常和边界情况
- 保持测试独立性和可重复性

### E2E测试
- 模拟真实用户操作流程
- 验证端到端业务功能
- 包含响应式和可用性测试
- 使用Playwright自动等待机制

### 测试数据管理
- 使用Mock数据避免依赖外部服务
- 测试前后重置状态
- 保护生产数据安全

## 测试报告

### 覆盖率报告
单元测试覆盖率报告生成在`coverage/`目录：
- `coverage/lcov.info` - LCOV格式报告
- `coverage/lcov-report/` - HTML报告

### 测试结果
- Jest输出格式化测试结果
- Playwright生成HTML测试报告
- CI集成提供测试状态徽章

## 故障排除

### 常见问题

1. **测试超时**
   ```bash
   # 增加测试超时时间
   npx playwright test --timeout=30000
   ```

2. **浏览器启动失败**
   ```bash
   # 重新安装Playwright浏览器
   npx playwright install --with-deps
   ```

3. **依赖问题**
   ```bash
   # 清理缓存并重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

### 调试技巧
- 使用`--headed`参数查看浏览器界面
- 使用`--debug`参数进入调试模式
- 添加`console.log`输出调试信息

## 贡献指南

### 添加新测试
1. 单元测试放在`tests/unit/`目录
2. E2E测试放在`tests/e2e/`目录
3. 遵循现有测试结构和命名规范
4. 确保测试通过CI检查

### 测试要求
- 新功能必须包含测试
- 保持测试覆盖率≥80%
- E2E测试覆盖关键用户流程
- 定期更新和优化测试用例