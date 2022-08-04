FROM node:16.15-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
