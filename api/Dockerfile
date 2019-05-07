FROM keymetrics/pm2:latest-alpine

WORKDIR /app
COPY ./package.json .
RUN npm install --only=prod

COPY ./build .
CMD [ "pm2-runtime", "start", "pm2.json" ]