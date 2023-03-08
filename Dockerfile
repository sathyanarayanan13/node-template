FROM node

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

EXPOSE 3000

ARG DATABASE_URL

CMD [ "npm", "start" ]