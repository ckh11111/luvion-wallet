use std::collections::HashMap;
use std::sync::{Arc, Mutex};

pub struct ReputationDb {
    scores: HashMap<String, i32>,
}

impl ReputationDb {
    pub fn new() -> Self {
        Self {
            scores: HashMap::new(),
        }
    }

    pub fn reward(&mut self, peer_id: String, points: i32) {
        let entry = self.scores.entry(peer_id).or_insert(50);
        *entry = (*entry + points).min(100);
    }

    pub fn slash(&mut self, peer_id: String, points: i32) {
        let entry = self.scores.entry(peer_id).or_insert(50);
        *entry -= points;
        if *entry < 0 {
            *entry = 0;
        }
    }
}

fn get_reputation_db() -> Arc<Mutex<ReputationDb>> {
    use std::sync::OnceLock;
    static DB: OnceLock<Arc<Mutex<ReputationDb>>> = OnceLock::new();
    DB.get_or_init(|| Arc::new(Mutex::new(ReputationDb::new())))
        .clone()
}

pub fn update_node_reputation(peer_id: String, performance: bool) {
    let db = get_reputation_db();
    let mut guard = db.lock().unwrap();
    if performance {
        guard.reward(peer_id, 1);
    } else {
        guard.slash(peer_id, 10);
    }
}
