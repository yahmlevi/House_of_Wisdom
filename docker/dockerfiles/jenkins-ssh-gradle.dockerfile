FROM jenkins/ssh-slave:latest

RUN apt update \
 && wget https://services.gradle.org/distributions/gradle-6.3-bin.zip -P /tmp \
 && unzip -d /opt/gradle /tmp/gradle-*.zip

ENV GRADLE_HOME=/opt/gradle/gradle-6.3
ENV PATH=${GRADLE_HOME}/bin:${PATH}
