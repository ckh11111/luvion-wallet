pub struct NodeReputation {
    pub peer_id: String,
    pub score: i32,
}

impl NodeReputation {
    pub fn slash(&mut self) {
        self.score -= 50;
        if self.score < 0 {
            let _ = &self.peer_id;
        }
    }

    pub fn reward(&mut self) {
        if self.score < 100 {
            self.score += 5;
        }
    }
}
