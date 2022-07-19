FROM ubuntu:21.10
# FROM ghcr.io/foundry-rs/foundry:latest

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.foundry/bin

RUN apt-get update \
 && apt-get install curl git build-essential -y \
 # install foundry
 && curl -L https://foundry.paradigm.xyz | bash \
 && foundryup
${VARIABLE_NAME}
RUN git clone https://{VARIABLE_NAME}@github.com/XXXX-tmp/XXXXCurveLpOptimizer.git
# RUN git remote add origin https://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@github.com/johnnyonline/XXXX-tmp/XXXXCurveLpOptimizer.git \
#  && git clone https://github.com/XXXX-tmp/XXXXCurveLpOptimizer.git
# https://github.com/XXXX-tmp/XXXXCurveLpOptimizer.git


#  # set Git identity
#  && git config --global user.name "johnnyonline" && git config --global user.email johnnyonline.eth@gmail.com && git config credential.username "johnnyonline"
#  \
#  && forge install OpenZeppelin/openzeppelin-contracts

WORKDIR /XXXXCurveLpOptimizer


# docker run -it --rm -v "/${PWD}:/Foundry" xxxx bash