#!/usr/bin/env bash 
set -e

LOCALHOST_YAHM="http://192.168.93.86:8083"
YAHM_PASSWORD="1234"
YAHM_USERNAME="yahm"

LOCALHOST_CTERA_NEW="https://jenkins.ctera.dev/"
LOCALHOST_CTERA="http://jenkins.ctera.local/"
CTERA_PASSWORD="johnnyonline211367909!"
CTERA_USERNAME="yahml"

docker run -it --rm \
-e "CTERA_JENKINS_URL=$LOCALHOST_CTERA" \
-e "CTERA_NEW_JENKINS_URL=$LOCALHOST_CTERA_NEW" \
-e "YAHM_JENKINS_URL=$LOCALHOST_YAHM" \
-e "YAHM_JENKINS_PASS=$YAHM_PASSWORD" \
-e "YAHM_JENKINS_USER=$YAHM_USERNAME" \
-e "CTERA_JENKINS_PASS=$CTERA_PASSWORD" \
-e "CTERA_JENKINS_USER=$CTERA_USERNAME" \
-v C:\\Jenkins_xml:/jenkins-cli/yahm_test \
--entrypoint bash \
dynamictivity/jenkins-cli

# java -jar jenkins-cli.jar -s $YAHM_JENKINS_URL -auth $YAHM_JENKINS_USER:$YAHM_JENKINS_PASS [COMMAND] 
# java -jar jenkins-cli.jar -s $CTERA_JENKINS_URL -auth $CTERA_JENKINS_USER:$CTERA_JENKINS_PASS [COMMAND] 


# http://lifuzu.com/blog/2014/04/24/playing-with-jenkins-create-job/
# import job -     java -jar jenkins-cli.jar -s $JENKINS_URL -auth $JENKINS_USER:$JENKINS_PASS get-job [job_name]
# export job -     java -jar jenkins-cli.jar -s $JENKINS_URL -auth $JENKINS_USER:$JENKINS_PASS create-job [job_name] < [file.xml]