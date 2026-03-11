#!/bin/bash
# 生产发布前清理：Rust 调试符号、前端 console.log、测试环境变量、静态资源混淆
set -e

echo "Running pre-release cleanup..."

# 1. 清理 Rust 调试符号
cargo clean

# 2. 移除所有 .tsx 中的 console.log（macOS: sed -i ''）
if command -v sed >/dev/null 2>&1; then
  if find ./src -name "*.tsx" 2>/dev/null | head -1 | grep -q .; then
    find ./src -name "*.tsx" -exec sed -i '' 's/console\.log(.*);//g' {} + 2>/dev/null || true
  fi
fi

# 3. 抹除 .env.test 里的测试私钥和 API Key
: > .env.test 2>/dev/null || true

# 4. 静态资源混淆（前端 minify）
npm run build -- --minify

echo "Pre-release steps done."
