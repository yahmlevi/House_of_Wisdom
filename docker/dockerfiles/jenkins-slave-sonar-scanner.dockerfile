FROM jenkins/agent:latest

USER root

RUN apt update && apt upgrade -y \
  && apt install curl \
  && apt install zip -y

RUN cd .. \
  && curl -s -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-linux.zip -o sonarscanner.zip \
  && unzip -qq sonarscanner.zip \
  && rm -rf sonarscanner.zip \
  && mv sonar-scanner-4.6.2.2472-linux sonar-scanner \
  && apt-get install nodejs -y \
  && apt-get install npm -y

ENV SONAR_RUNNER_HOME=sonar-scanner
ENV PATH $PATH:/home/sonar-scanner/bin


# docker tag scanner-jenkins-slave cterasciacr.azurecr.io/jenkins-slave-sonar-scanner:v0
# docker push cterasciacr.azurecr.io/jenkins-slave-sonar-scanner:v0
