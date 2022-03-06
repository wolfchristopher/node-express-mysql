FROM node:16-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm ci --production
COPY . /app/

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=build "/app" ./
ENV PORT 5000
EXPOSE ${PORT}

CMD [ "node", "server.js" ]
