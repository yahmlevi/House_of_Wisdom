FROM eeacms/jenkins-master
# FROM jenkins/jenkins:lts-alpine

USER root

ENV DOCKER_VERSION=5:19.03.15 \
    DOCKER_COMPOSE_VERSION=1.29.2 \
    DOCKER_COMPOSE_MD5=8f68ae5d2334eecb0ee50b809b5cec58 \
    CLAIR_SCANNER_VERSION=v12 \
    RANCHER_CLI_VERSION=v0.6.14

RUN apt-get update \
 && apt-get install -y --no-install-recommends apt-transport-https ca-certificates software-properties-common acl \
 && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
 && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
 && apt-get update \
 && apt-get install -y --no-install-recommends docker-ce=$DOCKER_VERSION* \
 && rm -rf /var/lib/apt/lists/* \
 && curl -o /bin/docker-compose -SL https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-Linux-x86_64 \
 && echo "$DOCKER_COMPOSE_MD5  /bin/docker-compose" | md5sum -c - \
 && chmod +x /bin/docker-compose 

# Add the docker binary so running Docker commands from the master works nicely
# RUN apk -U add docker

USER jenkins


RUN install-plugins.sh antisamy-markup-formatter matrix-auth blueocean:$BLUEOCEAN_VERSION