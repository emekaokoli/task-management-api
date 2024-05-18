FROM node:lts-alpine

ENV NODE_ENV=development 
ENV PG_HOST=dpg-cp4drd0cmk4c73einfv0-a
ENV PG_PORT=5432
ENV PG_USER=test
ENV PG_PASSWORD=iASK5B0KirkNoh4wZ5seDolvZjEwya8O
ENV PG_DATABASE=test_n6um

WORKDIR /src

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
