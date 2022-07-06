FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]

CMD [ "npm", "start" ]