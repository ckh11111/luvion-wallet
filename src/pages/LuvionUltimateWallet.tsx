import { useState } from 'react';

// 1. 模拟资产数据
const INITIAL_ASSETS = [
  { name: 'LUVION Crystal', symbol: 'L', balance: 0, safe: true },
  { name: 'ETH Ore', symbol: 'E', balance: 1.24, safe: true },
  { name: 'USDC Coin', symbol: 'U', balance: 500.0, safe: true },
];

const PixelText = ({ text }: { text: string }) => (
  <span style={{ letterSpacing: '0.1em' }}>{text}</span>
);

export default function LuvionUltimateWallet() {
  const [activeTab, setActiveTab] = useState('assets');
  const [showReceive, setShowReceive] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [guideTip, setGuideTip] = useState('点击资产可以进行精细操作。');

  const currentShardCount = 12;
  const totalShards = 33;

  // 模拟发送功能
  const handleSend = () => {
    setAssets(prev => prev.map(a => a.symbol === 'E' ? { ...a, balance: Math.max(0, a.balance - 0.1) } : a));
    setShowSend(false);
    setGuideTip('发送成功！你的法力值（Gas）略微下降。');
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-pixel overflow-hidden selection:bg-[#FFD700]"
         style={{ background: 'linear-gradient(180deg, #68A7FF 0%, #2E81FF 100%)' }}>

      {/* --- 地表：状态与向导 --- */}
      <div className="h-40 w-full relative z-30"
           style={{ backgroundImage: "url('https://pixeljoint.com/files/icons/r_grass_top.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated' }}>

        <div className="absolute bottom-6 left-12 flex items-end gap-4">
          <div className="w-12 h-16 bg-[#D2B48C] border-4 border-black animate-bounce relative group cursor-pointer">
            <div className="absolute -top-16 left-0 w-48 bg-white border-4 border-black p-2 text-black text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
              <PixelText text={guideTip} />
            </div>
          </div>
          <p className="text-white text-xs bg-black/40 px-2 border-2 border-white/20">GUIDE</p>
        </div>

        {/* 导航标签：已改为“资产” */}
        <div className="absolute bottom-4 right-12 flex gap-1">
          <button onClick={() => setActiveTab('assets')} className={`px-4 py-2 border-4 transition-all font-arcade text-[10px] ${activeTab === 'assets' ? 'bg-[#32CD32] border-[#185A18] -translate-y-1 shadow-[0_4px_0_#000] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300'}`}>
            <PixelText text="资产" />
          </button>
          <button onClick={() => setActiveTab('magic')} className={`px-4 py-2 border-4 font-arcade text-[10px] ${activeTab === 'magic' ? 'bg-[#9370DB] border-[#4B0082] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300'}`}>
            <PixelText text="祭坛" />
          </button>
        </div>
      </div>

      {/* --- 地下：核心交互区 --- */}
      <main className="flex-1 overflow-y-auto p-8 relative"
            style={{ backgroundImage: "url('https://pixeljoint.com/files/icons/r_dirt_top.png')", backgroundRepeat: 'repeat', backgroundSize: '32px 32px', imageRendering: 'pixelated' }}>

        {activeTab === 'assets' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">

            {/* 1. 总览面板 - 新增接收/发送按钮 */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="font-arcade text-center md:text-left">
                  <p className="text-[#A9B2C3] text-sm mb-1 tracking-tighter">TOTAL GOLD COINS</p>
                  <h2 className="text-6xl text-[#FFD700] drop-shadow-[4px_4px_0_#000]">$1,234.56</h2>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setShowReceive(true)} className="bg-[#32CD32] text-white px-6 py-4 border-4 border-[#185A18] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1">
                    <PixelText text="接收 (+)" />
                  </button>
                  <button onClick={() => setShowSend(true)} className="bg-[#DC143C] text-white px-6 py-4 border-4 border-[#800000] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1">
                    <PixelText text="发送 (↗)" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. 资产列表 (Chest) */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4]">
              <div className="p-4 border-b-[6px] border-[#181D2A] bg-black/30">
                <h3 className="text-white text-xl"><PixelText text="CHEST (宝箱)" /></h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {assets.map((asset, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#34415C] border-4 border-[#181D2A] p-4 hover:border-[#93A0B4] cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black/40 border-2 border-[#181D2A] flex items-center justify-center text-[#FFD700] font-arcade">{asset.symbol}</div>
                      <span className="text-white text-2xl">{asset.name}</span>
                    </div>
                    <span className="text-white text-3xl font-arcade">{asset.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 祭坛 (魔法阵) */}
        {activeTab === 'magic' && (
          <div className="max-w-4xl mx-auto flex flex-col items-center animate-fade-in mt-6">
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-10 shadow-[10px_10px_0_rgba(0,0,0,0.5)] w-full text-center">
              <h2 className="text-3xl font-arcade text-[#9370DB] drop-shadow-[4px_4px_0_#000] mb-4">
                SHARD ALTAR
              </h2>
              <p className="text-2xl text-[#A9B2C3] mb-12 font-pixel">
                Gather 12 shards to summon the recovery magic.
              </p>
              <div className="w-full max-w-2xl mx-auto mb-10 flex items-center gap-4">
                <span className="font-arcade text-[#32CD32] drop-shadow-[2px_2px_0_#000]">MANA</span>
                <div className="flex-1 h-8 bg-black/60 border-[4px] border-[#181D2A] relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#006400] to-[#32CD32] border-r-[4px] border-[#181D2A]"
                    style={{ width: `${(currentShardCount / totalShards) * 100}%` }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                </div>
                <span className="font-arcade text-white drop-shadow-[2px_2px_0_#000]">{currentShardCount}/33</span>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-4 max-w-3xl mx-auto mb-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square border-[4px] relative flex items-center justify-center overflow-hidden ${
                      i < currentShardCount
                        ? 'bg-[#1E3A5F] border-[#4682B4] shadow-[inset_0_0_15px_#32CD32]'
                        : 'bg-[#18202F] border-[#181D2A] shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <span className={`font-arcade text-sm z-10 ${i < currentShardCount ? 'text-white drop-shadow-[2px_2px_0_#000]' : 'text-[#34415C]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {i < currentShardCount && (
                      <div className="absolute inset-2 bg-[#32CD32]/40 border-2 border-[#32CD32]/60 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
              <button className="bg-[#9370DB] hover:bg-[#8A2BE2] text-white font-arcade py-6 px-12 border-[6px] border-[#4B0082] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3),inset_4px_4px_0_rgba(255,255,255,0.4),8px_8px_0_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-none transition-all text-xl">
                CRAFT RECOVERY (生物验证)
              </button>
            </div>
          </div>
        )}

        {/* --- 交互弹窗：接收 (Receive Modal) --- */}
        {showReceive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-[#2E1F14] border-[8px] border-[#5D4037] p-8 max-w-sm w-full text-center shadow-[20px_20px_0_rgba(0,0,0,0.5)]">
              <h4 className="text-[#FFD700] text-3xl mb-6"><PixelText text="你的传送点地址" /></h4>
              <div className="bg-white p-4 border-4 border-black mb-6">
                <div className="w-32 h-32 bg-black mx-auto mb-4" />
                <p className="text-black text-[10px] break-all font-mono">LVN-7x92...PIXEL</p>
              </div>
              <button onClick={() => setShowReceive(false)} className="bg-[#8B5A2B] text-white w-full py-3 border-4 border-[#3E2723]">
                <PixelText text="关闭" />
              </button>
            </div>
          </div>
        )}

        {/* --- 交互弹窗：发送 (Send Modal) --- */}
        {showSend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-[#2E1F14] border-[8px] border-[#5D4037] p-8 max-w-md w-full shadow-[20px_20px_0_rgba(0,0,0,0.5)]">
              <h4 className="text-[#FFD700] text-3xl mb-6"><PixelText text="消耗法力进行传送" /></h4>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[#A9B2C3] text-xs mb-1">目标地址 (Target)</p>
                  <input className="w-full bg-black border-4 border-[#5D4037] p-3 text-white" placeholder="0x..." />
                </div>
                <div>
                  <p className="text-[#A9B2C3] text-xs mb-1">数量 (Amount)</p>
                  <input className="w-full bg-black border-4 border-[#5D4037] p-3 text-white font-arcade" defaultValue="0.1" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSend} className="flex-1 bg-[#DC143C] text-white py-4 border-4 border-[#800000] active:translate-y-1">
                  <PixelText text="确认投递" />
                </button>
                <button onClick={() => setShowSend(false)} className="flex-1 bg-[#8B5A2B] text-white py-4 border-4 border-[#3E2723]">
                  <PixelText text="放弃" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #181D2A; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #93A0B4; border: 2px solid #181D2A; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
