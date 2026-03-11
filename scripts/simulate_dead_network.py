#!/usr/bin/env python3
"""模拟死网络（500ms 延迟），观察 Luvion 网格自愈与分片动态重组。仅 Linux 有效。"""
import subprocess
import sys
import time

LOGFILE = "logs/luvion.log"
RESHARING_MARKER = "触发分片动态重组"


def check_logs_for_resharing():
    try:
        with open(LOGFILE, "r", encoding="utf-8", errors="ignore") as f:
            return RESHARING_MARKER in f.read()
    except FileNotFoundError:
        return False


def simulate_dead_network():
    if sys.platform != "linux":
        print("⚠️ tc 仅支持 Linux，当前为", sys.platform, "，跳过网络注入")
        return
    print("🌐 注入 500ms 延迟，模拟网络风暴...")
    subprocess.run(
        ["sudo", "tc", "qdisc", "add", "dev", "lo", "root", "netem", "delay", "500ms"],
        check=False,
    )
    start_time = time.time()
    while time.time() - start_time < 10:
        if check_logs_for_resharing():
            print("🏆 测试成功：网格在极端延迟下完成自愈！")
            break
        time.sleep(1)
    subprocess.run(["sudo", "tc", "qdisc", "del", "dev", "lo", "root"], check=False)
    print("✅ 网络已恢复")


if __name__ == "__main__":
    simulate_dead_network()
