FROM node:lts

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . /app

EXPOSE 3000

ARG DATABASE_URL

CMD [ "npm", "start" ]