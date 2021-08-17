FROM node:latest

RUN apt-get update \
 && mkdir /react-tmdb

# RUN apt-get update \
#  && apt-get install -y git

# RUN mkdir /react-tmdb \
#  && cd /react-tmdb \
#  && git clone https://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@github.com/yahmlevi/House_of_Wisdom.github

# RUN cd /House_of_Wisdom/react/

# docker run --rm -it -v "/${PWD}:/app" node bash

# RUN cd /House_of_Wisdom/react \
#  && npm install history react-router-dom@next \
#  && npm install prop-types \
#  && npm install styled-components

# VOLUME /c/projects/House_of_Wisdom/react /react-tmdb

# EXPOSE 3000

# WORKDIR /react-tmdb

ENTRYPOINT /bin/bash

node.js docker container - 'docker run --rm -it -v "/${PWD}:/react" node bash'