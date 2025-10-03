FROM node:20.10.0-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .


CMD ["npm", "run", "start"]

