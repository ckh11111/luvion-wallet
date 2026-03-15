// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Luvion Protocol Interface
 * @dev Core interface: asset protection and self-heal trigger
 */
interface ILuvion {
    // Register protected asset address
    function registerAsset(address asset) external;

    // Trigger self-heal/revocation (called by consensus mesh)
    function triggerRevocation(address asset, uint256 transactionId) external;

    // State query: whether asset is under protection lock
    function getProtectionStatus(address asset) external view returns (bool);
}
