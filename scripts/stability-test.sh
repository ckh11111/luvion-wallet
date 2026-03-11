#!/bin/bash
# 全链路稳定性测试

set -e
echo "🚀 开始全链路稳定性测试..."

# 1. 测试多语言排版 (检查是否出现截断)
npm run test:i18n -- --lang=zh-CN
echo "✅ 中文排版测试通过"

# 2. 模拟提现 2FA 逻辑 (检查是否正确拦截非法调用)
cargo test --manifest-path src-tauri/Cargo.toml --test withdraw_auth_flow
echo "✅ 2FA 安全拦截测试通过"

# 3. 模拟节点投毒攻击 (检查 Merkle 校验与自愈)
cargo test --manifest-path src-tauri/Cargo.toml --test node_poisoning_stress_test
echo "✅ 节点自愈与投毒拦截通过"

echo "🎉 恭喜，所有模块已通过生产级别测试！"
