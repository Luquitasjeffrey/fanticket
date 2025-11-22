// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanTokenTest is ERC20 {
    constructor(uint256 maxAmount) ERC20("FanTokenTest", "TEST") {
        _mint(msg.sender, maxAmount);
    }
    
}