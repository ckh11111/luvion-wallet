#!/usr/bin/env bash
# 清理占用 1421 端口的进程（之前未正确退出的 Vite/Node）
set -e
PORT="${1:-1421}"
PID=$(lsof -ti :"$PORT" 2>/dev/null || true)
if [ -n "$PID" ]; then
  echo ">>> 正在结束占用端口 $PORT 的进程: $PID"
  kill $PID
  echo ">>> 已结束，端口 $PORT 已释放"
else
  echo ">>> 端口 $PORT 未被占用"
fi
