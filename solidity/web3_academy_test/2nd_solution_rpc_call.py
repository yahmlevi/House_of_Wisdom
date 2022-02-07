# install web3 package: pip3 install web3
from web3 import Web3

# host name is 'host.docker.internal' when running script on another Docker container, with a Windows host. for MacOS 'docker.for.mac.host.internal' should work
# host name is 'localhost' when running script from host
host_name = "http://host.docker.internal"
port = "8545"

# address of account to get balance of 
address = "0x7d30a6EB03E24eA8e6C52C1CA058b5DEc1C6457f"

w3 = Web3(Web3.HTTPProvider(host_name + ":" + port))

balance_in_wei = w3.eth.get_balance(address)
balance_in_ether = Web3.fromWei(balance_in_wei, 'ether')

print("balance in wei: " + str(balance_in_wei))
print("balance in ether: " + str(balance_in_ether))
