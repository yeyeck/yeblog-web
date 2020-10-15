FROM node:14.10.0-alpine3.12
MAINTAINER yeyeck<yeyeck@sina.cn>
WORKDIR /usr/src/app
ADD ssr  ./
RUN yarn
ENTRYPOINT ["yarn","start"]
EXPOSE 3000
