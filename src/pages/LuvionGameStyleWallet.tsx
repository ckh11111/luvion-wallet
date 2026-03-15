import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function LuvionGameStyleWallet() {
  const [activeTab, setActiveTab] = useState<'assets' | 'recovery'>('assets');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/recovery') setActiveTab('recovery');
    else if (location.pathname === '/assets') setActiveTab('assets');
  }, [location.pathname]);

  const currentShardCount = 12;
  const totalShards = 33;

  return (
    <div className="flex h-screen w-full bg-[#0a0f1a] overflow-hidden text-white font-sans">
      {/* 侧边导航栏 - 极简深色玻璃态 */}
      <nav className="w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 flex flex-col z-50">
        <div className="p-8">
          <h1 className="text-4xl font-pixel tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">LUVION</h1>
          <p className="text-[#FFD644] text-xs font-bold mt-1 tracking-wider uppercase">Protocol v2.0</p>
        </div>

        <div className="flex flex-col gap-2 px-6 mt-4">
          <button
            onClick={() => setActiveTab('assets')}
            className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'assets' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            资产大厅
          </button>
          <button
            onClick={() => setActiveTab('recovery')}
            className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'recovery' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            分片自愈 <span className="ml-2 text-[10px] bg-[#FFD644] text-black px-2 py-0.5 rounded-full">核心</span>
          </button>
          <button type="button" className="text-left px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5">
            系统设置
          </button>
        </div>
      </nav>

      {/* 右侧主内容区 - 可滚动的画卷 */}
      <main className="flex-1 overflow-y-auto relative">
        {/* ================= 视图 1：资产大厅 ================= */}
        {activeTab === 'assets' && (
          <div className="flex flex-col min-h-full">
            <div className="relative w-full h-[45vh] flex flex-col justify-center px-16 group overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="relative z-10">
                <div className="inline-block border border-white/30 rounded-full px-3 py-1 text-xs font-bold mb-4 backdrop-blur-md">
                  ✨ 主网已连接
                </div>
                <h2 className="text-6xl font-game tracking-wider drop-shadow-lg mb-2">$0.00 <span className="text-2xl text-gray-300">USD</span></h2>
                <p className="text-gray-300 font-pixel text-lg mb-8">LVN-UNINITIALIZED...</p>

                <div className="flex gap-4">
                  <button type="button" className="bg-[#FFD644] hover:bg-yellow-400 text-black font-bold px-8 py-2.5 rounded-full shadow-[0_4px_14px_0_rgba(255,214,68,0.39)] transition-transform active:scale-95">
                    初始化加密
                  </button>
                  <button type="button" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-2.5 rounded-full transition-transform active:scale-95">
                    接收
                  </button>
                  <button type="button" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-2.5 rounded-full transition-transform active:scale-95">
                    提现
                  </button>
                </div>
              </div>
            </div>

            <div className="relative w-full flex-1 flex flex-col justify-start px-16 py-12 group overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

              <div className="relative z-10 w-full max-w-4xl">
                <h3 className="font-game text-3xl mb-6">跨链资产列表</h3>

                <div className="space-y-4">
                  <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FFD644] text-black font-bold rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,214,68,0.5)]">L</div>
                      <div>
                        <h4 className="text-xl font-bold">LUVION Network</h4>
                        <p className="text-xs text-[#FFD644] mt-1">POST-QUANTUM PROTECTED</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-game">0 <span className="text-sm font-sans text-gray-400">LVN</span></p>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-700 text-white font-bold rounded-xl flex items-center justify-center text-xl">E</div>
                      <div>
                        <h4 className="text-xl font-bold">ETH Network</h4>
                        <p className="text-xs text-[#FFD644] mt-1">POST-QUANTUM PROTECTED</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-game">1.24 <span className="text-sm font-sans text-gray-400">ETH</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 视图 2：分片自愈 ================= */}
        {activeTab === 'recovery' && (
          <div className="relative w-full min-h-full flex flex-col justify-center px-16 group overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2168&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A001A] via-[#0A001A]/80 to-transparent" />

            <div className="relative z-10 w-full max-w-4xl mx-auto py-20">
              <div className="inline-block border border-[#FFD644]/50 text-[#FFD644] rounded-full px-3 py-1 text-xs font-bold mb-4 backdrop-blur-md bg-black/40">
                ⚡ 门限恢复模式
              </div>
              <h2 className="text-5xl font-game tracking-wider drop-shadow-lg mb-2">Shard Recovery</h2>
              <p className="text-gray-300 mb-10 max-w-xl leading-relaxed">
                系统正在聚合并验证分布式网格中的安全分片。收集进度达到门限值即可恢复资产控制权。
              </p>

              <div className="mb-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-lg">当前进度</span>
                  <span className="font-game text-3xl text-[#FFD644]">{currentShardCount} <span className="text-lg text-gray-500">/ {totalShards}</span></span>
                </div>
                <div className="h-4 w-full bg-black/50 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-[#FFD644] rounded-full shadow-[0_0_10px_#FFD644]"
                    style={{ width: `${(currentShardCount / totalShards) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center text-xl font-game transition-all duration-300
                      ${i < currentShardCount
                        ? 'bg-[#FFD644] text-black shadow-[0_0_20px_rgba(255,214,68,0.6)] scale-105'
                        : 'bg-black/40 border-2 border-dashed border-white/20 text-white/30 backdrop-blur-md'}
                    `}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>

              <button type="button" className="bg-[#FFD644] hover:bg-yellow-400 text-black font-bold px-10 py-3 rounded-full text-lg shadow-[0_4px_20px_rgba(255,214,68,0.4)] transition-transform active:scale-95">
                启动生物验证
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
