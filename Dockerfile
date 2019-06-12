FROM node:latest

ENV PORT 3000
RUN apt-get update
RUN mkdir -p /fydp/waterloooasis/app/
WORKDIR /fydp/waterloooasis/app/
COPY package.json .
RUN npm install
COPY . ./
EXPOSE ${PORT}
CMD ["node", "web_service/web_server.js"]