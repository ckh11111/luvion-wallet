import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cpu,
  Github,
  Globe,
  Lock,
  ShieldCheck,
  Timer,
  Zap,
} from 'lucide-react';

function formatHMS(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(ss)}`;
}

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return remaining;
}

const FeatureCard = ({
  icon,
  title,
  subtitle,
  body,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  body: string;
}) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
    <div className="flex items-start gap-4">
      <div className="mt-1 rounded-2xl bg-white/10 p-3 text-white">{icon}</div>
      <div>
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{subtitle}</div>
      </div>
    </div>
    <p className="mt-6 text-sm leading-relaxed text-white/75">{body}</p>
  </div>
);

const StatPill = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
    <div className="text-[11px] uppercase tracking-widest text-white/50">{k}</div>
    <div className="mt-1 text-lg font-semibold text-white">{v}</div>
  </div>
);

export const Landing = () => {
  const remaining = useCountdown(24 * 60 * 60);

  const whitepaperEnUrl = useMemo(
    () => new URL('../../docs/WHITE_PAPER_EN.html', import.meta.url).toString(),
    [],
  );
  const whitepaperBiUrl = useMemo(
    () => new URL('../../docs/WHITE_PAPER.html', import.meta.url).toString(),
    [],
  );

  const [activeNodes, setActiveNodes] = useState(33);
  const [latency, setLatency] = useState(187);
  const [status, setStatus] = useState<'Optimal' | 'Degraded' | 'Recovering' | 'Halted'>('Optimal');

  useEffect(() => {
    const t = setInterval(() => {
      // Demo telemetry: slight jitter for live-network feel
      setLatency((l) => Math.max(120, Math.min(260, l + (Math.random() > 0.5 ? 7 : -6))));
      setActiveNodes(33);
      setStatus('Optimal');
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#070A12] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-40 right-[-200px] h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-[120px]" />
      </div>

      <header className="relative mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 grid place-items-center border border-white/10">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="font-black tracking-tight text-lg">LUVION</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <a
              className="rounded-xl border border-white/10 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition"
              href={whitepaperEnUrl}
              target="_blank"
              rel="noreferrer"
            >
              Whitepaper (EN)
            </a>
            <a
              className="rounded-xl border border-white/10 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition"
              href={whitepaperBiUrl}
              target="_blank"
              rel="noreferrer"
            >
              Whitepaper (EN+ZH)
            </a>
            <Link
              to="/assets"
              className="rounded-xl bg-white text-black px-4 py-2 font-semibold hover:bg-white/90 transition inline-flex items-center gap-2"
            >
              Open Wallet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <Zap className="h-4 w-4" />
              Aegis-I Testnet • 33-node Mesh • 24h Revocation
            </div>

            <h1 className="mt-6 text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              The First Web3 Wallet with an “Undo” Button.
            </h1>
            <h2 className="mt-6 text-lg lg:text-xl text-white/75 leading-relaxed">
              Quantum-safe. Keyless. 24-hour Revocation. Backed by a 33-node decentralized mesh.
              <span className="block mt-2 text-white/60">
                Same message in short: quantum-safe, keyless, 24h revocation, 33-node mesh.
              </span>
            </h2>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#join"
                className="rounded-2xl bg-emerald-400 text-black px-6 py-4 font-semibold hover:bg-emerald-300 transition inline-flex items-center justify-center gap-2"
              >
                Join Aegis-I Testnet <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={whitepaperEnUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
              >
                Read the Tech Whitepaper <Globe className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6 text-xs text-white/50">
              Tip: In Chrome print dialog, disable “Headers and footers” to export clean PDF.
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.8rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl">
              <div className="rounded-[2.2rem] bg-black/40 border border-white/10 overflow-hidden">
                <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                  <div className="text-sm font-semibold">Transaction</div>
                  <div className="text-xs text-white/60">Protected</div>
                </div>
                <div className="p-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs text-white/60">To</div>
                    <div className="mt-1 font-mono text-sm text-white/90">
                      0x71c8…8888
                    </div>
                    <div className="mt-4 text-xs text-white/60">Amount</div>
                    <div className="mt-1 text-2xl font-semibold">$1,250.00</div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Timer className="h-4 w-4" />
                        Revocation Window
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-wider">
                        {formatHMS(remaining)}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-2xl glow-border bg-[#0B1A10] px-5 py-4 text-left hover:bg-[#0D2013] transition"
                      onClick={() => alert('Revoke (Demo): triggered.')}
                    >
                      <div className="text-xs text-[#39ff14]/80">Revoke</div>
                      <div className="mt-2 text-lg font-semibold text-[#39ff14]">
                        Undo Now
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-white/60">Mesh</div>
                      <div className="text-xs text-emerald-300">Optimal</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/75">
                      <Lock className="h-4 w-4" />
                      Liveness-dependent lock keeps your window safe under attacks.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur grid place-items-center">
              <Cpu className="h-6 w-6 text-white/80" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-20">
        <h3 className="text-2xl font-semibold">Why Luvion?</h3>
        <p className="mt-3 text-white/70 max-w-3xl">
          Not just a wallet UI — a security layer that makes “ownership” resilient to phishing, outages,
          and the quantum era.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Timer className="h-5 w-5" />}
            title="The 24h Safety Net"
            subtitle="L-SG Asset Revocation"
            body="Wrong address? Phished? Every Luvion transaction has up to 24h revocation. Before the countdown ends, you keep full control."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="No seed phrase. No single point of failure."
            subtitle="Trustless DKG + 33/22 MPC"
            body="No seed phrase on paper. Luvion uses 33-node threshold consensus (MPC). Your key never exists in one place; we cannot touch your assets."
          />
          <FeatureCard
            icon={<Globe className="h-5 w-5" />}
            title="Quantum-Proof"
            subtitle="Kyber-768 + Recursive ZK"
            body="Legacy wallets are exposed to quantum compute. Luvion integrates Kyber-768 and recursive ZK on-chain, building a firewall years ahead."
          />
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2.8rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="text-2xl font-semibold">For Developers & Geeks</div>
              <div className="mt-3 text-white/70 max-w-2xl">
                不仅仅是钱包，更是下一代共识网络。具备自适应视图切换（View Change）与活性依赖锁的去中心化网络。
              </div>
              <div className="mt-5 text-xs text-white/50">
                Metrics shown are demo telemetry from testnet-style assumptions.
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
              <StatPill k="Active Nodes" v={`${activeNodes} / 100+ Pool`} />
              <StatPill k="Threshold" v="22 signatures" />
              <StatPill k="Latency" v={`< ${latency}ms`} />
              <StatPill k="Liveness" v={status} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-7">
              <div className="text-sm font-semibold">Code Sketch</div>
              <pre className="mt-4 overflow-auto rounded-2xl bg-black/50 p-5 text-xs leading-relaxed text-white/80 border border-white/10">
{`// Threshold-first aggregation (33/22)
while let Some(res) = responses.next().await {
  if let Ok(share) = res { gathered.push(share); }
  if gathered.len() >= 22 { return combine_shares(gathered); }
}`}
              </pre>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-7">
              <div className="text-sm font-semibold">Liveness-dependent lock</div>
              <pre className="mt-4 overflow-auto rounded-2xl bg-black/50 p-5 text-xs leading-relaxed text-white/80 border border-white/10">
{`if status != Optimal {
  // Pause release: attacks can't shorten revocation window
  return Err("Release paused: network recovering");
}`}
              </pre>
              <div className="mt-4 text-sm text-white/70">
                When the network is unstable, release is paused — not downtime, but active protection of your revocation window.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="join" className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[2.8rem] border border-white/10 bg-white/5 p-10">
          <div className="text-2xl font-semibold">Take back your digital sovereignty. Start today.</div>
          <div className="mt-3 text-white/70">
            Join Aegis-I Testnet to get early access. Read the whitepaper to validate the design.
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <a
              className="rounded-2xl bg-white text-black px-6 py-4 font-semibold hover:bg-white/90 transition inline-flex items-center justify-center gap-2"
              href={whitepaperEnUrl}
              target="_blank"
              rel="noreferrer"
            >
              Whitepaper (EN) <ArrowRight className="h-5 w-5" />
            </a>
            <a
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
              href={whitepaperBiUrl}
              target="_blank"
              rel="noreferrer"
            >
              Whitepaper (EN+ZH) <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/assets"
              className="rounded-2xl bg-emerald-400 text-black px-6 py-4 font-semibold hover:bg-emerald-300 transition inline-flex items-center justify-center gap-2"
            >
              Download / Open Alpha <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-white/60">
            <div>© 2026 Luvion Labs. Confidential Technical Document.</div>
            <div className="flex items-center gap-4">
              <a className="hover:text-white transition inline-flex items-center gap-2" href="https://github.com/" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="hover:text-white transition" href={whitepaperEnUrl} target="_blank" rel="noreferrer">
                Whitepaper
              </a>
              <a className="hover:text-white transition" href="#join">
                Node Setup Guide
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

