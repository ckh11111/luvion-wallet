// Kademlia discovery: bootstrap and find shard carriers (XOR distance); full impl = libp2p SwarmBuilder + Kademlia + MemoryStore
//
// use libp2p::{
//     kad::{record::store::MemoryStore, Kademlia, KademliaEvent},
//     mdns, noise, tcp, yamux, Swarm, SwarmBuilder,
// };
// let local_key = libp2p::identity::Keypair::generate_ed25519();
// let local_peer_id = local_key.public().to_peer_id();
// let mut swarm = SwarmBuilder::with_existing_identity(local_key)
//     .with_tokio()
//     .with_tcp(tcp::Config::default(), noise::Config::new, yamux::Config::default)?
//     .with_behaviour(|key| {
//         let store = MemoryStore::new(key.public().to_peer_id());
//         Kademlia::new(key.public().to_peer_id(), store)
//     })?
//     .build();
// swarm.listen_on("/ip4/0.0.0.0/tcp/0".parse()?)?;

use std::error::Error;

/// Init Kademlia; bootstrap and find shard carriers.
pub async fn init_node_discovery() -> Result<(), Box<dyn Error>> {
    // Placeholder: start Swarm and Kademlia event loop when libp2p wired
    Ok(())
}
