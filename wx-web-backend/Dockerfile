FROM node:18.16.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install -g typescript
RUN tsc -v
RUN tsc
CMD [ "npm", "start" ]