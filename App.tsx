import React, { useState, useEffect } from "react";
import { Copy, CheckCheck, RotateCcw, Globe } from "lucide-react";
import "./index.css";

const T = {
  en: {
    sub: "Post-Quantum Vault",
    activate: "Open Vault",
    generating: "Generating",
    balance: "Balance",
    address: "Address",
    copy: "Copy",
    copied: "Copied",
    shardTitle: "Shard Recovery",
    shardDesc: "18 nodes · Any 10 reconstruct full access",
    required: "Required",
    redundant: "Redundant",
    latency: "Latency",
    algorithm: "Protocol",
    reset: "Reset",
    active: "Active",
    standby: "Standby",
    nodes: "Nodes",
  },
  zh: {
    sub: "后量子金库",
    activate: "开启金库",
    generating: "生成中",
    balance: "余额",
    address: "地址",
    copy: "复制",
    copied: "已复制",
    shardTitle: "分片找回",
    shardDesc: "18 个节点 · 任意 10 个可恢复完整访问",
    required: "必需",
    redundant: "冗余",
    latency: "延迟",
    algorithm: "协议",
    reset: "重置",
    active: "运行中",
    standby: "待机",
    nodes: "节点",
  },
};

const mockWallet = {
  address: "LVN-QX7B-9M2K-PQC-8822-F3D1-90X7-SHARD-10",
  algorithm: "ML-KEM-768",
  shards_total: 18,
  shards_threshold: 10,
  latency_ms: 12.4,
};

const entropySteps = [
  "CSPRNG_INIT",
  "KEY_GEN",
  "NOISE_SAMPLE",
  "ENCAPSULATE",
  "SHARD_DIST",
  "MERKLE_COMMIT",
  "MESH_BROADCAST",
  "SEALED",
];

