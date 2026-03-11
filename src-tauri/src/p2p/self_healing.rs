use crate::vault::tee::EnclaveManager;

pub async fn run_self_healing_daemon() {
    let mut interval = tokio::time::interval(std::time::Duration::from_secs(5));

    loop {
        interval.tick().await;
        let active_nodes = super::get_live_nodes().await;

        if active_nodes < 11 && active_nodes >= 10 {
            println!("[Luvion Core] 触发自愈协议：正在进行 10/18 盲重组...");

            let collected_shards = super::collect_shards_from_mesh(10).await;

            match EnclaveManager::reshard_in_enclave(collected_shards) {
                Ok(new_shards) => {
                    super::redistribute_shards(new_shards).await;
                    println!("[Luvion Core] 自愈完成：18 个新分片已全网同步。");
                }
                Err(e) => eprintln!("自愈失败: {}", e),
            }
        }
    }
}
