#!/usr/bin/env python3
"""模拟 Luvion 网格中随机断开 N 个节点（用于压力测试 18-10 门限）。"""
import argparse
import random
import sys

def main():
    p = argparse.ArgumentParser(description="Simulate dropping N nodes from the mesh.")
    p.add_argument("--count", type=int, default=8, help="Number of nodes to drop (default: 8)")
    args = p.parse_args()
    n = max(0, min(18, args.count))
    dropped = random.sample(range(1, 19), n)
    print(f"Simulated drop: nodes {sorted(dropped)}")
    sys.exit(0)

if __name__ == "__main__":
    main()
