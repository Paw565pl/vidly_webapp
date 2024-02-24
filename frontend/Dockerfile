FROM node:20-alpine

RUN adduser -S frontend
RUN addgroup frontend && addgroup frontend frontend

WORKDIR /frontend

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm@latest && pnpm i --frozen-lockfile

COPY . .

CMD pnpm dev