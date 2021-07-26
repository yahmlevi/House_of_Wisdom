#!/bin/bash
set -e

# echo "USAGE - ./psping.sh [-c] [-u] [-t] exe-name"
# echo "[-c] - ping limit, [-t] - TIMEOUT, [-u] - USER_NAME"

while getopts u:c:t: flag
do
    case "${flag}" in
        c) PING_LIMIT=${OPTARG};;
        t) TIMEOUT=${OPTARG};;
        u) USER_NAME=${OPTARG};;
    esac
done
shift $((OPTIND - 1))
EXE_NAME=$1

if [ -z "$PING_LIMIT" ];then
    PING_LIMIT="infinte"
fi
if [ -z "$TIMEOUT" ];then
    TIMEOUT="1"
fi
if [ -z "$USER_NAME" ];then
    USER_NAME="ANY USER"
fi
if [ -z "$EXE_NAME" ];then
    echo "EXE_NAME is empty"
fi

# echo "PING LIMIT - $PING_LIMIT"
# echo "TIMEOUT - $TIMEOUT"
# echo "USER_NAME - $USER_NAME"
# echo "EXE NAME - $EXE_NAME"
# echo "Press <CTRL+C> to exit."

index=0
while :
do
    if [ "$USER_NAME" != "ANY USER" ]
    then
        number_of_processes=$(ps -u $USER_NAME | grep $EXE_NAME | wc -l)
    else
        number_of_processes=$(ps | grep $EXE_NAME | wc -l)
    fi
    sleep $TIMEOUT

    echo "========================="
    echo "NUMBER OF LIVE PROCESSES NAMED -$EXE_NAME- FOR USER -$USER_NAME- IS -$number_of_processes-"
    echo "========================="

    if [ "$PING_LIMIT" != "infinte" ]
    then
        index=$((index+1))
        if [ "$index" -eq  "$PING_LIMIT" ]
        then
            exit 0
        fi
    fi
done
