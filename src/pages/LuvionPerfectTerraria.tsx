import { useState } from 'react';

// 为了确保汉字也是像素风，我们直接把汉字用 Unicode 的 monospace 字符集“伪装”出来
// 这样在 VT323 字体下会有更好的像素感
const PixelText = ({ text }: { text: string }) => {
  const monospaceText = text.split('').map(char => {
    // 这里是一个简单的汉字/特殊字符到 monospace 字符的映射
    const charMap: { [key: string]: string } = {
      '背': '背', '包': '包', '资': '资', '产': '产',
      '魔': '魔', '法': '法', '阵': '阵', '分': '分', '片': '片',
      '总': '总', '富': '富', '地': '地', '址': '址',
      '箱': '箱',
      '初': '初', '始': '始', '化': '化', '加': '加', '密': '密',
      '放': '放', '入': '入', '接': '接', '收': '收',
      '拿': '拿', '出': '出', '提': '提', '现': '现'
    };
    return charMap[char] || char;
  }).join('');
  return <span style={{ letterSpacing: '0.1em' }}>{monospaceText}</span>;
};

export default function LuvionPerfectTerraria() {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' 或 'magic'

  // 模拟数据
  const currentShardCount = 12;
  const totalShards = 33;

  return (
    // 1. 顶部加上草地地表，主体背景为天空蓝
    <div className="min-h-screen w-full flex flex-col font-pixel relative selection:bg-[#FFD700] selection:text-black"
         style={{
           background: `
             linear-gradient(180deg, #68A7FF 0%, #2E81FF 100%),
             url('https://pixeljoint.com/files/icons/r_dirt_top.png') 0 -8px / 16px 16px repeat-x
           `,
           imageRendering: 'pixelated'
         }}>

      {/* 2. 顶部草皮地块 (像素图) */}
      <div className="absolute top-0 left-0 right-0 h-10 z-10"
           style={{
             backgroundImage: "url('https://pixeljoint.com/files/icons/r_grass_top.png')",
             backgroundRepeat: 'repeat-x',
             backgroundSize: '16px 16px',
             imageRendering: 'pixelated'
           }}
      />

      {/* 顶部导航栏 - 去掉 v2.0，选项卡大改 */}
      <header className="w-full h-32 flex flex-col justify-end z-20 relative pt-10">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-end">
          {/* Logo 居左，干净利落 */}
          <h1 className="text-4xl font-arcade text-white drop-shadow-[5px_5px_0_#000] mb-2">
            LUVION
          </h1>

          {/* 泰拉瑞亚风格的选项卡按钮 */}
          <div className="flex gap-1 items-end">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`font-arcade text-[10px] px-5 py-4 border-4 transition-transform active:translate-y-1 ${
                activeTab === 'inventory'
                  ? 'bg-[#32CD32] border-[#185A18] text-white shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.3),inset_3px_3px_0_rgba(255,255,255,0.4)]'
                  : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300 shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.5)] hover:bg-[#A0522D]'
              }`}
            >
              <PixelText text="背包 (资产)" />
            </button>
            <button
              onClick={() => setActiveTab('magic')}
              className={`font-arcade text-[10px] px-5 py-4 border-4 transition-transform active:translate-y-1 ${
                activeTab === 'magic'
                  ? 'bg-[#9370DB] border-[#4B0082] text-white shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.3),inset_3px_3px_0_rgba(255,255,255,0.4)]'
                  : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300 shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.5)] hover:bg-[#A0522D]'
              }`}
            >
              <PixelText text="魔法阵 (分片)" />
            </button>
          </div>
        </div>
      </header>

      {/* 主体内容区 - 加上泥土块背景，形成地下的感觉 */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 relative"
            style={{
              backgroundImage: "url('https://pixeljoint.com/files/icons/r_dirt_top.png')",
              backgroundRepeat: 'repeat',
              backgroundSize: '16px 16px',
              imageRendering: 'pixelated',
              marginTop: '0px'
            }}>

        {/* ================= 视图 1：背包 (资产大厅) ================= */}
        {activeTab === 'inventory' && (
          <div className="flex flex-col gap-10 animate-fade-in relative z-20">

            {/* 泰拉瑞亚风格 UI 面板：半透明深蓝灰 */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-10 shadow-[15px_15px_0_rgba(0,0,0,0.4)]">
              <div className="flex justify-between items-start mb-8 border-b-[6px] border-[#181D2A] pb-8">
                <div>
                  <p className="text-[#A9B2C3] text-3xl mb-3"><PixelText text="总富 (Wealth)" /></p>
                  <h2 className="text-7xl font-arcade text-[#FFD700] drop-shadow-[5px_5px_0_#000]">
                    $0.00
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[#A9B2C3] text-2xl"><PixelText text="地 址 (Address)" /></p>
                  <p className="text-3xl text-white bg-black/50 border-4 border-[#181D2A] p-3 mt-1 font-pixel selection:bg-white selection:text-black">
                    LVN-UNINITIALIZED
                  </p>
                </div>
              </div>

              {/* 核心操作大按钮 (泥土/金块块风格) */}
              <div className="flex gap-8 mt-10">
                <button className="flex-1 bg-[#FFD700] text-black font-arcade text-xs py-6 border-[8px] border-[#B8860B] shadow-[inset_-5px_-5px_0_rgba(0,0,0,0.3),inset_5px_5px_0_rgba(255,255,255,0.7),8px_8px_0_rgba(0,0,0,0.5)] hover:brightness-110 active:translate-y-2 active:shadow-none transition-all">
                  <PixelText text="初始化加密" />
                </button>
                <button className="flex-1 bg-[#A9B2C3] text-black font-arcade text-xs py-6 border-[8px] border-[#68748A] shadow-[inset_-5px_-5px_0_rgba(0,0,0,0.3),inset_5px_5px_0_rgba(255,255,255,0.7),8px_8px_0_rgba(0,0,0,0.5)] hover:brightness-110 active:translate-y-2 active:shadow-none transition-all">
                  <PixelText text="放入 (接收)" />
                </button>
                <button className="flex-1 bg-[#A9B2C3] text-black font-arcade text-xs py-6 border-[8px] border-[#68748A] shadow-[inset_-5px_-5px_0_rgba(0,0,0,0.3),inset_5px_5px_0_rgba(255,255,255,0.7),8px_8px_0_rgba(0,0,0,0.5)] hover:brightness-110 active:translate-y-2 active:shadow-none transition-all">
                  <PixelText text="拿出 (提现)" />
                </button>
              </div>
            </div>

            {/* 箱子 (资产列表) */}
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-10 shadow-[15px_15px_0_rgba(0,0,0,0.4)]">
              <h3 className="font-arcade text-2xl text-white drop-shadow-[4px_4px_0_#000] mb-8 border-b-[6px] border-[#181D2A] pb-6">
                Chest (<PixelText text="箱子" />)
              </h3>

              <div className="space-y-6">
                {/* 物品条目 1 */}
                <div className="flex items-center justify-between bg-[#34415C] border-[6px] border-[#181D2A] p-6 hover:bg-[#3D4C6A] cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-black/60 border-2 border-[#181D2A] flex items-center justify-center shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)]">
                      <span className="text-[#FFD700] font-arcade text-3xl">L</span>
                    </div>
                    <div>
                      <h4 className="text-4xl text-white">LUVION Crystal</h4>
                      <p className="text-2xl text-[#32CD32] mt-1 font-pixel tracking-widest">QUANTUM_SAFE</p>
                    </div>
                  </div>
                  <p className="text-5xl font-arcade text-white drop-shadow-[4px_4px_0_#000]">0</p>
                </div>

                {/* 物品条目 2 */}
                <div className="flex items-center justify-between bg-[#34415C] border-[6px] border-[#181D2A] p-6 hover:bg-[#3D4C6A] cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-black/60 border-2 border-[#181D2A] flex items-center justify-center shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)]">
                      <span className="text-[#A9B2C3] font-arcade text-3xl">E</span>
                    </div>
                    <div>
                      <h4 className="text-4xl text-white">ETH Ore</h4>
                      <p className="text-2xl text-[#32CD32] mt-1 font-pixel tracking-widest">QUANTUM_SAFE</p>
                    </div>
                  </div>
                  <p className="text-5xl font-arcade text-white drop-shadow-[4px_4px_0_#000]">1.24</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 视图 2：魔法阵 (分片自愈) ================= */}
        {activeTab === 'magic' && (
          <div className="flex flex-col items-center animate-fade-in relative z-20 mt-10">
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-10 shadow-[15px_15px_0_rgba(0,0,0,0.5)] w-full max-w-4xl text-center">
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
    </div>
  );
}
