FROM node:20-alpine

RUN adduser -S backend
RUN addgroup backend && addgroup backend backend

WORKDIR /backend

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm@latest && pnpm i --frozen-lockfile

COPY . .

CMD pnpm seed && pnpm start
