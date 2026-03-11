#!/bin/bash
set -e
echo "🚀 正在启动 Luvion 动态网格压力测试..."

# 1. 模拟 18 个节点正常运行
# 2. 随机断开其中 8 个节点 (18-10 门限边界)
echo "⚠️ 模拟网络风暴：随机切断 8 个节点的连接..."
python3 scripts/simulate_network_drop.py --count 8

# 3. 验证 Kademlia 是否能自动寻找替代节点
# 4. 验证 MPC 签名是否依然能产生有效的区块链交易
echo "🔍 检查分片完整性..."
npm run test:mesh-integrity

echo "✅ 网格压力测试完成。"
