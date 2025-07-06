#!/bin/bash

echo "🚀 启动OSINT工作台开发环境..."

# 进入项目目录
cd "/Users/simianwang/Desktop/产业编译工作室/osint-workstation"

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动开发服务器
echo "🔥 启动开发服务器 (http://localhost:4321)"
npm run dev