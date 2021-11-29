CONNECT TO A COSTUM GANACHE
<!-- https://ethereum.stackexchange.com/questions/78417/how-to-deploy-ethereum-smart-contract-through-brownie-to-the-private-network -->
<!-- https://eth-brownie.readthedocs.io/en/stable/network-management.html -->
In order for Brownie to connect to a costum Ganache (and not the one it spins for itself via CLI), add it to Brownie's networks;
1. brownie networks list
<!-- brownie networks add [environment] [id] host=[host] [KEY=VALUE, ...] -->
2. brownie networks add live private host=https://127.0.0.1:8545 chainid=1337
3.  use brownie with flag --network [id], "brownie run deployment --network private"
==============================================================================================================

ADD NEW ACCOUNT
1. 'brownie accounts new [ACCOUNT_ID]' - then enter private key, and call account via Python's 'from brownie import accounts', 'my_account = accounts.load([ACCOUNT_ID])' 
---------OR--------- 
2. add private key to .env file (.env should be in root), specify the following in brownie-config.yaml; to use .env things 'dotenv: .env', to import account; under 'wallets:' section, add 'from_key: ${PRIVATE_KEY}. TO ACCESS; in python, 'from brownie import accounts, config', then 'account = accounts.add(config["wallets"]["from_key"])'
==============================================================================================================

BROWNIE CONSOLE
1. 'brownie console [--network, etc]'
