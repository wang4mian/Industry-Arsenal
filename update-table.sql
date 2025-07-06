-- 为现有的 "OSINT Workstation" 表添加必要字段
ALTER TABLE public."OSINT Workstation" 
ADD COLUMN IF NOT EXISTS "score_ai" INTEGER CHECK ("score_ai" >= 1 AND "score_ai" <= 10),
ADD COLUMN IF NOT EXISTS "summary_ai" TEXT,
ADD COLUMN IF NOT EXISTS "is_selected" BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS "final_summary" TEXT,
ADD COLUMN IF NOT EXISTS "order_position" INTEGER DEFAULT 0;

-- 添加索引提升查询性能
CREATE INDEX IF NOT EXISTS idx_osint_is_selected ON public."OSINT Workstation"("is_selected");
CREATE INDEX IF NOT EXISTS idx_osint_score ON public."OSINT Workstation"("score_ai" DESC);

-- 添加一些测试数据
INSERT INTO public."OSINT Workstation" 
("Title", "InfoSource", "Original_Article_Link", "Source_Language", "Vertical_Name", "score_ai", "summary_ai") 
VALUES 
('3D打印技术革新医疗行业', 'TechCrunch', 'https://example.com/article1', 'zh', '医疗科技', 9, '3D打印技术在假肢制造和器官移植领域取得重大突破，为患者带来新希望。'),
('新型金属3D打印材料问世', '科技日报', 'https://example.com/article2', 'zh', '材料科学', 7, '研究人员开发出强度更高的金属3D打印材料，有望应用于航空航天领域。'),
('SpaceX使用3D打印制造火箭部件', 'Space News', 'https://example.com/article3', 'en', '航空航天', 8, 'SpaceX采用3D打印技术制造关键火箭部件，大幅降低成本并提高生产效率。')
ON CONFLICT DO NOTHING;