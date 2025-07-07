-- 为现有的 articles 表添加 content 字段来存储全文内容
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS content TEXT;

-- 添加注释说明字段用途
COMMENT ON COLUMN public.articles.content IS 'Full article content extracted by Jina Reader API';

-- 可选：添加索引以提升搜索性能（如果需要全文搜索）
-- CREATE INDEX IF NOT EXISTS idx_articles_content_search ON public.articles USING gin(to_tsvector('english', content));