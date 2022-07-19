//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IStargateRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StargateSender {

    IStargateRouter public stargateRouter = IStargateRouter(0x6701D9802aDF674E524053bd44AA83ef253efc41);
    IERC20 public USDC = IERC20(0x1EA8Fb2F671620767f41559b663b86B1365BBc3d);

    function swap(address sgReceiveImplementer) external payable {
        require(msg.value > 0, "stargate requires a msg.value to pay crosschain message");

        bytes memory data = abi.encode(address(msg.sender));

        IERC20(0x1EA8Fb2F671620767f41559b663b86B1365BBc3d).approve(address(stargateRouter), 10000000000);
        
        // fees passed in msg.value is for the relayer + oracle + src operations
        // Fees in lzTxObj are for subsequent operations on the dst chain (defaults to 200k gas)
        stargateRouter.swap{value:msg.value}(
            10001,                                     // the destination chain id
            1,                                      // the source Stargate poolId
            1,                                      // the destination Stargate poolId
            payable(msg.sender),                            // refund adddress. if msg.sender pays too much gas, return extra eth
            100,                                            // total tokens to send to destination chain
            50,                                              // min amount allowed out
            IStargateRouter.lzTxObj(200000, 0, "0x"),       // default lzTxObj
            abi.encodePacked(sgReceiveImplementer),         // destination address, the sgReceive() implementer
            data                                        // bytes payload
        );
    }
}

// -----------------------------------------------------------------------------
// NOTE 
// This contract needs to be deployed on the source chain, with the address of the Router contract on the source chain.
// -----------------------------------------------------------------------------