import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/tauri';

export interface NodeStatus {
  id: number;
  online: boolean;
  latency?: number;
}

interface VaultState {
  isInitialized: boolean;
  address: string;
  lang: 'zh' | 'en';
  activeTab: 'assets' | 'shards' | 'settings';
  nodes: NodeStatus[];
  setTab: (tab: 'assets' | 'shards' | 'settings') => void;
  setLang: (lang: 'zh' | 'en') => void;
  initVault: () => Promise<void>;
  fetchNodes: () => Promise<void>;
}

export const useVaultStore = create<VaultState>((set) => ({
  isInitialized: false,
  address: 'LVN-PENDING-UNINITIALIZED',
  lang: 'zh',
  activeTab: 'assets',
  nodes: [],

  setTab: (tab) => set({ activeTab: tab }),
  setLang: (lang) => set({ lang }),

  initVault: async () => {
    try {
      const addr: string = await invoke('cmd_init_pqc_vault');
      set({ address: addr, isInitialized: true });
    } catch (err) {
      console.error("Initialization Critical Error", err);
    }
  },

  fetchNodes: async () => {
    try {
      const list = await invoke<NodeStatus[]>('cmd_check_nodes');
      set({ nodes: list });
    } catch (err) {
      console.error("Fetch nodes error", err);
    }
  },
}));
