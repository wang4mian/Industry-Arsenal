# 🔥 定时任务设置指南

## 方案1: GitHub Actions（推荐）

已创建 `.github/workflows/auto-rss-fetch.yml` 文件。

### 设置步骤：

1. **在GitHub仓库中设置Secrets**：
   - `SUPABASE_URL`: https://ewjzuiwhvyfmzrmpnzid.supabase.co
   - `SUPABASE_ANON_KEY`: 你的Supabase匿名密钥

2. **提交代码到GitHub**：
   ```bash
   git add .
   git commit -m "Add auto RSS fetch workflow"
   git push origin main
   ```

3. **验证定时任务**：
   - 进入GitHub仓库 > Actions 标签
   - 查看 "自动RSS抓取" workflow
   - 可以手动触发测试

### 执行时间：
- 每天上午9点（北京时间）
- 可以在 `auto-rss-fetch.yml` 中修改 cron 表达式

---

## 方案2: Supabase pg_cron（需要Pro计划）

### 在Supabase SQL Editor中执行：

```sql
-- 启用pg_cron扩展
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 创建定时任务
SELECT cron.schedule(
    'daily-rss-fetch',
    '0 1 * * *',  -- 每天UTC 1:00 (北京时间9:00)
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=3D+printing&hl=zh-CN&gl=CN&ceid=CN:zh-Hans", "sourceName": "3D Print", "verticalName": "3D打印"}'',
        ''application/json''
    );'
);
```

---

## 方案3: 外部Cron服务

### 使用 cron-job.org 或类似服务：

1. 注册 [cron-job.org](https://cron-job.org)
2. 创建新的cron job
3. 设置URL: `https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss`
4. 设置方法: POST
5. 设置Headers:
   ```
   Content-Type: application/json
   Authorization: Bearer YOUR_SUPABASE_KEY
   ```
6. 设置Body:
   ```json
   {
     "rssUrl": "https://news.google.com/rss/search?q=3D+printing&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
     "sourceName": "3D Print",
     "verticalName": "3D打印"
   }
   ```

---

## 方案4: 本地定时任务

### Linux/macOS crontab：

```bash
# 编辑crontab
crontab -e

# 添加定时任务（每天上午9点）
0 9 * * * curl -X POST 'https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss' \
  -H 'Authorization: Bearer YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"rssUrl": "https://news.google.com/rss/search?q=3D+printing&hl=zh-CN&gl=CN&ceid=CN:zh-Hans", "sourceName": "3D Print", "verticalName": "3D打印"}'
```

---

## 验证定时任务

### 检查RSS抓取结果：

```sql
-- 查看最近的文章
SELECT title, vertical_name, created_at 
FROM articles 
ORDER BY created_at DESC 
LIMIT 20;

-- 查看各垂直领域的文章数量
SELECT vertical_name, COUNT(*) as article_count 
FROM articles 
GROUP BY vertical_name 
ORDER BY article_count DESC;
```

### 推荐方案：
- **开发/测试**: 使用GitHub Actions（方案1）
- **生产环境**: 使用Supabase pg_cron（方案2）或外部服务（方案3）

当前RSS抓取功能已经完全工作，只需要选择一个定时触发方案！