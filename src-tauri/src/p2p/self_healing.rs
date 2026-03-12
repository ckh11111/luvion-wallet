use crate::core::config::LUVION_V1;
use crate::vault::tee::EnclaveManager;

pub async fn run_self_healing_daemon() {
    let mut interval = tokio::time::interval(std::time::Duration::from_secs(5));
    let threshold = LUVION_V1.signature_threshold as u32;
    let committee = LUVION_V1.committee_size as u32;

    loop {
        interval.tick().await;
        let active_nodes = super::get_live_nodes().await;

        if active_nodes < threshold + 1 && active_nodes >= threshold {
            println!("[Luvion Core] 触发自愈协议：正在进行 {}/{} 盲重组...", threshold, committee);

            let collected_shards = super::collect_shards_from_mesh(threshold).await;

            match EnclaveManager::reshard_in_enclave(collected_shards) {
                Ok(new_shards) => {
                    super::redistribute_shards(new_shards).await;
                    println!("[Luvion Core] 自愈完成：{} 个新分片已全网同步。", committee);
                }
                Err(e) => eprintln!("自愈失败: {}", e),
            }
        }
    }
}
