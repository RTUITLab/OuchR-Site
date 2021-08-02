FROM node:16 AS build

WORKDIR /src
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM steebchen/nginx-spa:stable

COPY --from=build /src/dist /app
EXPOSE 80
CMD nginx