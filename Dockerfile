FROM node:20

COPY . .

RUN npm install

RUN touch .env

CMD npm start