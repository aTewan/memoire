FROM node:alpine
WORKDIR /usr/src/app
COPY api/package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install
COPY api/ .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]