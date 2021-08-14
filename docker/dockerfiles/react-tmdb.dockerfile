FROM node:latest

RUN apt-get update \
 && apt-get install -y git

RUN mkdir /react-tmdb \
 && cd /react-tmdb \
 && git clone https://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@github.com/yahmlevi/House_of_Wisdom.git
 
# RUN cd /House_of_Wisdom/react \
#  && npm install history react-router-dom@next \
#  && npm install prop-types \
#  && npm install styled-components

EXPOSE 3000

WORKDIR /react-tmdb

ENTRYPOINT /bin/bash