export default function App() {
  const [wallet, setWallet] = useState<typeof mockWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [copied, setCopied] = useState(false);
  const [activeShards, setActiveShards] = useState(0);
  const [tick, setTick] = useState(0);
  const [step, setStep] = useState(0);
  const [stepLabel, setStepLabel] = useState("");
  const t = T[lang];

  useEffect(() => {
    if (!wallet) return;
    const id = setInterval(() => setTick((n) => n + 1), 2500);
    return () => clearInterval(id);
  }, [wallet]);

  useEffect(() => {
    if (!wallet) { setActiveShards(0); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setActiveShards(i);
      if (i >= wallet.shards_total) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [wallet]);

  const liveLatency = wallet
    ? (wallet.latency_ms + Math.sin(tick * 0.9) * 1.6).toFixed(1)
    : null;

  const initWallet = () => {
    setLoading(true);
    setStep(0);
    let s = 0;
    const id = setInterval(() => {
      s++;
      setStep(s);
      setStepLabel(entropySteps[s - 1] ?? "");
      if (s >= entropySteps.length) {
        clearInterval(id);
        setTimeout(() => { setWallet(mockWallet); setLoading(false); }, 300);
      }
    }, 240);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet!.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => { setWallet(null); setActiveShards(0); };
  const progress = (step / entropySteps.length) * 100;

  return (
    <div className="root">
      {/* Header */}
      <header className="hd">
        <div className="hd-l">
          <span className="brand">LUVION</span>
          <span className="brand-sub">{t.sub}</span>
        </div>
        <div className="hd-r">
          <div className={`pip-wrap ${wallet ? "pip-on" : ""}`}>
            <span className="pip" />
            <span className="pip-txt">{wallet ? t.active : t.standby}</span>
          </div>
          <button className="lang-btn" onClick={() => setLang(l => l === "zh" ? "en" : "zh")}>
            <Globe size={11} strokeWidth={1.5} />
            {lang === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main">

        {/* Left */}
        <section className="col col-l">

          {/* Balance */}
          <div className="block">
            <div className="lbl">{t.balance}</div>
            <div className="bal">
              <span className="bal-sym">$</span>
              <span className="bal-num">0.00</span>
            </div>
            <div className="bal-unit">USD · LVN</div>
          </div>

          <div className="divider" />

          {/* Address */}
          <div className="block">
            <div className="lbl">{t.address}</div>
            <div className="addr">{wallet ? wallet.address : "—"}</div>
            {wallet && (
              <button className={`cp-btn ${copied ? "ok" : ""}`} onClick={copyAddress}>
                {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
                {copied ? t.copied : t.copy}
              </button>
            )}
          </div>

          <div className="divider" />

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-val">
                {wallet ? <>{liveLatency}<span className="stat-u">ms</span></> : "—"}
              </div>
              <div className="lbl">{t.latency}</div>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <div className="stat-val stat-sm">{wallet ? wallet.algorithm : "—"}</div>
              <div className="lbl">{t.algorithm}</div>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <div className="stat-val">{wallet ? "18" : "—"}</div>
              <div className="lbl">{t.nodes}</div>
            </div>
          </div>

          <div className="divider" />

          {/* CTA */}
          <div className="cta">
            {!wallet && !loading && (
              <button className="open-btn" onClick={initWallet}>
                {t.activate}
              </button>
            )}

            {loading && (
              <div className="ent">
                <div className="ent-row">
                  <span className="lbl">{t.generating}</span>
                  <span className="ent-pct">{Math.round(progress)}%</span>
                </div>
                <div className="ent-track">
                  <div className="ent-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="ent-label">{stepLabel}</div>
                <div className="ent-dots">
                  {entropySteps.map((_, i) => (
                    <span key={i} className={`dot ${i < step ? "dot-on" : ""}`} />
                  ))}
                </div>
              </div>
            )}

            {wallet && (
              <button className="rst-btn" onClick={reset}>
                <RotateCcw size={10} strokeWidth={1.5} />
                {t.reset}
              </button>
            )}
          </div>

          <div className="col-foot">
            NIST FIPS 203 · ML-KEM-768 · v2.1
          </div>
        </section>

        <div className="v-div" />

        {/* Right */}
        <section className="col col-r">

          <div className="block">
            <div className="lbl">{t.shardTitle}</div>
            <div className="frac-row">
              <div className="frac">
                <span className="frac-a">{wallet ? wallet.shards_threshold : "10"}</span>
                <span className="frac-sep">/</span>
                <span className="frac-b">{wallet ? wallet.shards_total : "18"}</span>
              </div>
              <div className="legend">
                <div className="leg">
                  <span className="leg-sq leg-on" />
                  {t.required}
                </div>
                <div className="leg">
                  <span className="leg-sq" />
                  {t.redundant}
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Shard grid */}
          <div className="grid">
            {Array.from({ length: 18 }).map((_, i) => {
              const on = i < activeShards;
              const req = i < (wallet?.shards_threshold ?? 0);
              return (
                <div
                  key={i}
                  className={`shard ${on ? (req ? "s-req" : "s-ext") : ""}`}
                  style={on ? { animationDelay: `${i * 70}ms` } : {}}
                >
                  {String(i + 1).padStart(2, "0")}
                  {on && req && <span className="s-pip" />}
                </div>
              );
            })}
          </div>

          <div className="divider" />

          <p className="shard-desc">{t.shardDesc}</p>

          {/* Topology */}
          <div className="topo">
            {[0, 1, 2].map(row => (
              <div key={row} className="topo-row">
                {[0,1,2,3,4,5].map(col => {
                  const idx = row * 6 + col;
                  const on = idx < activeShards;
                  return (
                    <div key={col} className="topo-cell">
                      <div className={`t-node ${on ? "t-on" : ""}`} />
                      {col < 5 && <div className={`t-edge ${on && idx+1 < activeShards ? "t-edge-on" : ""}`} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="ft">
        <span>LUVION PQC ENGINE</span>
        <span className="ft-dot">·</span>
        <span>ML-KEM-768</span>
        <span className="ft-r">© 2025</span>
      </footer>
    </div>
  );
}
