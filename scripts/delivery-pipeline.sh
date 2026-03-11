#!/bin/bash
set -e
echo "🚀 启动 Luvion V1.0.0 交付流水线..."

# 1. 安全审计：确保没有已知的 CVE 漏洞（若无法访问 GitHub 可设 SKIP_AUDIT=1 跳过）
if [ "${SKIP_AUDIT}" = "1" ]; then
  echo "⚠️ 已跳过安全审计 (SKIP_AUDIT=1)"
elif (cd src-tauri && cargo audit 2>/dev/null); then
  echo "✅ 安全审计通过"
else
  echo "⚠️ 安全审计未通过（若为 couldn't fetch advisory database 多为网络/防火墙原因，可执行 SKIP_AUDIT=1 ./scripts/delivery-pipeline.sh 跳过审计继续）"
  exit 1
fi

# 2. 性能压力测试：模拟 100 种攻击
python3 scripts/luvion_red_team.py --full-suite

# 3. 产物净化：移除所有调试信息
./scripts/purge-dev.sh

# 4. 正式构建
npm run build:tauri

echo "✅ 交付产物已生成至：src-tauri/target/release/bundle/"
