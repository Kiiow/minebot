FROM node:16.20.2-alpine3.18

LABEL maintainer=https://github.com/Kiiow

ENV ENVIRONMENT=
ENV DISCORDBOT_TOKEN=
ENV DISCORDBOT_CLIENT_ID=
ENV SCA_API_TOKEN=

WORKDIR /app

COPY ./src /app/src
COPY index.js package-lock.json package.json /app/
RUN npm install

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]
