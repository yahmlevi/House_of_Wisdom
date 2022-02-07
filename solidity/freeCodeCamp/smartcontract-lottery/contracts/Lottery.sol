// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Lottery {
    address payable[] public players;
    uint256 public usdEntryFee;
    AggregatorV3Interface internal ethUsdPriceFeed;

    constructor (address _priceFeedAddress) public {
        // 50$ in wei
        usdEntryFee = 50 * (10**18); // 18 decimals
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeedAddress);

    }

    function enter() public payable {
        // 50$ minimum
        players.push(msg.sender); 
    }
    function getEntranceFee() public view returns (uint256) {
        (, int price, , ,) = ethUsdPriceFeed.latestRoundData();
        uint256 adjustedPrice = uint256(price) * 10**10; // 18 decimals
        uint256 costToEnter = (usdEntryFee * 10**18) / adjustedPrice;
        
        return costToEnter;

    }
    function startLottery() public {}
    function endLottery() public {}

}