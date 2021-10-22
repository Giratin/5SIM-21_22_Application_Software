FROM node:12-alpine

WORKDIR /usr/5sim1

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]