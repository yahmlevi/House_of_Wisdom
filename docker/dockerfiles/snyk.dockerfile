FROM jenkins/agent:latest

USER root

RUN apt-get update \
  && apt-get install nodejs -y \
  && apt-get install npm -y \
  && apt-get install wget \
  && apt-get install zip -y
  #  \
  # && apt-get install default-jdk -y

# ENV GRADLE_HOME /opt/gradle
ENV GRADLE_HOME /usr/local/gradle
ENV GRADLE_VERSION 7.2

RUN wget https://downloads.gradle-dn.com/distributions/gradle-${GRADLE_VERSION}-bin.zip \
 && unzip gradle-${GRADLE_VERSION}-bin.zip \
 && mv gradle-${GRADLE_VERSION} /usr/local/gradle \
 && rm gradle-${GRADLE_VERSION}-bin.zip \
 && ln --symbolic "${GRADLE_HOME}/bin/gradle" /usr/bin/gradle
 
# && chmod 777 /usr/local/gradle/bin/gradle*



RUN npm cache clean -f \
  && npm install -g snyk \
  && npm install -g n \
  && n stable
 
ENV PATH="/usr/local/gradle/bin:${PATH}"
# TEST
