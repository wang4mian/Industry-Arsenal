-- 🔥 Supabase 定时任务设置
-- 设置每天自动抓取RSS源

-- 启用 pg_cron 扩展（如果还没有启用）
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 删除现有的定时任务（如果存在）
SELECT cron.unschedule('fetch-rss-3d-print');
SELECT cron.unschedule('fetch-rss-seo');
SELECT cron.unschedule('fetch-rss-agritech');
SELECT cron.unschedule('fetch-rss-smart-agriculture');
SELECT cron.unschedule('fetch-rss-additive-manufacturing');

-- 🔥 创建定时任务 - 每天上午9点执行
-- 任务1: 3D Print RSS抓取
SELECT cron.schedule(
    'fetch-rss-3d-print',
    '0 9 * * *',  -- 每天上午9点
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=3D+printing&hl=zh-CN&gl=CN&ceid=CN:zh-Hans", "sourceName": "3D Print", "verticalName": "3D打印"}'',
        ''application/json''
    );'
);

-- 任务2: SEO RSS抓取  
SELECT cron.schedule(
    'fetch-rss-seo',
    '5 9 * * *',  -- 每天上午9点05分
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=SEO&hl=zh-CN&gl=CN&ceid=CN:zh-Hans", "sourceName": "SEO News", "verticalName": "SEO"}'',
        ''application/json''
    );'
);

-- 任务3: AgriTech RSS抓取
SELECT cron.schedule(
    'fetch-rss-agritech',
    '10 9 * * *',  -- 每天上午9点10分
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=农业机器人&hl=zh-CN&gl=CN&ceid=CN:zh-Hans", "sourceName": "AgriTech", "verticalName": "农业科技"}'',
        ''application/json''
    );'
);

-- 任务4: Smart Agriculture RSS抓取
SELECT cron.schedule(
    'fetch-rss-smart-agriculture',
    '15 9 * * *',  -- 每天上午9点15分
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=Smart+Agriculture&hl=en&gl=US&ceid=US:en", "sourceName": "Smart Agriculture", "verticalName": "智慧农业"}'',
        ''application/json''
    );'
);

-- 任务5: Additive Manufacturing RSS抓取
SELECT cron.schedule(
    'fetch-rss-additive-manufacturing',
    '20 9 * * *',  -- 每天上午9点20分
    'SELECT net.http_post(
        ''https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss'',
        ''{"rssUrl": "https://news.google.com/rss/search?q=additivemanufacturing&hl=en&gl=US&ceid=US:en", "sourceName": "Additive Manufacturing", "verticalName": "增材制造"}'',
        ''application/json''
    );'
);

-- 🔥 查看所有定时任务
SELECT jobname, schedule, command, active FROM cron.job;

-- 🔥 查看定时任务执行日志
-- SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;