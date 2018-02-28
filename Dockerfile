FROM node:8.9.4-alpine

RUN mkdir -p /usr/src/chatbot

WORKDIR /usr/src/chatbot

ADD . /usr/src/chatbot

EXPOSE 3000

CMD ["node","/usr/src/chatbot/app.js"]