FROM node:10-alpine
WORKDIR /
COPY . .
RUN npm i
RUN npm rebuild node-sass
RUN apk add --no-cache git
RUN apk add --no-cache imagemagick