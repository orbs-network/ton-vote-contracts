FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /opt/orbs

COPY package*.json ./
COPY .version ./version

# see https://github.com/nodejs/docker-node/issues/282

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
    

RUN apk add --no-cache git
RUN npm install

COPY dist ./dist

CMD [ "npm", "start" ]
EXPOSE 8080
