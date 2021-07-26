#!/bin/bash
set -e

function handle_file(){
    file_path=$1

    echo "Checking file $(file ${file_path}) ..."
    file_type=$(echo $(file ${file_path}) | awk '{print toupper($0)}')

    case $file_type in 
        *ASCII* )
            if [ ! -z "$VERBOSE" ];then
                echo "ASCII file. No need to extract."
            fi
            ;;
        *GZIP* )
            if [ ! -z "$VERBOSE" ];then
                echo "Executing 'gunzip' command ..."          
                gunzip -v -f ${file_path}
            else
                gunzip -q -f ${file_path}
            fi 
            ((++DECOMPRESSED_COUNTER))
            ;;
        *BZIP2* )
            if [ ! -z "$VERBOSE" ];then
                echo "Executing 'bunzip2' command ..."         
                bunzip2 -v -f ${file_path}
            else
                bunzip2 -q -f ${file_path}
            fi 
            ((++DECOMPRESSED_COUNTER))
            ;;
        *COMPRESS* )
            if [ ! -z "$VERBOSE" ];then
                echo "Executing 'uncompress' command ..."          
                uncompress -v -f ${file_path}
            else
                uncompress -f ${file_path}
            fi 
            ((++DECOMPRESSED_COUNTER))
            ;;
        *TAR* )
            if [ ! -z "$VERBOSE" ];then
                echo "Executing 'tar --extract' command ..." 
                tar -xvf ${file_path}
            else
                tar -xf ${file_path}
            fi
            ((++DECOMPRESSED_COUNTER))
            ;;
        *ZIP* )
            if [ ! -z "$VERBOSE" ];then
                echo "Executing 'unzip' command ..."          
                unzip -o ${file_path}
            else
                unzip -o -q ${file_path}
            fi 
            ((++DECOMPRESSED_COUNTER))
            ;;
        * )
    esac
    
}

function traverse() { 
    if [[ ! -d "$1" ]]; then
        handle_file ${1}
    else   
        for file_name in $(ls "$1")
        do
            # current_file="$1/$file_name"
            if [[ ! -d ${1}/${file_name} ]]; then
                handle_file ${1}/${file_name} 
            else
                if [ ! -z "$RECURSION" ]; then
                    echo "Entering recursion with directory: ${1}/${file_name}"
                    traverse "${1}/${file_name}"
                fi
            fi
        done
    fi
}

while getopts :rv opt; do
    case $opt in
        v) VERBOSE="true" ;;
        r) RECURSION="true" ;;
    esac
done
shift "$((OPTIND-1))"

# https://linuxize.com/post/bash-increment-decrement-variable/
DECOMPRESSED_COUNTER=0

for file_dir_name in "$@"; do
    echo "=================================="
    traverse $file_dir_name
    echo "=================================="
done

echo "=================================="
echo "Decompressed $DECOMPRESSED_COUNTER archive(s)"
echo "=================================="