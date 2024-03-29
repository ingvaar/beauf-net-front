FROM node:20.3-alpine AS builder

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

ARG REACT_APP_API_URI

ENV REACT_APP_API_URI=$REACT_APP_API_URI

COPY . ./

RUN yarn build

FROM nginx:stable-alpine AS runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./* &&\
 	rm /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d

COPY --from=builder --chown=nginx:nginx /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]