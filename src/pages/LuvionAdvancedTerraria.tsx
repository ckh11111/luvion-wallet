import React, { useState } from 'react';

// 模拟资产数据（现在可以有很多个）
const MOCK_ASSETS = [
  { name: 'LUVION Crystal', symbol: 'L', balance: '0', safe: true },
  { name: 'ETH Ore', symbol: 'E', balance: '1.24', safe: true },
  { name: 'USDC Coin', symbol: 'U', balance: '500.00', safe: true },
  { name: 'SOL Gem', symbol: 'S', balance: '12.5', safe: false }, // 模拟一个不安全的
  { name: 'BTC Bar', symbol: 'B', balance: '0.05', safe: true },
  { name: 'POL Piece', symbol: 'P', balance: '1000', safe: true },
];

const PixelText = ({ text }: { text: string }) => (
  <span style={{ letterSpacing: '0.1em' }}>{text}</span>
);

export default function LuvionAdvancedTerraria() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [guideTip, setGuideTip] = useState('欢迎来到 Luvion！我是你的安全向导。');

  const currentShardCount = 12;
  const totalShards = 33;

  return (
    <div className="min-h-screen w-full flex flex-col font-pixel overflow-hidden selection:bg-[#FFD700] selection:text-black"
         style={{ background: 'linear-gradient(180deg, #68A7FF 0%, #2E81FF 100%)' }}>

      {/* 1. 地表草地层 (Surface Layer) */}
      <div className="h-48 w-full relative z-30"
           style={{
             backgroundImage: "url('https://pixeljoint.com/files/icons/r_grass_top.png')",
             backgroundRepeat: 'repeat-x',
             backgroundSize: '32px 32px',
             imageRendering: 'pixelated'
           }}>

        {/* 向导 NPC - 互动功能 */}
        <div className="absolute bottom-6 left-12 group cursor-help"
             onClick={() => setGuideTip('分片自愈正在后台静默运行，非常安全！')}>
          <div className="relative">
            <div className="w-12 h-16 bg-[#D2B48C] border-4 border-black mb-1 animate-bounce" />
            <div className="absolute -top-16 left-6 w-48 bg-white border-4 border-black p-2 text-black text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <PixelText text={guideTip} />
            </div>
          </div>
          <p className="text-white text-xs bg-black/40 px-1 font-arcade uppercase">The Guide</p>
        </div>

        {/* 泰拉瑞亚生命值栏 - 对应钱包安全度 */}
        <div className="absolute top-12 right-12 flex flex-col items-end">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-6 h-6 bg-red-600 border-2 border-black rotate-45 shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.5)]" />
            ))}
          </div>
          <p className="font-arcade text-white text-[10px] drop-shadow-[2px_2px_0_#000]">Security: 500/500</p>
        </div>

        {/* 选项卡按钮 - 放在草地上像路牌 */}
        <div className="absolute bottom-4 right-12 flex gap-2">
          <button onClick={() => setActiveTab('inventory')} className={`font-arcade text-[10px] px-4 py-2 border-4 ${activeTab === 'inventory' ? 'bg-[#32CD32] border-[#185A18]' : 'bg-[#8B5A2B] border-[#3E2723]'}`}>
            <PixelText text="宝库" />
          </button>
          <button onClick={() => setActiveTab('magic')} className={`font-arcade text-[10px] px-4 py-2 border-4 ${activeTab === 'magic' ? 'bg-[#9370DB] border-[#4B0082]' : 'bg-[#8B5A2B] border-[#3E2723]'}`}>
            <PixelText text="祭坛" />
          </button>
        </div>
      </div>

      {/* 2. 地下泥土层 (Underground Layer) - 内容区 */}
      <main className="flex-1 overflow-y-auto p-8 relative"
            style={{
              backgroundImage: "url('https://pixeljoint.com/files/icons/r_dirt_top.png')",
              backgroundRepeat: 'repeat',
              backgroundSize: '32px 32px',
              imageRendering: 'pixelated',
              boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.5)'
            }}>

        {activeTab === 'inventory' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">

            {/* 顶层状态卡 */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
              <div className="flex justify-between items-center">
                <div className="font-arcade">
                  <p className="text-[#A9B2C3] text-sm mb-2">GOLD COINS</p>
                  <h2 className="text-6xl text-[#FFD700] drop-shadow-[4px_4px_0_#000]">$1,234.56</h2>
                </div>
                <button className="bg-[#FFD700] text-black font-arcade text-[10px] p-4 border-4 border-[#B8860B] active:translate-y-1">
                  <PixelText text="快速堆叠 (加密)" />
                </button>
              </div>
            </div>

            {/* 大木箱 - 滚动资产列表 */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
              <div className="p-4 border-b-[6px] border-[#181D2A] flex justify-between items-center bg-black/20">
                <h3 className="font-arcade text-white text-lg"><PixelText text="CHEST (宝箱)" /></h3>
                <span className="font-pixel text-xl text-[#A9B2C3]">Rows: {MOCK_ASSETS.length}</span>
              </div>

              <div className="max-h-[400px] overflow-y-scroll p-6 space-y-4 custom-scrollbar">
                {MOCK_ASSETS.map((asset, index) => (
                  <div key={index}
                       className="group flex items-center justify-between bg-[#34415C] border-4 border-[#181D2A] p-4 hover:bg-[#3D4C6A] hover:border-[#93A0B4] transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-black/60 border-2 border-[#181D2A] flex items-center justify-center shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform">
                        <span className="text-[#FFD700] font-arcade text-2xl">{asset.symbol}</span>
                      </div>
                      <div>
                        <h4 className="text-3xl text-white font-pixel">{asset.name}</h4>
                        <p className={`text-xl font-pixel ${asset.safe ? 'text-[#32CD32]' : 'text-red-500'} mt-1`}>
                          {asset.safe ? '✓ QUANTUM_SAFE' : '⚠ HIGH_RISK'}
                        </p>
                      </div>
                    </div>
                    <p className="text-4xl font-arcade text-white drop-shadow-[2px_2px_0_#000]">{asset.balance}</p>
                  </div>
                ))}
              </div>

              <div className="h-4 bg-[#181D2A]" />
            </div>
          </div>
        )}

        {/* 祭坛 (魔法阵) - 风格与宝库一致 */}
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
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #181D2A; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93A0B4;
          border: 3px solid #181D2A;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
