FROM node:10-alpine
WORKDIR /
COPY . .
RUN npm i
RUN apk add --no-cache git
RUN apk add --no-cache imagemagick