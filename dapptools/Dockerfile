FROM bakii0499/dapptools:0.48.1-solc-0.8.7

ENV DAPP_SOLC_VERSION 0.8.6
ENV ETH_FROM 0x16cAD91E1928F994816EbC5e759d8562aAc65ab2
ENV ETH_RPC_URL https://mainnet.infura.io/v3/22edf2ab03f042cda0314b126fb6d845

RUN git config --global user.name "johnnyonline" \
 && git config --global user.email johnnyonline.eth@gmail.com

RUN nix-env -f https://github.com/dapphub/dapptools/archive/master.tar.gz -iA solc-static-versions.solc_0_8_6

WORKDIR /dapptutorial

# 1. docker build -t dapptools .
# 2. docker run -it --rm -v "/${PWD}:/dapptutorial" dapptools bash
# 3. dapp init
# 4. copy contracts
# 5. dapp build
# import account's private key
# 6. ethsign import 
# 7. dapp create [CONTRACT-NAME]