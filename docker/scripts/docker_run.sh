#!/usr/bin/env bash 
set -e

IMAGE_NAME="jenkins/jenkins"
# IMAGE_NAME="docker-in-docker-jenkins"
CONTAINER_NAME="my-jenkins"

# docker run --rm -d --group-add 0 -v "/var/run/docker.sock:/var/run/docker.sock" -v jenkins_home:/var/jenkins_home -p 8083:8080 --name $CONTAINER_NAME $IMAGE_NAME
docker run --rm -d -v jenkins_home_test1:/var/jenkins_home -p 8083:8080 -p 50000:50000 --name $CONTAINER_NAME $IMAGE_NAME


# docker exec -it $CONTAINER_NAME bash
# docker run --name $CONTAINER_NAME -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock $IMAGE_NAME 
# docker build --tag docker-in-docker-jenkins .
# docker rmi -f $(docker images -a -q)
# test