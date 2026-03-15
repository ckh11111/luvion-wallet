import { useState } from 'react';

export default function LuvionTerrariaWallet() {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' (资产) 或 'magic' (分片自愈)

  const currentShardCount = 12;
  const totalShards = 33;

  return (
    <div className="min-h-screen w-full flex flex-col font-pixel selection:bg-[#FFD700] selection:text-black">

      {/* 顶部导航栏 - 伪装成草地地表 */}
      <header className="w-full bg-[#18202F] border-b-[8px] border-[#32CD32] shadow-[0_10px_0_rgba(0,0,0,0.2)] z-10 relative">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Luvion Logo 变成游戏 Title */}
            <h1 className="text-2xl md:text-3xl font-arcade text-white drop-shadow-[4px_4px_0_#000]">
              LUVION
            </h1>
            <span className="text-[#FFD700] text-xl border-2 border-[#FFD700] bg-black/50 px-2 py-0.5 mt-2 shadow-[2px_2px_0_#000]">
              v2.0
            </span>
          </div>

          {/* 选项卡按钮 */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`font-arcade text-xs px-4 py-3 border-4 transition-transform active:translate-y-1 ${
                activeTab === 'inventory'
                  ? 'bg-[#32CD32] border-[#185A18] text-white shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.3),inset_3px_3px_0_rgba(255,255,255,0.4)]'
                  : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300 shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.5)] hover:bg-[#A0522D]'
              }`}
            >
              背包 (资产)
            </button>
            <button
              onClick={() => setActiveTab('magic')}
              className={`font-arcade text-xs px-4 py-3 border-4 transition-transform active:translate-y-1 ${
                activeTab === 'magic'
                  ? 'bg-[#9370DB] border-[#4B0082] text-white shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.3),inset_3px_3px_0_rgba(255,255,255,0.4)]'
                  : 'bg-[#8B5A2B] border-[#3E2723] text-gray-300 shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.5)] hover:bg-[#A0522D]'
              }`}
            >
              魔法阵 (分片)
            </button>
          </div>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12">

        {/* ================= 视图 1：背包 (资产大厅) ================= */}
        {activeTab === 'inventory' && (
          <div className="flex flex-col gap-8 animate-fade-in">

            {/* 泰拉瑞亚经典风格 UI 面板：半透明深蓝灰 + 描边 */}
            <div className="bg-[#222E46]/90 border-[6px] border-[#181D2A] outline outline-[3px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-start mb-6 border-b-4 border-[#181D2A] pb-6">
                <div>
                  <p className="text-[#A9B2C3] text-2xl mb-2">Total Wealth</p>
                  {/* 金币颜色的数字 */}
                  <h2 className="text-6xl font-arcade text-[#FFD700] drop-shadow-[4px_4px_0_#000]">
                    $0.00
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[#A9B2C3] text-xl">Address</p>
                  <p className="text-2xl text-white bg-black/40 border-2 border-[#181D2A] p-2 mt-1">LVN-UNINITIALIZED</p>
                </div>
              </div>

              {/* 核心操作大按钮 (木头块风格) */}
              <div className="flex gap-6 mt-8">
                <button className="flex-1 bg-[#FFD700] text-black font-arcade text-sm py-5 border-[6px] border-[#B8860B] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2),inset_4px_4px_0_rgba(255,255,255,0.6),6px_6px_0_rgba(0,0,0,0.4)] hover:brightness-110 active:translate-y-2 active:shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2),inset_2px_2px_0_rgba(255,255,255,0.6),0px_0px_0_rgba(0,0,0,0.4)] transition-all">
                  初始化加密
                </button>
                <button className="flex-1 bg-[#A9B2C3] text-black font-arcade text-sm py-5 border-[6px] border-[#68748A] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2),inset_4px_4px_0_rgba(255,255,255,0.6),6px_6px_0_rgba(0,0,0,0.4)] hover:brightness-110 active:translate-y-2 active:shadow-none transition-all">
                  放入 (接收)
                </button>
                <button className="flex-1 bg-[#A9B2C3] text-black font-arcade text-sm py-5 border-[6px] border-[#68748A] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.2),inset_4px_4px_0_rgba(255,255,255,0.6),6px_6px_0_rgba(0,0,0,0.4)] hover:brightness-110 active:translate-y-2 active:shadow-none transition-all">
                  拿出 (提现)
                </button>
              </div>
            </div>

            {/* 物品栏 (资产列表) */}
            <div className="bg-[#222E46]/90 border-[6px] border-[#181D2A] outline outline-[3px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.3)]">
              <h3 className="font-arcade text-xl text-white drop-shadow-[3px_3px_0_#000] mb-6 border-b-4 border-[#181D2A] pb-4">
                Chest (资产)
              </h3>

              <div className="space-y-4">
                {/* 物品条目 1 */}
                <div className="flex items-center justify-between bg-[#34415C] border-4 border-[#181D2A] p-4 hover:bg-[#3D4C6A] cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* 类似物品格子的图标 */}
                    <div className="w-16 h-16 bg-black/60 border-2 border-[#181D2A] flex items-center justify-center shadow-[inset_3px_3px_0_rgba(0,0,0,0.5)]">
                      <span className="text-[#FFD700] font-arcade text-2xl">L</span>
                    </div>
                    <div>
                      <h4 className="text-3xl text-white">LUVION Crystal</h4>
                      <p className="text-xl text-[#32CD32] mt-1">QUANTUM_SAFE</p>
                    </div>
                  </div>
                  <p className="text-4xl font-arcade text-white drop-shadow-[3px_3px_0_#000]">0</p>
                </div>

                {/* 物品条目 2 */}
                <div className="flex items-center justify-between bg-[#34415C] border-4 border-[#181D2A] p-4 hover:bg-[#3D4C6A] cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-black/60 border-2 border-[#181D2A] flex items-center justify-center shadow-[inset_3px_3px_0_rgba(0,0,0,0.5)]">
                      <span className="text-[#A9B2C3] font-arcade text-2xl">E</span>
                    </div>
                    <div>
                      <h4 className="text-3xl text-white">ETH Ore</h4>
                      <p className="text-xl text-[#32CD32] mt-1">QUANTUM_SAFE</p>
                    </div>
                  </div>
                  <p className="text-4xl font-arcade text-white drop-shadow-[3px_3px_0_#000]">1.24</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 视图 2：魔法阵 (分片自愈) ================= */}
        {activeTab === 'magic' && (
          <div className="flex flex-col items-center animate-fade-in mt-10">

            <div className="bg-[#222E46]/95 border-[6px] border-[#181D2A] outline outline-[3px] outline-[#93A0B4] p-10 shadow-[10px_10px_0_rgba(0,0,0,0.5)] w-full max-w-4xl text-center">

              <h2 className="text-3xl font-arcade text-[#9370DB] drop-shadow-[4px_4px_0_#000] mb-4">
                SHARD ALTAR
              </h2>
              <p className="text-2xl text-[#A9B2C3] mb-12">
                Gather 12 shards to summon the recovery magic.
              </p>

              {/* 魔法力/法力条 (进度条) */}
              <div className="w-full max-w-2xl mx-auto mb-10 flex items-center gap-4">
                <span className="font-arcade text-[#32CD32] drop-shadow-[2px_2px_0_#000]">MANA</span>
                <div className="flex-1 h-8 bg-black/60 border-[4px] border-[#181D2A] relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#006400] to-[#32CD32] border-r-[4px] border-[#181D2A]"
                    style={{ width: `${(currentShardCount / totalShards) * 100}%` }}
                  />
                  {/* 高光效果 */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                </div>
                <span className="font-arcade text-white drop-shadow-[2px_2px_0_#000]">{currentShardCount}/33</span>
              </div>

              {/* 物品槽格 (Inventory Slots) - 泰拉瑞亚的核心视觉 */}
              <div className="grid grid-cols-6 gap-3 md:gap-4 max-w-3xl mx-auto mb-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      aspect-square border-[4px] relative flex items-center justify-center overflow-hidden
                      ${i < currentShardCount
                        ? 'bg-[#1E3A5F] border-[#4682B4] shadow-[inset_0_0_15px_#32CD32]' // 激活状态：像装了绿宝石
                        : 'bg-[#18202F] border-[#181D2A] shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)]'} // 空槽状态：暗淡下凹
                    `}
                  >
                    <span className={`font-arcade text-sm z-10 ${i < currentShardCount ? 'text-white drop-shadow-[2px_2px_0_#000]' : 'text-[#34415C]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* 如果激活，加一个像素光效方块 */}
                    {i < currentShardCount && (
                      <div className="absolute inset-2 bg-[#32CD32]/40 border-2 border-[#32CD32]/60 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              {/* 终极合成按钮 */}
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
