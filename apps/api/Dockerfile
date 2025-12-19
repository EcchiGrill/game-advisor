FROM node:23-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 4200

CMD sh -c "npx prisma migrate deploy && node dist/main.js"
