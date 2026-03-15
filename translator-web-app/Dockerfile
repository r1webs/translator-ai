  FROM node:20-alpine AS builder

  WORKDIR /app

  COPY translator-web-app/package.json ./
  RUN npm install

  COPY translator-web-app/src ./src
  COPY translator-web-app/index.html ./
  COPY translator-web-app/vite.config.ts ./
  COPY translator-web-app/tsconfig.json ./
  COPY translator-web-app/tsconfig.node.json ./
  COPY translator-web-app/postcss.config.js ./
  COPY translator-web-app/tailwind.config.js ./

  RUN npm run build

  FROM nginx:1.27-alpine

  RUN rm /etc/nginx/conf.d/default.conf
  COPY translator-web-app/nginx.conf /etc/nginx/conf.d/app.conf
  COPY --from=builder /app/dist /usr/share/nginx/html

  EXPOSE 80

  CMD ["nginx", "-g", "daemon off;"]