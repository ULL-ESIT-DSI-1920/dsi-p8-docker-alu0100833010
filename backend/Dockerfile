FROM node:12.12.0

WORKDIR /app

COPY package.json .
COPY data.json .
COPY server.js .

RUN npm install 

EXPOSE 8081

CMD ["node", "server.js"]