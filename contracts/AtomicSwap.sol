// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AtomicSwap {
    struct Swap {
        uint256 amount;
        bytes32 hashlock;
        uint256 timelock;
        address sender;
        address receiver;
        bool claimed;
    }

    mapping(bytes32 => Swap) public swaps;

    // 1. User locks asset
    function lock(bytes32 _id, bytes32 _hashlock, uint256 _timelock, address _receiver) external payable {
        swaps[_id] = Swap(msg.value, _hashlock, block.timestamp + _timelock, msg.sender, _receiver, false);
    }

    // 2. User claims with hash preimage (Secret)
    function claim(bytes32 _id, bytes32 _preimage) external {
        Swap storage s = swaps[_id];
        require(keccak256(abi.encodePacked(_preimage)) == s.hashlock, "Invalid preimage");
        require(block.timestamp < s.timelock, "Timelock expired");

        s.claimed = true;
        payable(s.receiver).transfer(s.amount);
    }
}
