FROM node:20.10.0-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


CMD ["npm", "run", "start"]

