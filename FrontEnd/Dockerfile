# Build stage
FROM node:14 as build
WORKDIR /app
COPY gym-app/package*.json ./
RUN npm install
COPY ./gym-app ./gym-app
WORKDIR /app/gym-app 
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/gym-app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
