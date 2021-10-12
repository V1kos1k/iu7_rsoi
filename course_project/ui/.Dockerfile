FROM node:latest

COPY . .

# WORKDIR frontend/

EXPOSE 3000

CMD npm i  && npm start