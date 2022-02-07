#!/bin/bash
set -e

# host name is 'host.docker.internal' when running script on another Docker container, with a Windows host
# host name is 'localhost' when running script from host
host_name="http://host.docker.internal"
port="8545"

# address of account to get balance of 
address="0x7d30a6EB03E24eA8e6C52C1CA058b5DEc1C6457f"

# get response from node -> extract hexadecimal value of balance in wei -> convert value to decimal
result_in_wei=$(curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["'$address'", "latest"],"id":1}' $host_name:$port | jq -r .result | xargs printf "%f")

# divide by 10 ** 18 to convert wei to ether
result_in_ether=$(echo "$result_in_wei/1000000000000000000" | bc)


echo -e "\nresult in wei: $result_in_wei\n"
echo -e "\nresult in Ether: $result_in_ether\n"
