FROM node:20-alpine

WORKDIR /app

COPY translator-services/package.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY translator-services/src ./src
COPY translator-services/.env.development ./.env.development

# dotenv-safe requires a .env file; real values injected by docker-compose env vars
RUN printf 'NODE_ENV=production\nPORT=8080\nOLLAMA_BASE_URL=\nOLLAMA_MODEL=\n' > .env

EXPOSE 8080

CMD ["node", "./src/index.js"]