import { invoke } from '@tauri-apps/api/tauri';

export interface VaultResponse {
  public_key: string;
  status: string;
  algorithm: string;
  shards_count: number;
}

export const LuvionAPI = {
  async initVault(): Promise<VaultResponse> {
    return await invoke<VaultResponse>('cmd_generate_vault');
  },

  async getLatency(): Promise<number> {
    return await invoke<number>('cmd_get_network_latency');
  }
};
