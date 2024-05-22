FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install express
RUN npm install nano
EXPOSE 8081
CMD [ "node", "servidor.js" ]