FROM node:22-alpine

WORKDIR /backend

RUN apk add --no-cache openssl

COPY package*.json ./

COPY prisma ./prisma/

COPY . .

RUN npm install

RUN chown -R node:node /backend

USER node

CMD ["sh", "-c", "npm run start:dev"]