FROM node:8.11.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]