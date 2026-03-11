#!/bin/bash
# Luvion 商业化清理脚本

echo "🧹 正在清理开发环境数据..."

# 1. 移除前端 console.log（仅匹配单行）
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' '/^[[:space:]]*console\.log(/d' {} \; 2>/dev/null || true

# 2. 移除 Rust 后端 println!（仅匹配单行）
find ./src-tauri -type f -name "*.rs" -exec sed -i '' '/^[[:space:]]*println!(/d' {} \; 2>/dev/null || true

# 3. 正式版号：App.tsx 内版本文案
if [ -f ./src/App.tsx ]; then
  sed -i '' 's/v0.9.1-BETA/v1.0.0-STABLE/g' ./src/App.tsx
fi

# 4. 重置本地模拟节点数据
rm -rf ./src-tauri/storage/dev_db.json 2>/dev/null || true

echo "✅ 清理完成，Luvion 已准备好进入生产构建。"
