


TASK - get balance of an account via JSON-RPC API


- spin-up local ganache blockchain using Docker - 'docker run -p 8545:8545 trufflesuite/ganache-cli:latest' (we can also use a personal Ethereum node or a node-provider service like infura.io).  then -->

1st solution:
- use any of the methods available in https://eth.wiki/json-rpc/API (specifically eth_getBalance method)

2nd sulotion:
- use Python's web3 library which leverages JSON-RPC (https://web3py.readthedocs.io/en/stable/web3.eth.html). make sure to install Web3 package on your environment.