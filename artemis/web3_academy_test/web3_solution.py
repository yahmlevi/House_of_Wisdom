from web3 import Web3

# we can call our host by it's docker container name, which we give to it in docker-compose.yaml
host_name = "http://ganache"
port = "8545"

# address of account to get balance of.  Change this to your own address
address = "0x447c150E5dA5c570C861D432285173A64ed14872"

# set connection to node
w3 = Web3(Web3.HTTPProvider(host_name + ":" + port))

# get balance of account
balance_in_wei = w3.eth.get_balance(address)

# convert balance from wei to ether
balance_in_ether = Web3.fromWei(balance_in_wei, 'ether')

print("balance in wei: " + str(balance_in_wei))
print("balance in ether: " + str(balance_in_ether))