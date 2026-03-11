#!/bin/bash
# 只清理构建缓存和调试信息，不碰核心业务代码

set -e
echo "🧹 清理构建缓存与调试产物..."

# 1. Rust 构建缓存
rm -rf ./src-tauri/target 2>/dev/null || true

# 2. 前端构建产物与缓存
rm -rf ./dist 2>/dev/null || true
rm -rf ./node_modules/.vite 2>/dev/null || true

# 3. 本地调试数据（可选）
rm -rf ./src-tauri/storage/dev_db.json 2>/dev/null || true

echo "✅ 清理完成，核心业务代码未改动。可执行: npx tauri build --release"
# 注意：正式构建请使用 npx tauri build（在项目根目录）
