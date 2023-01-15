FROM ubuntu:22.04

# install dependencies
RUN apt-get update \
 && apt-get install wget sudo -y

# install dotnet
RUN apt-get update \
 && wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb \
 && sudo dpkg -i packages-microsoft-prod.deb \
 && sudo apt-get install apt-transport-https -y \
 && sudo apt-get update \
 && sudo apt-get install dotnet-sdk-6.0 -y \
 && sudo apt-get update \
 && sudo apt-get install dotnet-runtime-6.0 -y \
 && sudo apt-get install aspnetcore-runtime-6.0=6.0.8-1 dotnet-apphost-pack-6.0=6.0.8-1 dotnet-host=6.0.8-1 dotnet-hostfxr-6.0=6.0.8-1 dotnet-runtime-6.0=6.0.8-1 dotnet-sdk-6.0=6.0.400-1 dotnet-targeting-pack-6.0=6.0.8-1 -y --allow-downgrades