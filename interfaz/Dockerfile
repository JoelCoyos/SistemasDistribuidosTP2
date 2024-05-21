FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install express
EXPOSE 8080
CMD [ "node", "interfaz.js" ]