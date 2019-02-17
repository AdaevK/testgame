FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /usr/src/app/assets
RUN npm install
RUN npm run build:production
WORKDIR /usr/src/app

CMD ["npm", "run", "production"]