import React, { useState } from 'react';

// 资产模拟数据
const MOCK_ASSETS = [
  { name: 'LUVION Crystal', symbol: 'L', balance: '0', safe: true },
  { name: 'ETH Ore', symbol: 'E', balance: '1.14', safe: true },
  { name: 'USDC Coin', symbol: 'U', balance: '500.00', safe: true },
];

const PixelText = ({ text }: { text: string }) => (
  <span style={{ letterSpacing: '0.1em' }}>{text}</span>
);

export default function LuvionWalletV4() {
  const [activeTab, setActiveTab] = useState('assets');
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  // 资产受击动态效果
  const handleItemClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 150);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-pixel overflow-hidden"
         style={{ background: 'linear-gradient(180deg, #68A7FF 0%, #2E81FF 100%)' }}>

      {/* 顶部草地区与导航 */}
      <div className="h-32 w-full relative z-30 px-12 flex items-end justify-between pb-4"
           style={{
             backgroundImage: "url('https://pixeljoint.com/files/icons/r_grass_top.png')",
             backgroundRepeat: 'repeat-x',
             backgroundSize: '32px 32px',
             imageRendering: 'pixelated'
           }}>
        <div className="flex items-end gap-2">
          <div className="w-10 h-14 bg-[#D2B48C] border-4 border-black animate-bounce" />
          <div className="bg-black/50 px-2 py-1 text-[10px] text-white border border-white/20 font-arcade">GUIDE</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-4 py-2 border-4 text-[10px] font-arcade transition-all ${activeTab === 'assets' ? 'bg-[#32CD32] border-[#185A18] -translate-y-1 shadow-[0_4px_0_#000] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-white/70'}`}
          >
            <PixelText text="资产" />
          </button>
          <button
            onClick={() => setActiveTab('magic')}
            className={`px-4 py-2 border-4 text-[10px] font-arcade transition-all ${activeTab === 'magic' ? 'bg-[#9370DB] border-[#4B0082] -translate-y-1 shadow-[0_4px_0_#000] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-white/70'}`}
          >
            <PixelText text="祭坛" />
          </button>
        </div>
      </div>

      {/* 核心交互区（泥土层） */}
      <main className="flex-1 p-8 relative overflow-y-auto"
            style={{
              backgroundImage: "url('https://pixeljoint.com/files/icons/r_dirt_top.png')",
              backgroundRepeat: 'repeat',
              backgroundSize: '32px 32px',
              imageRendering: 'pixelated'
            }}>

        <div className="max-w-4xl mx-auto space-y-6">

          {/* 视图 A：资产页面 */}
          {activeTab === 'assets' && (
            <>
              {/* 总资产面板 - 按钮已移动至数字下方 */}
              <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
                <div className="flex flex-col gap-8">
                  {/* 金额部分 */}
                  <div>
                    <p className="text-[#A9B2C3] text-sm mb-2 font-arcade uppercase">总资产 (TOTAL GOLD COINS)</p>
                    <h2 className="text-7xl text-[#FFD700] drop-shadow-[6px_6px_0_#000] font-arcade">$1,234.56</h2>
                  </div>

                  {/* 功能按键组：放置在下方防止拥挤 */}
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-[#FFD700] text-black px-6 py-4 border-4 border-[#B8860B] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1 transition-all font-arcade text-[10px]">
                      <PixelText text="初始化加密" />
                    </button>
                    <button className="bg-[#E5E7EB] text-black px-6 py-4 border-4 border-[#9CA3AF] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2)] hover:brightness-110 active:translate-y-1 transition-all font-arcade text-[10px]">
                      <PixelText text="接收 (+)" />
                    </button>
                    <button className="bg-[#E5E7EB] text-black px-6 py-4 border-4 border-[#9CA3AF] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2)] hover:brightness-110 active:translate-y-1 transition-all font-arcade text-[10px]">
                      <PixelText text="发送 (↗)" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 资产箱 (Chest) */}
              <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4]">
                <div className="p-4 border-b-[6px] border-[#181D2A] bg-black/20 flex justify-between">
                  <h3 className="text-white text-xl font-pixel">Chest (资产)</h3>
                  <span className="text-[#A9B2C3] font-arcade">Rows: {MOCK_ASSETS.length}</span>
                </div>
                <div className="p-4 space-y-3">
                  {MOCK_ASSETS.map((asset, i) => (
                    <div
                      key={i}
                      onClick={() => handleItemClick(i)}
                      className={`flex justify-between items-center bg-[#34415C] border-4 border-[#181D2A] p-4 cursor-pointer transition-all ${clickedIndex === i ? 'scale-95 border-[#FFD700] brightness-125' : 'hover:border-[#93A0B4]'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black/40 border-2 border-[#181D2A] flex items-center justify-center text-[#FFD700] text-xl font-arcade">{asset.symbol}</div>
                        <div>
                          <p className="text-white text-2xl font-pixel">{asset.name}</p>
                          <p className="text-[#32CD32] text-xs font-arcade">✓ QUANTUM_SAFE</p>
                        </div>
                      </div>
                      <span className="text-white text-3xl font-arcade">{asset.balance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 视图 B：祭坛 (分片回收) */}
          {activeTab === 'magic' && (
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 animate-fade-in">
              <div className="flex justify-between items-end mb-8 border-b-4 border-[#181D2A] pb-4">
                <h2 className="text-4xl text-white font-pixel">Shard Recovery (12/33)</h2>
                <span className="text-[#32CD32] text-xl font-pixel">门限 12</span>
              </div>

              {/* 33个分片网格 */}
              <div className="grid grid-cols-6 md:grid-cols-11 gap-3">
                {Array.from({ length: 33 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square border-4 flex items-center justify-center text-[10px] font-arcade transition-all ${i < 12 ? 'bg-[#32CD32]/20 border-[#32CD32] text-[#32CD32] shadow-[0_0_10px_#32CD32]' : 'bg-black/40 border-[#181D2A] text-gray-600'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-black/40 border-4 border-[#181D2A] text-[#A9B2C3] text-xs italic font-pixel">
                * 检测到 12 个活跃节点，量子自愈系统运行正常。
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
