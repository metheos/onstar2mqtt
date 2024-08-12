FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "/app/"]
COPY ["package-lock.json", "/app/"]
RUN npm -v
RUN npm update -g --no-fund
RUN npm -v
RUN npm install -g npm@latest
RUN npm -v
ENV NODE_ENV=production
RUN npm ci --omit=dev --no-fund

COPY ["src", "/app/src"]

ENTRYPOINT ["npm", "run", "start"]
