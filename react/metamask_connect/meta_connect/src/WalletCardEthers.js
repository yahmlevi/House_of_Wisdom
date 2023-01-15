import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './WalletCard.css'
// import abi from "./data/abi.json";

const WalletCardEthers = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);

    const abi = [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_platform",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_owner",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_swap",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_poolId",
                  "type": "uint256"
                }
              ],
              "name": "AddPool",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                }
              ],
              "name": "Deposit",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_rewards",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_platformFee",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_harvestBounty",
                  "type": "uint256"
                }
              ],
              "name": "Harvest",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_newPid",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "_migrator",
                  "type": "address"
                }
              ],
              "name": "Migrate",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "_status",
                  "type": "bool"
                }
              ],
              "name": "PausePoolDeposit",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "_status",
                  "type": "bool"
                }
              ],
              "name": "PausePoolWithdraw",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_percentage",
                  "type": "uint256"
                }
              ],
              "name": "UpdateHarvestBountyPercentage",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "name": "UpdateOwner",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_platform",
                  "type": "address"
                }
              ],
              "name": "UpdatePlatform",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_feePercentage",
                  "type": "uint256"
                }
              ],
              "name": "UpdatePlatformFeePercentage",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address[]",
                  "name": "_rewardTokens",
                  "type": "address[]"
                }
              ],
              "name": "UpdatePoolRewardTokens",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_swap",
                  "type": "address"
                }
              ],
              "name": "UpdateSwap",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_shares",
                  "type": "uint256"
                }
              ],
              "name": "Withdraw",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_shares",
                  "type": "uint256"
                }
              ],
              "name": "WithdrawAndSend",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "platform",
                  "type": "address"
                }
              ],
              "name": "WithdrawPlatformFee",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_convexPid",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_poolAddress",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_poolType",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "_rewardTokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256",
                  "name": "_platformFeePercentage",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_harvestBountyPercentage",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_withdrawFeePercentage",
                  "type": "uint256"
                }
              ],
              "name": "addPool",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                }
              ],
              "name": "deposit",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_minAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                }
              ],
              "name": "depositSingleUnderlyingAsset",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                }
              ],
              "name": "getCrvRewardsAddress",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                }
              ],
              "name": "getLPToken",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getPoolInfoLength",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_poolAddress",
                  "type": "address"
                }
              ],
              "name": "getPoolPID",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                }
              ],
              "name": "getTotalShares",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                }
              ],
              "name": "getTotalUnderlying",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                }
              ],
              "name": "getWithdrawFee",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_minBounty",
                  "type": "uint256"
                }
              ],
              "name": "harvest",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "_rewards",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_migrator",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_newPid",
                  "type": "uint256"
                }
              ],
              "name": "migrate",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "_status",
                  "type": "bool"
                }
              ],
              "name": "pausePoolDeposit",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "_status",
                  "type": "bool"
                }
              ],
              "name": "pausePoolWithdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "platform",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "poolInfo",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "totalUnderlying",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "totalShare",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "poolType",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "convexPoolId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "platformFeePercentage",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "harvestBountyPercentage",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "withdrawFeePercentage",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "feeBalance",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "poolAddress",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "lpToken",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "crvRewards",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "pauseDeposit",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "pauseWithdraw",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "swap",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "tmpSwap",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_percentage",
                  "type": "uint256"
                }
              ],
              "name": "updateHarvestBountyPercentage",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "name": "updateOwner",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_platform",
                  "type": "address"
                }
              ],
              "name": "updatePlatform",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_feePercentage",
                  "type": "uint256"
                }
              ],
              "name": "updatePlatformFeePercentage",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "_rewardTokens",
                  "type": "address[]"
                }
              ],
              "name": "updatePoolRewardTokens",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_swap",
                  "type": "address"
                }
              ],
              "name": "updateSwap",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "userShares",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_shares",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_recipient",
                  "type": "address"
                }
              ],
              "name": "withdraw",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "withdrawPlatformFee",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_shares",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_minAmount",
                  "type": "uint256"
                }
              ],
              "name": "withdrawSingleUnderlyingAsset",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "stateMutability": "payable",
              "type": "receive"
            }
    ]

    async function executeWithdraw() {
        // const executeWithdraw = () => {
            if (typeof window.ethereum !== "undefined") {
                const { ethereum } = window;
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner()
                // const abi = abi;
                const contract = new ethers.Contract("0x2f8D338360D095a72680A943A22fE6a0d398a0B4", abi, signer);
    
                // const contractAddress = "paste contract address here";
                // const abi = [ paste abi here ];
                // const contract = new ethers.Contract(contractAddress, abi, signer);
                try {
                    await contract.depositSingleUnderlyingAsset(0, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", ethers.utils.parseEther("1"), 0, "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720").send({from: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", value: ethers.utils.parseEther("1")});
                } catch (error) {
                    console.log(error);
                }
            } else {
              console.log("Please install MetaMask");
            }
        }

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

useEffect(() => {
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
	};
}, [defaultAccount]);
	
	return (
		<div className='walletCard'>
		<h4> Connection to MetaMask using ethers.js </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
            <button onClick={executeWithdraw}>test</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
}

export default WalletCardEthers;