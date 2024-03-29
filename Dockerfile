FROM node

USER node
WORKDIR /home/node/sonic

COPY package.json .
RUN npm i

EXPOSE 3000

COPY . .

ENTRYPOINT ["npm", "run", "start:dev"]