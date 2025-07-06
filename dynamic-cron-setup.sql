-- 🔥 动态RSS定时任务 - 基于rss_sources表

-- 第1步：清理硬编码的定时任务
SELECT cron.unschedule('fetch-rss-3d-print');
SELECT cron.unschedule('fetch-rss-seo');
SELECT cron.unschedule('fetch-rss-agritech');
SELECT cron.unschedule('fetch-rss-smart-agriculture');
SELECT cron.unschedule('fetch-rss-additive-manufacturing');

-- 第2步：创建动态抓取函数
CREATE OR REPLACE FUNCTION fetch_all_rss_sources()
RETURNS void AS $$
DECLARE
    rss_record RECORD;
    response_result TEXT;
BEGIN
    -- 遍历所有活跃的RSS源
    FOR rss_record IN 
        SELECT id, name, url, vertical_name 
        FROM rss_sources 
        WHERE is_active = true 
    LOOP
        BEGIN
            -- 调用RSS抓取函数
            SELECT http_post(
                'https://ewjzuiwhvyfmzrmpnzid.supabase.co/functions/v1/fetch-rss',
                json_build_object(
                    'rssUrl', rss_record.url,
                    'sourceName', rss_record.name,
                    'verticalName', rss_record.vertical_name
                )::text,
                'application/json'
            ) INTO response_result;
            
            -- 更新最后抓取时间
            UPDATE rss_sources 
            SET last_fetch_time = NOW() 
            WHERE id = rss_record.id;
            
            -- 记录成功日志
            INSERT INTO cron_rss_logs (job_name, status, message)
            VALUES (
                'fetch_all_rss_sources',
                'success',
                'Successfully fetched: ' || rss_record.name
            );
            
        EXCEPTION WHEN OTHERS THEN
            -- 记录错误日志
            INSERT INTO cron_rss_logs (job_name, status, message)
            VALUES (
                'fetch_all_rss_sources',
                'error',
                'Failed to fetch ' || rss_record.name || ': ' || SQLERRM
            );
        END;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 第3步：创建单个定时任务，抓取所有RSS源
SELECT cron.schedule(
    'fetch-all-rss-daily',
    '0 1 * * *',  -- 每天上午9点
    'SELECT fetch_all_rss_sources();'
);

-- 第4步：验证设置
SELECT jobname, schedule, active FROM cron.job WHERE jobname = 'fetch-all-rss-daily';

-- 第5步：测试函数
SELECT fetch_all_rss_sources();

-- 第6步：查看日志
SELECT * FROM cron_rss_logs ORDER BY executed_at DESC LIMIT 10;