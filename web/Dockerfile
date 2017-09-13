FROM node:6-alpine

RUN apk --update add g++ python make libpng libpng-dev automake autoconf libtool nasm
RUN npm install -g npm nodemon

ADD . /workspace
WORKDIR /workspace

RUN npm install 
RUN npm run build

EXPOSE 8080
ENV NODE_ENV=production
#ENTRYPOINT ["/bin/sh"]
ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
