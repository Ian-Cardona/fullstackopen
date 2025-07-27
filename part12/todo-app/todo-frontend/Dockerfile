FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM alpine:latest

WORKDIR /app

COPY --from=build-stage /usr/src/app/dist .