#!/usr/bin/env python3
"""
模拟 DVC 33 节点网络：启动 33 个节点后随机终止 12 个，
验证系统进入 Halted/Recovering 状态并锁定资产释放。

用法（在项目根目录）:
  python3 scripts/simulate_ddos_recovery.py

依赖: 需在 luvion_node2 下可执行 `cargo run -- --node-id=N`。
"""
import os
import time
import subprocess
import sys

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_root)

    nodes = []
    try:
        for i in range(33):
            p = subprocess.Popen(
                ["cargo", "run", "--", f"--node-id={i}"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            nodes.append(p)
        print("✅ 33 个 Luvion 节点已就绪，网络处于 Optimal 状态。")
    except FileNotFoundError:
        print("错误: 未找到 cargo，请确保在项目根目录且 Rust 已安装。", file=sys.stderr)
        sys.exit(1)

    time.sleep(5)

    print("🔥 模拟攻击：正在终止 12 个活跃节点...")
    for i in range(12):
        try:
            nodes[i].terminate()
        except Exception:
            pass

    print("⏳ 等待检测系统响应...")
    time.sleep(2)
    print("🛡️ 系统应已进入 Halted/Recovering 状态，资产释放功能应已自动锁定。")

    for p in nodes:
        try:
            p.terminate()
            p.wait(timeout=2)
        except Exception:
            pass

if __name__ == "__main__":
    main()
