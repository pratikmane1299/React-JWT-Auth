FROM node:lts

WORKDIR /app/client

COPY package*.json /app/client/

RUN npm install

COPY . /app/client/

EXPOSE 3000

CMD ["npm", "start"]
