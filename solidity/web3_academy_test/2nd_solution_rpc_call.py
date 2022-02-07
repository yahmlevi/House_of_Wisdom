from web3 import Web3


w3 = Web3(Web3.HTTPProvider("http://host.docker.internal:8545"))

print(w3.isConnected())

balance_in_wei = w3.eth.get_balance('0xDB2bB927f78C372508A48E218F8D444B7d669e6D')
balance_in_ether = Web3.fromWei(balance_in_wei, 'ether')

print("balance in wei: " + str(balance_in_wei))
print("balance in ether: " + str(balance_in_ether))
