# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build
CMD ["node", "dist/src/app.js"]
EXPOSE 3000