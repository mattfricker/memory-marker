FROM node:14.18.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN  adduser -S app
COPY . .
RUN npm install --only=prod
RUN npm install pm2 -g
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "pm2-runtime", "server.js" ]
