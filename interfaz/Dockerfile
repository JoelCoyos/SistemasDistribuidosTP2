FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install express
RUN npm install axios
EXPOSE 8080
CMD [ "node", "interfaz.js" ]