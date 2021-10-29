FROM node:12-alpine

WORKDIR /usr/app

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm","run dev"]