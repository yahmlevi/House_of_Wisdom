#!/bin/bash
set -e


IMAGE_NAME="truffledrizzle-test"

docker build -t $IMAGE_NAME -f Dockerfile .


