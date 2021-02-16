FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "npm", "run", "start" ]

# Copy .env.local