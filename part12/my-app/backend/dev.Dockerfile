FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

ENV DEBUG=backend:*

CMD ["npm", "run", "dev"]