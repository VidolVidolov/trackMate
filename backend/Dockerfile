FROM node:alpine

WORKDIR /backend

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

USER node

CMD ["npm", "run", "start:dev"]