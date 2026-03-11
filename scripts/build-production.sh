#!/bin/bash
# Luvion 生产环境构建指令

echo "Starting Luvion Production Build Pipeline..."

# 1. 优化前端资源（启用压缩与 Tree Shaking）
npm run build

# 2. 执行 Tauri 生产级打包
# 这将生成带有数字签名、经过混淆、并去除了控制台调试信息的二进制安装包
npx tauri build

echo "Build complete. Locate your installers in: src-tauri/target/release/bundle/"
