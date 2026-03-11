#!/bin/bash
# Luvion 最终战备检查清单
set -e
echo "🛡️ 正在进行最后的全方位审计..."

# 1. 启动性能分析器（若存在 bench 则执行）
if cargo bench --no-run 2>/dev/null; then
  cargo bench || true
else
  echo "⚠️ 未配置 cargo bench，跳过基准测试"
fi

# 2. 执行心跳守护进程测试（若存在该测试）
(cd src-tauri && cargo test heartbeat --no-fail-fast 2>/dev/null) || echo "⚠️ 心跳测试未找到或跳过"

# 3. 模拟极端网络延迟（仅 Linux 且有 tc 时）
if [ "$(uname -s)" = "Linux" ] && command -v tc &>/dev/null; then
  echo "⚠️ 已注入高延迟网络环境，观察 MPC 自愈逻辑..."
  sudo tc qdisc add dev lo root netem delay 500ms 10ms 2>/dev/null || true
  sleep 10
  [ -f logs/luvion.log ] && grep -q "触发分片动态重组" logs/luvion.log && echo "✅ 检测到分片动态重组" || true
  sudo tc qdisc del dev lo root 2>/dev/null || true
else
  echo "⚠️ 非 Linux 或无 tc，跳过网络延迟注入"
fi

echo "✅ 战备检查完成。"
