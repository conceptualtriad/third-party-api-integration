FROM node:20-slim

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend ./

CMD npm run dev
