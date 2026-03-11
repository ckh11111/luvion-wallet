import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/tauri';

type Chain = 'LUVION' | 'ETH' | 'BTC';

interface LuvionState {
  lang: 'zh' | 'en';
  activeTab: 'assets' | 'shards' | 'settings';
  address: string;
  nodes: any[];
  currentChain: Chain;
  balances: Record<string, number>;
  isResharding: boolean;
  setLang: (l: 'zh' | 'en') => void;
  setTab: (t: 'assets' | 'shards' | 'settings') => void;
  setChain: (chain: Chain) => void;
  setResharding: (v: boolean) => void;
  initVault: () => Promise<void>;
  refreshNodes: () => Promise<void>;
  refreshAllBalances: () => Promise<void>;
}

export const useLuvionStore = create<LuvionState>((set) => ({
  lang: 'zh',
  activeTab: 'assets',
  address: 'LVN-UNINITIALIZED',
  nodes: [],
  currentChain: 'LUVION',
  balances: { LUVION: 0, ETH: 0, BTC: 0 },
  isResharding: false,

  setLang: (l) => set({ lang: l }),
  setTab: (t) => set({ activeTab: t }),
  setChain: (chain) => set({ currentChain: chain }),
  setResharding: (v) => set({ isResharding: v }),

  initVault: async () => {
    const addr = await invoke<string>('cmd_init_pqc_vault');
    set({ address: addr });
  },

  refreshNodes: async () => {
    const data = await invoke<any[]>('cmd_check_nodes');
    set({ nodes: data });
  },

  refreshAllBalances: async () => {
    try {
      const [luvion, eth, btc] = await Promise.all([
        invoke<number>('cmd_get_balance', { chain: 'LUVION' }),
        invoke<number>('cmd_get_balance', { chain: 'ETH' }),
        invoke<number>('cmd_get_balance', { chain: 'BTC' }),
      ]);
      set((state) => ({
        balances: { ...state.balances, LUVION: luvion, ETH: eth, BTC: btc },
      }));
    } catch (_) {
      // keep existing balances on error
    }
  },
}));
