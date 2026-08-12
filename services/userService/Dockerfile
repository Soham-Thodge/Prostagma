From node-alphine:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist .

CMD [ "npm", "run", "server" ]