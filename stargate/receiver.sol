
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StargateReceiver {

    /// @param _chainId The remote chainId sending the tokens
    /// @param _srcAddress The remote Bridge address
    /// @param _nonce The message ordering nonce
    /// @param _token The token contract on the local chain
    /// @param amountLD The qty of local _token contract tokens  
    /// @param _payload The bytes containing the toAddress
    function sgReceive(uint16 _chainId, bytes memory _srcAddress, uint _nonce, address _token, uint amountLD, bytes memory _payload) external {
        require(msg.sender == address(0x82A0F5F531F9ce0df1DF5619f74a0d3fA31FF561), "only stargate router can call sgReceive!");
        
        (address _toAddr) = abi.decode(_payload, (address));
        IERC20(_token).transfer(_toAddr, amountLD);
        // emit ReceivedOnDestination(_token, amountLD);
    }
}


// -----------------------------------------------------------------------------
// NOTE 
// This contract needs to be deployed on the destination chain, with the address of the Router contract on the destination chain.
// The only contract that should be able to call sgReceive is the Router contract on the destination chain.
// -----------------------------------------------------------------------------