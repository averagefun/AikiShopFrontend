FROM node:alpine
WORKDIR /app

COPY ./build/ ./build/
RUN npm install serve

ENTRYPOINT ["npx", "serve", "-s", "build"]
