#!/bin/bash

echo "🔍 测试localhost连接..."

# 测试localhost:4321
echo "测试 http://localhost:4321 ..."
curl -s -w "状态码: %{http_code}\n" http://localhost:4321/ | head -1

# 测试localhost:3000
echo "测试 http://localhost:3000 ..."
curl -s -w "状态码: %{http_code}\n" http://localhost:3000/ | head -1

echo "✅ 连接测试完成"