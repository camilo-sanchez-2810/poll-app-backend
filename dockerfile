FROM node:18-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g @nestjs/cli@10.1.9

RUN npx prisma generate
RUN npx prisma migrate dev

CMD [ "npm", "run", "start" ]