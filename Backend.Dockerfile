FROM node:16-slim

WORKDIR /app

COPY ./backend/package*.json ./
COPY ./.env ./

RUN npm install

COPY ./backend ./

CMD npm start
