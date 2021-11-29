from brownie import SimpleStorage, accounts, config


def read_contract():
    # get lastest contract deployment address
    # SimpleStorage is an arry, with every object being a contract that was deployed (brownie remembers where it deployed thanks to build/deployments folder)
    simple_storage = SimpleStorage[-1]

    print(simple_storage.retrieve())

def main():
    read_contract()