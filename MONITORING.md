# CELPIP Compass 监控配置

## 概述

本文档详细介绍了 CELPIP Compass 项目的监控和日志管理配置，确保应用在生产环境中的稳定性、性能和安全性。

## 目录

- [监控架构](#监控架构)
- [指标收集](#指标收集)
- [日志管理](#日志管理)
- [告警配置](#告警配置)
- [仪表板](#仪表板)
- [故障排查](#故障排查)

## 监控架构

### 监控栈组件

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Application  │    │   Infrastructure│    │     Logs        │
│   (Metrics)     │    │   (Metrics)     │    │     (Logging)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────┬──────────────────┴──────────────────────┘
                 │
          ┌──────▼───────────────────────────────────────┐
          │              Prometheus                      │
          │              (Time Series DB)                │
          └──────┬───────────────────────────────────────┘
                 │
          ┌──────▼───────────────────────────────────────┐
          │              Grafana                         │
          │             (Visualization)                 │
          └───────────────────────────────────────────────┘
```

### 关键监控指标

1. **应用指标**
   - HTTP 请求率、延迟、错误率
   - 内存使用率、CPU 使用率
   - 数据库连接池状态

2. **基础设施指标**
   - 服务器资源使用情况
   - 网络流量和延迟
   - 磁盘空间和 I/O 性能

3. **业务指标**
   - 用户活跃度
   - 学习进度统计
   - API 调用成功率

## 指标收集

### 1. Prometheus 配置

**Prometheus 配置文件** (`monitoring/prometheus.yml`):

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'celpip-app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
```

**应用指标暴露**:

```javascript
// 添加指标收集到现有 API
app.get('/api/metrics', async (req, res) => {
  const metrics = await collectMetrics();
  res.set('Content-Type', register.contentType);
  res.end(metrics);
});
```

### 2. 自定义指标

**API 指标**:
```javascript
const promClient = require('prom-client');

// 创建指标
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const activeUsers = new promClient.Gauge({
  name: 'active_users_count',
  help: 'Number of active users'
});

// 在中间件中记录指标
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || 'unknown', res.statusCode)
      .observe(duration);
  });

  next();
});
```

### 3. 导出器配置

**Node Exporter**:
```bash
# 在服务器上安装
sudo docker run -d \
  -p 9100:9100 \
  -v "/proc:/host/proc:ro" \
  -v "/sys:/host/sys:ro" \
  -v "/:/rootfs:ro" \
  prom/node-exporter
```

**PostgreSQL Exporter**:
```bash
sudo docker run -d \
  -e DATA_SOURCE_NAME="postgresql://postgres:password@postgres:5432/celpip_dev" \
  -p 9187:9187 \
  prometheuscommunity/postgres-exporter
```

## 日志管理

### 1. 日志配置

**Winston 日志配置** (`app/utils/logger.ts`):

```javascript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});
```

### 2. 结构化日志

**日志格式标准**:
```json
{
  "timestamp": "2025-12-30T10:00:00.000Z",
  "level": "info",
  "service": "celpip-app",
  "requestId": "abc123",
  "message": "User logged in successfully",
  "metadata": {
    "userId": "user123",
    "method": "POST",
    "url": "/api/v1/auth/login",
    "ip": "192.168.1.100",
    "duration": 245
  }
}
```

### 3. 日志聚合

**ELK Stack 配置**:
```yaml
# docker-compose.yml for ELK
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
```

### 4. 日志轮转

**Logrotate 配置**:
```bash
# /etc/logrotate.d/celpip-app
/var/log/celpip/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        # 重启应用服务
        systemctl reload celpip-app
    endscript
}
```

## 告警配置

### 1. Alertmanager 配置

**Alertmanager 配置** (`monitoring/alertmanager.yml`):

```yaml
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@celpip-compass.com'
  smtp_auth_username: 'alerts@celpip-compass.com'
  smtp_auth_password: 'your-password'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
- name: 'web.hook'
  email_configs:
  - to: 'devops@celpip-compass.com'
    subject: 'Alert: {{ .GroupLabels.alertname }}'
```

### 2. 告警规则

**Prometheus 告警规则** (`monitoring/rules.yml`):

```yaml
groups:
- name: celpip-app
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} for 5 minutes"

  - alert: HighResponseTime
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High response time detected"
      description: "95th percentile response time is {{ $value }} seconds"

  - alert: LowMemory
    expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes < 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Low memory on {{ $labels.instance }}"
      description: "Memory usage is below 10%"
```

### 3. Slack 集成

**Slack Webhook 配置**:
```javascript
// 发送告警到 Slack
async function sendSlackAlert(message) {
  const webhook = process.env.SLACK_WEBHOOK_URL;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 *Alert* ${message}`,
      channel: '#alerts',
      username: 'Prometheus'
    })
  });
}
```

## 仪表板

### 1. Grafana 仪表板

**数据源配置**:
1. 在 Grafana 中添加 Prometheus 数据源
2. 配置数据源 URL: `http://prometheus:9090`

**仪表板模板**:

**仪表板 1: 应用概览**
```
Title: Application Overview
Panels:
1. HTTP 请求率 (图表)
   Query: rate(http_requests_total[5m])

2. 错误率 (仪表板)
   Query: sum(rate(http_requests_total{status=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m]))

3. 响应时间 (图表)
   Query: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

4. 活跃用户 (数字)
   Query: active_users_count
```

**仪表板 2: 基础设施**
```
Title: Infrastructure Overview
Panels:
1. CPU 使用率 (仪表板)
   Query: 1 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])))

2. 内存使用率 (仪表板)
   Query: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

3. 磁盘使用率 (仪表板)
   Query: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100

4. 网络流量 (图表)
   Query: rate(node_network_receive_bytes_total[5m])
```

### 2. 仪表板导入

**Grafana Dashboard IDs**:
- 应用监控: 1234
- 基础设施: 5678
- 日志分析: 9012

**导入命令**:
```bash
grafana-cli --homepath /var/lib/grafana \
    --config /etc/grafana/grafana.ini \
    plugins install grafana-clock-panel

grafana-cli --homepath /var/lib/grafana \
    --config /etc/grafana/grafana.ini \
    dashboards import 1234
```

### 3. 自定义面板

**自定义面板配置**:
```json
{
  "dashboard": {
    "title": "CELPIP Compass Performance",
    "panels": [
      {
        "id": 1,
        "title": "User Registration Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(user_registrations_total[5m])",
            "legendFormat": "{{method}}"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "req/s"
          }
        }
      }
    ]
  }
}
```

## 故障排查

### 1. 常见问题

**Prometheus 无法抓取指标**
```bash
# 检查服务状态
curl http://localhost:3000/api/metrics

# 检查 Prometheus 配置
curl http://localhost:9090/-/healthy

# 查看 Prometheus 日志
docker logs prometheus
```

**数据丢失**
```bash
# 检查存储配置
curl http://localhost:9090/api/v1/status/tsdb

# 检查磁盘空间
df -h
```

**告警不触发**
```bash
# 测试告警规则
curl -G "http://localhost:9090/api/v1/rules" --data-urlencode 'query=ALERTS{alertname="HighErrorRate"}'

# 检查 Alertmanager 状态
curl http://localhost:9093/api/v1/status
```

### 2. 性能优化

**Prometheus 优化**:
```yaml
# 优化 prometheus.yml
global:
  scrape_interval: 30s  # 减少抓取频率
  evaluation_interval: 30s

storage:
  tsdb:
    retention.time: 200h  # 保留时间
    retention.size: 10GB   # 保留大小

# 优化查询性能
query:
  timeout: 30s
  max_concurrency: 20
```

**Grafana 优化**:
- 使用数据缓存
- 优化查询语句
- 定期清理历史数据

### 3. 监控最佳实践

1. **指标命名规范**
   - 使用 `snake_case` 命名
   - 包含单位信息
   - 使用有意义的标签

2. **告警策略**
   - 设置合理的阈值
   - 实施告警分级
   - 避免告警风暴

3. **文档维护**
   - 更新监控文档
   - 记录告警规则
   - 维护联系信息

### 4. 监控报告

**每日报告**:
```bash
#!/bin/bash
# 生成每日监控报告
curl -G "http://localhost:9090/api/v1/query_range" \
  --data-urlencode 'query=sum(rate(http_requests_total[24h]))' \
  --data-urlencode 'start=now-24h' \
  --data-urlencode 'end=now' \
  --data-urlencode 'step=1h' > daily_report.json
```

**周报生成**:
- 应用性能趋势
- 错误率统计
- 用户活跃度分析
- 系统资源使用情况

---

## 支持

如果遇到监控相关问题，请：

1. 检查服务状态
2. 查看相关日志
3. 验证配置文件
4. 参考 Prometheus 和 Grafana 官方文档

**文档版本**: 1.0.0
**最后更新**: 2025-12-30