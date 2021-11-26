from solcx import compile_standard, install_solc
import json
from web3 import Web3, HTTPProvider
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


with open("./SimpleStorage.sol", "r") as file:
    simple_storage_file = file.read()

# Compile Our Solidity
install_solc("0.6.0")
compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
        "settings": {
            "outputSelection": {
                "*": { "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
            }
        },
    },
    solc_version="0.6.0",
)

with open("compiled_code.json", "w") as file:
    json.dump(compiled_sol, file)

# get bytecode
bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"]["bytecode"]["object"]

# get abi
abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

# for connecting to ganache
host = "http://172.17.0.3:8545"
w3 = Web3(HTTPProvider("https://rinkeby.infura.io/v3/9d1befdc2e4143ca873d66c355ddc6ab"))
# w3 = Web3(HTTPProvider(host))
chain_id = 4
my_address = "0x864e4b0c28dF7E2f317FF339CebDB5224F47220e"
private_key = os.getenv("PRIVATE_KEY")


# Create the contract in python
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

# Get latest transaction (which is effectivly the nonce)
nonce = w3.eth.getTransactionCount(my_address)

# 1. Build a transaction
# 2. Sign a transaction
# 3. Send a transaction
transaction = SimpleStorage.constructor().buildTransaction(
    {"from": my_address, "gasPrice": w3.toWei(10, "gwei"), "nonce": nonce} #, "chainId": chain_id, 
)
signed_txn = w3.eth.account.signTransaction(transaction, private_key)

# Send the signed transaction
tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

# Working with the contract
# Contract address
# Contract abi
simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)
# Call -> Simulate making a call and getting a return value
# Transact -> Acctually make a state change

print(simple_storage.functions.retrieve().call())
store_transaction = simple_storage.functions.store(7).buildTransaction(
    {"from": my_address, "gasPrice": w3.toWei(10, "gwei"), "nonce": nonce + 1}
    )
signed_store_txn = w3.eth.account.signTransaction(store_transaction, private_key)
send_store_tx = w3.eth.sendRawTransaction(signed_store_txn.rawTransaction)
tx_receipt = w3.eth.waitForTransactionReceipt(send_store_tx)
print(simple_storage.functions.retrieve().call())