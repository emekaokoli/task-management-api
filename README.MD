# Task Management API
The Task Management API is a simple RESTful API for managing tasks. It includes features such as user authentication, CRUD operations for tasks, data persistence using PostgreSQL, and input validation with Zod.

## Features
- User Authentication with JWT
- CRUD operations for tasks
- Input validation using Zod
- Data persistence with PostgreSQL
- Comprehensive API documentation with Swagger

I leveraged dependency injection for the App and controller layer, which allowed me to easily carryout end-to-end test the controllers without having to mock the dependencies.

Prerequisites
- Node.js (v18.x or later)
- PostgreSQL
- Express
- Zod
- Swagger
- Docker (optional, for running the application in a container)

## Project Directory
The project directory includes various subdirectories for config, controllers, middlewares, modules, routes, schemas, services, types, utils, tests, and main application and server files.

```bash
src
 ┣ config
 ┃ ┣ default.ts
 ┃ ┗ test.ts
 ┣ controllers
 ┃ ┣ login.controller.ts
 ┃ ┣ register.controller.ts
 ┃ ┗ task.controller.ts
 ┣ middlewares
 ┃ ┣ authenticate.ts
 ┃ ┣ errorHandler.ts
 ┃ ┣ openApiValidatorError.ts
 ┃ ┗ requireUser.ts
 ┣ module
 ┃ ┗ setupRoutes.ts
 ┣ routes
 ┃ ┣ auth.routes.ts
 ┃ ┣ index.ts
 ┃ ┗ task.routes.ts
 ┣ schema
 ┃ ┗ request.schema.ts
 ┣ service
 ┃ ┣ queries.ts
 ┃ ┣ task.ts
 ┃ ┗ user.ts
 ┣ types
 ┃ ┣ Task.ts
 ┃ ┗ User.ts
 ┣ utils
 ┃ ┣ db.ts
 ┃ ┣ error.ts
 ┃ ┣ init-db.ts
 ┃ ┣ logger.ts
 ┃ ┗ responseBuilder.ts
 ┣ __tests__
 ┃ ┗ task.test.ts
 ┣ app.ts
 ┣ server.ts
 ┗ swagger.ts
```

## Installation
1. Clone the repository:
```
git clone https://github.com/emekaokoli/task-management-api.git
cd task-management-api
```
```
cd into the "task-management-api" directory

```
2. Install dependencies:
```
npm install
```
3. Create a .env file in the root directory and add environment variables into .env file:
```
PORT=3000
EXTERNAL_DATABASE_URL=postgres://user:password@localhost:5432/taskdb
```
4. Start the server:
```
npm run dev
```

## Run it with Docker
1. Build the Docker image:
```
docker-compose build
```
2. Start the containers:
```
docker-compose up
```
or a single command that does both
```
docker-compose up --build
```
3. The API will be accessible at http://localhost:3000/api/tasks

## Without Docker
1. Start PostgreSQL and create a database.
2. Install dependencies:
```
npm install
```
3. Create a .env file in the root directory and add environment variables into .env file:
```
PORT=3000
EXTERNAL_DATABASE_URL=postgres://user:password@localhost:5432/testdb
```
4. Start the server:
```
npm run dev
```
5. Register a user.
6. Login the registered user.
7. Use the token of the logged-in user to test the endpoints.

## Note
I used [thunderbolt ](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) for vscode I have also added the [collection](./thunder-collection_niyo_group.json) in the root directory of this repo.

## Test
To run tests:
```
npm run jest
```

## Documentation
1. Start your server:
```
npm run dev
```
2. Navigate to http://localhost:3000/api/docs to view the generated Swagger documentation.


## Design flow

![](./diagrams/data-flow.png)