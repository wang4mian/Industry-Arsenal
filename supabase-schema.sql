-- 创建文章表
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  original_url TEXT NOT NULL,
  description TEXT,
  content TEXT,
  publication_date TIMESTAMP,
  source_name TEXT,
  source_language TEXT DEFAULT 'en',
  fetch_time TIMESTAMP DEFAULT NOW(),
  
  -- 工作流状态
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'selected', 'editing', 'published', 'archived')),
  
  -- AI 处理结果
  ai_summary TEXT,
  ai_keywords TEXT,
  ai_score INTEGER CHECK (ai_score >= 1 AND ai_score <= 10),
  ai_recommendation TEXT,
  
  -- 编辑相关
  editor_notes TEXT,
  edited_content TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_fetch_time ON articles(fetch_time DESC);
CREATE INDEX idx_articles_ai_score ON articles(ai_score DESC);
CREATE INDEX idx_articles_source ON articles(source_name);
CREATE INDEX idx_articles_url ON articles(original_url);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE
    ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入一些示例数据（可选）
INSERT INTO articles (title, original_url, description, source_name, content) VALUES
('3D打印技术在医疗领域的最新应用', 'https://example.com/article1', '探索3D打印技术如何革命性地改变医疗行业', '3D打印网', '详细介绍3D打印在假肢、器官移植等医疗领域的应用...'),
('新一代金属3D打印机发布', 'https://example.com/article2', '某知名公司发布了革命性的金属3D打印设备', '科技日报', '该设备采用最新的激光烧结技术，打印精度提升50%...');

-- 设置行级安全策略（可选，用于多用户环境）
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view all articles" ON articles FOR SELECT USING (true);
-- CREATE POLICY "Users can insert articles" ON articles FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Users can update articles" ON articles FOR UPDATE USING (true);
-- CREATE POLICY "Users can delete articles" ON articles FOR DELETE USING (true);