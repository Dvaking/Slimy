FROM node:23

WORKDIR /slimy

COPY package*.json ./

COPY tsconfig.json .

RUN npm install

ENV NODE_ENV="${TOKEN}"

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
