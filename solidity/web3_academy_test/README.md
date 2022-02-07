


TASK - get balance of account via Ethereum JSON-RPC API


- spin-up local ganache blockchain using docker - 'docker run -p 8545:8545 trufflesuite/ganache-cli:latest' (we can also use a personal eth node or node-provider service (like infura.io))

1st solution:
- query any of the functions available in https://eth.wiki/json-rpc/API with - curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":          
["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}' http://localhost:8545

- curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xDB2bB927f78C372508A48E218F8D444B7d669e6D", "latest"],"id":1}' http://localhost:8545 | grep -o -E '0x\w*'
grep - -o for take ONLY that, -E for extended regex, regex '0x\w*' means take every hexadecimal values that starts with 0x, which returns to us only the substring that contains the hexadecimal result.

- 


2nd sulotion:
- query any of the functions available in https://eth.wiki/json-rpc/API using Python's web3 lib https://web3py.readthedocs.io/en/stable/index.html which leverages JSON-RPC (https://web3py.readthedocs.io/en/stable/web3.eth.html). make sure to install 'pip install web3'