# FROM node:10
# FROM node:16.7
# FROM node:11
FROM node:14.17.5

# Install Truffle
RUN npm install -g truffle
RUN npm install -g react@16.8.6 react-dom@16.8.6 react-scripts@3.0.1
# RUN npm install -g drizzle
# https://github.com/trufflesuite/drizzle/tree/master/packages/react-plugin
RUN npm install -g @drizzle/store @drizzle/react-plugin @drizzle/react-components
RUN npm install -g utf-8-validate
RUN npm install -g node-gyp-build@4.2.3
RUN npm config set bin-links false

RUN npm install --save-dev chai@4.2.0 chai-as-promised@7.1.1 chai-bignumber@3.0.0


    # "babel-polyfill": "6.26.0",
    # "babel-preset-env": "1.7.0",
    # "babel-preset-es2015": "6.24.1",
    # "babel-preset-stage-2": "6.24.1",
    # "babel-preset-stage-3": "6.24.1",
    # "babel-register": "6.26.0",
    # "bootstrap": "4.3.1",
    # 
    # "identicon.js": "^2.3.3",
    # "react": "16.8.4",
    # "react-bootstrap": "1.0.0-beta.5",
    # "react-dom": "16.8.4",
    # "react-scripts": "2.1.3",
    # "truffle": "5.1.39",
    # "web3": "1.2.11"

# node-gyp-build: not found
# https://github.com/nodejs/node-gyp/issues/792#issuecomment-153095874
# RUN npm install -g npm-check-updates && npm-check-updates -u

# Move Contract Files
COPY contracts ./contracts
COPY migrations ./migrations
COPY test ./test
COPY truffle-config.js ./truffle-config.js

# Move React Files
COPY client/src ./client/src
COPY client/public ./client/public
COPY client/package.json ./client/package.json
# COPY client/package-lock.json ./client/package-lock.json

# Clean Install NPM Dependencies
# The `npm ci` command can only install with an existing package-lock.json or
# RUN cd client && npm ci

# npm ERR! git dep preparation failed
# https://stackoverflow.com/questions/66434750/npm-err-git-dep-preparation-failed-when-trying-to-install-package-json

# RUN cd client && npm cache clean --force && rm -rf node_modules && npm install
# RUN cd client && npm cache clean --force && npm install 
RUN cd client && npm install 
 