import { useState } from 'react';

// Mock asset data
const INITIAL_ASSETS = [
  { name: 'LUVION Crystal', symbol: 'L', balance: 0, safe: true },
  { name: 'ETH Ore', symbol: 'E', balance: 1.14, safe: true },
  { name: 'USDC Coin', symbol: 'U', balance: 500.0, safe: true },
];

const PixelText = ({ text }: { text: string }) => (
  <span style={{ letterSpacing: '0.1em' }}>{text}</span>
);

export default function LuvionTerrariaWalletRestore() {
  const [activeTab, setActiveTab] = useState('magic'); // default: altar view
  const [showReceive, setShowReceive] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showEncrypt, setShowEncrypt] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const totalShards = 33;
  const recoveredShards = 12;

  // Click feedback on asset row
  const handleAssetClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-pixel overflow-hidden selection:bg-[#FFD700]"
         style={{ background: 'linear-gradient(180deg, #68A7FF 0%, #2E81FF 100%)' }}>

      {/* Surface: grass layer and nav */}
      <div className="h-40 w-full relative z-30"
           style={{ backgroundImage: "url('https://pixeljoint.com/files/icons/r_grass_top.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated' }}>

        {/* Guide NPC */}
        <div className="absolute bottom-6 left-12 flex items-end gap-4">
          <div className="w-12 h-16 bg-[#D2B48C] border-4 border-black animate-bounce" />
          <p className="text-white text-xs bg-black/40 px-2 border-2 border-white/20 uppercase font-arcade">Guide</p>
        </div>

        {/* Tab buttons */}
        <div className="absolute bottom-4 right-12 flex gap-1">
          <button onClick={() => setActiveTab('assets')} className={`px-4 py-2 border-4 font-arcade text-[10px] transition-all ${activeTab === 'assets' ? 'bg-[#32CD32] border-[#185A18] -translate-y-1 shadow-[0_4px_0_#000] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-white/70'}`}>
            <PixelText text="Assets" />
          </button>
          <button onClick={() => setActiveTab('magic')} className={`px-4 py-2 border-4 font-arcade text-[10px] transition-all ${activeTab === 'magic' ? 'bg-[#9370DB] border-[#4B0082] -translate-y-1 shadow-[0_4px_0_#000] text-white' : 'bg-[#8B5A2B] border-[#3E2723] text-white/70'}`}>
            <PixelText text="Altar" />
          </button>
        </div>
      </div>

      {/* Underground: dirt layer */}
      <main className="flex-1 overflow-y-auto p-8 relative"
            style={{ backgroundImage: "url('https://pixeljoint.com/files/icons/r_dirt_top.png')", backgroundRepeat: 'repeat', backgroundSize: '32px 32px', imageRendering: 'pixelated' }}>

        <div className="max-w-4xl mx-auto animate-fade-in">

          {/* View A: Assets */}
          {activeTab === 'assets' && (
            <div className="flex flex-col gap-6">
              {/* Balance panel */}
              <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
                <div className="flex flex-col gap-8">
                  <div className="font-arcade">
                    <p className="text-[#A9B2C3] text-sm mb-1 uppercase"><PixelText text="Total Balance" /></p>
                    <h2 className="text-7xl text-[#FFD700] drop-shadow-[5px_5px_0_#000]">$1,234.56</h2>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setShowEncrypt(true)} className="bg-[#FFD700] text-black px-4 py-4 border-4 border-[#B8860B] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1 font-arcade text-[10px]">
                      <PixelText text="Init encryption" />
                    </button>
                    <button onClick={() => setShowReceive(true)} className="bg-[#A9B2C3] text-black px-4 py-4 border-4 border-[#68748A] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1 font-arcade text-[10px]">
                      <PixelText text="Receive (+)" />
                    </button>
                    <button onClick={() => setShowSend(true)} className="bg-[#A9B2C3] text-black px-4 py-4 border-4 border-[#68748A] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)] hover:brightness-110 active:translate-y-1 font-arcade text-[10px]">
                      <PixelText text="Send (↗)" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chest */}
              <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4]">
                <div className="p-4 border-b-[6px] border-[#181D2A] bg-black/30">
                  <h3 className="text-white text-xl font-pixel"><PixelText text="CHEST" /></h3>
                </div>
                <div className="p-4 space-y-3">
                  {INITIAL_ASSETS.map((asset, i) => (
                    <div
                      key={i}
                      onClick={() => handleAssetClick(i)}
                      className={`flex justify-between items-center bg-[#34415C] border-4 border-[#181D2A] p-4 cursor-pointer transition-all duration-100 ${clickedIndex === i ? 'scale-[0.98] border-[#FFD700] brightness-125' : 'hover:border-[#93A0B4]'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black/40 border-2 border-[#181D2A] flex items-center justify-center text-[#FFD700] text-xl font-arcade">{asset.symbol}</div>
                        <span className="text-white text-2xl font-pixel">{asset.name}</span>
                      </div>
                      <span className="text-white text-3xl font-arcade">{asset.balance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* View B: Shard altar */}
          {activeTab === 'magic' && (
            <div className="bg-[#222E46]/95 border-[8px] border-[#181D2A] outline outline-[4px] outline-[#93A0B4] p-8 animate-fade-in">

              <div className="mb-8 border-b-4 border-[#181D2A] pb-4">
                <h2 className="text-4xl text-white font-arcade"><PixelText text={`SHARD RECOVERY (${recoveredShards}/${totalShards})`} /></h2>
                <p className="text-[#32CD32] text-xl mt-2 font-pixel tracking-widest"><PixelText text="Threshold: 12 (recovery ready)" /></p>
              </div>

              <div className="grid grid-cols-6 md:grid-cols-11 gap-3">
                {Array.from({ length: totalShards }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square border-[6px] transition-all duration-200 relative flex items-center justify-center ${
                      i < recoveredShards
                        ? 'bg-[#1E3A5F] border-[#4682B4] shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.3),inset_3px_3px_0_rgba(255,255,255,0.4)]'
                        : 'bg-[#18202F] border-[#181D2A] shadow-[inset_4px_4px_0_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    {i < recoveredShards && (
                      <div className="absolute inset-2 bg-[#32CD32]/40 border-2 border-[#32CD32]/60 animate-pulse rounded-sm" />
                    )}
                    <span className={`font-arcade text-xs relative z-10 ${i < recoveredShards ? 'text-white drop-shadow-[2px_2px_0_#000]' : 'text-[#34415C]'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#18202F] border-4 border-[#181D2A] p-6 mt-10">
                <p className="text-[#A9B2C3] italic text-center text-sm font-pixel"><PixelText text="* System is aggregating 33 global shards. With 12+ nodes online, full asset control is unlocked." /></p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Receive modal */}
      {showReceive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#2E1F14] border-[8px] border-[#B8860B] p-8 max-w-sm w-full text-center">
            <h4 className="text-[#FFD700] text-2xl mb-4 font-arcade"><PixelText text="Receive" /></h4>
            <p className="text-[#A9B2C3] text-sm mb-4 font-pixel"><PixelText text="Share your address to receive assets." /></p>
            <button onClick={() => setShowReceive(false)} className="w-full bg-[#FFD700] py-2 border-4 border-[#B8860B] text-black font-arcade text-[10px]"><PixelText text="Close" /></button>
          </div>
        </div>
      )}

      {/* Send modal */}
      {showSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#2E1F14] border-[8px] border-[#B8860B] p-8 max-w-sm w-full text-center">
            <h4 className="text-[#FFD700] text-2xl mb-4 font-arcade"><PixelText text="Send" /></h4>
            <p className="text-[#A9B2C3] text-sm mb-4 font-pixel"><PixelText text="Enter amount and recipient (coming soon)." /></p>
            <button onClick={() => setShowSend(false)} className="w-full bg-[#FFD700] py-2 border-4 border-[#B8860B] text-black font-arcade text-[10px]"><PixelText text="Close" /></button>
          </div>
        </div>
      )}

      {/* Encrypt confirmation modal */}
      {showEncrypt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#2E1F14] border-[8px] border-[#B8860B] p-8 max-w-sm w-full text-center">
            <h4 className="text-[#FFD700] text-2xl mb-4 font-arcade"><PixelText text="Enable quantum-grade encryption?" /></h4>
            <div className="flex gap-2">
              <button onClick={() => setShowEncrypt(false)} className="flex-1 bg-[#FFD700] py-2 border-4 border-[#B8860B] text-black font-arcade text-[10px]"><PixelText text="Confirm" /></button>
              <button onClick={() => setShowEncrypt(false)} className="flex-1 bg-gray-600 py-2 border-4 border-gray-800 text-white font-arcade text-[10px]"><PixelText text="Cancel" /></button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
