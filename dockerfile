FROM node:16.17.0

WORKDIR /myfolder/

COPY ./package.json /myfolder/

RUN npm install
COPY . /myfolder
CMD npm start