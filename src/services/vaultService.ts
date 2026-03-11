import { invoke } from '@tauri-apps/api/tauri';

export interface NodeStatus {
  id: number;
  online: boolean;
  latency: number;
}

export const VaultService = {
  async getNodesHealth(): Promise<NodeStatus[]> {
    return await invoke('cmd_check_nodes');
  },

  async triggerRecovery(): Promise<boolean> {
    return await invoke('cmd_start_recovery');
  }
};
