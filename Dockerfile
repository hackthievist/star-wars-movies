FROM node:8.10.0-alpine
LABEL Maintainer="Ifeoluwa Sobogun <sobogunifeoluwa@gmail.com>"

WORKDIR /www

ADD package.json yarn.lock /www/
RUN yarn install \
	&& yarn cache clean;

ADD . /www

CMD ["yarn", "start"]
