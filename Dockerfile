# Stage 1: Build the app
FROM node:14-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]