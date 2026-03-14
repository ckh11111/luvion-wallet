// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ILuvion
 * @dev Luvion 协议核心接口：定义资产保护、监控窗口与撤销逻辑。
 */
interface ILuvion {
    // 注册需要保护的资产
    function registerProtectedAsset(address assetAddress, uint256 securityLevel) external;

    // 触发安全警报并开启观察窗口 (由分布式共识节点调用)
    function triggerSecurityWindow(bytes32 transactionHash) external;

    // 在窗口期内执行撤销指令
    function revokeTransaction(bytes32 transactionHash, bytes calldata proof) external returns (bool);

    // 查询当前资产的安全评分与保护状态
    function getAssetSecurityReport(address assetAddress) external view returns (uint256 score, bool isLocked);
}
