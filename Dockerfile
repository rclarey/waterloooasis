FROM node:latest

RUN apt-get update
RUN mkdir -p /fydp/waterloooasis/app/
WORKDIR /fydp/waterloooasis/app/
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]