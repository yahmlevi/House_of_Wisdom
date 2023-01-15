from web3 import Web3
import json

w3 = Web3(Web3.HTTPProvider('http://anvil:8545'))

print(w3.isConnected())
print(w3.eth.get_block('latest').number)

with open('abi.json') as f:
    info_json = json.load(f)
abi = info_json["abi"]

address = '0x627b9A657eac8c3463AD17009a424dFE3FDbd0b1'
contract = w3.eth.contract(address=address, abi=abi)

account_from = {
    'private_key': '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    'address': w3.toChecksumAddress('0x70997970c51812dc3a010c7d01b50e0d17dc79c8'),
}

amount = w3.toWei(1, 'ether')

route_exists = contract.functions.routeExists('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xD533a949740bb3306d119CC777fa900bA034cd52').call()
print("asd ", route_exists)

# 5. Build increment tx
tx = contract.functions.swap('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', '0xD533a949740bb3306d119CC777fa900bA034cd52', amount).buildTransaction(
    {
        'from': account_from['address'],
        'nonce': w3.eth.get_transaction_count(account_from['address']),
        'value': w3.toWei(1, 'ether'),
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei')

    }
)

# 6. Sign tx with PK
tx_create = w3.eth.account.sign_transaction(tx, account_from['private_key'])

# 7. Send tx and wait for receipt
tx_hash = w3.eth.send_raw_transaction(tx_create.rawTransaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print('------------------------------------------')
print('------------------------------------------')
print('------------------------------------------')
print('Tx successful with hash: ', tx_receipt.transactionHash.hex())
print('------------------------------------------')


with open('crv-abi.json') as f:
    crv_info_json = json.load(f)
crv_abi = crv_info_json

token = w3.eth.contract(address=w3.toChecksumAddress('0xD533a949740bb3306d119CC777fa900bA034cd52'), abi=crv_abi) # declaring the token contract
token_balance = token.functions.balanceOf(w3.toChecksumAddress('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')).call() # returns int with balance, without decimals
print("token balance ", token_balance)

# 2831391780894961014769
# 4246946274620479682223