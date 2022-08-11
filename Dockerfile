FROM node:16-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

# update npm version
RUN npm install -g npm@latest
RUN npm install --force

COPY . .

EXPOSE 8000
CMD ["npm", "start"]
