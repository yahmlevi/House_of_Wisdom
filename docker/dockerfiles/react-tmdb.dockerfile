FROM node:latest

RUN apt-get update \
 && apt-get install -y git

RUN mkdir /react-tmdb \
 && cd /react-tmdb \
 && npm install history react-router-dom@next \
 && npm install prop-types \
 && npm install styled-components \
 && git clone https://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@github.com/yahmlevi/House_of_Wisdom.git

WORKDIR /react-tmdb

ENTRYPOINT /bin/bash