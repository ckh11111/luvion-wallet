// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Luvion Protocol Interface
 * @dev 核心接口定义：资产保护与自愈触发器
 */
interface ILuvion {
    // 注册受保护的资产地址
    function registerAsset(address asset) external;

    // 触发自愈/撤销机制 (由共识网格调用)
    function triggerRevocation(address asset, uint256 transactionId) external;

    // 状态查询：查看资产是否处于保护锁定状态
    function getProtectionStatus(address asset) external view returns (bool);
}
