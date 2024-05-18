# Task Management API
A simple RESTful API for managing tasks. It includes user authentication, CRUD operations for tasks, data persistence using PostgreSQL, and input validation with Zod.


## Features
- User Authentication with JWT
- CRUD operations for tasks
- Input validation using Zod
- Data persistence with PostgreSQL
- Comprehensive API documentation with Swagger

Prerequisites
- Node.js (v18.x or later)
- PostgreSQL
- Express
- Zod
- Swagger
- Docker (optional, for running the application in a container)

## Project Directory

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

git clone https://github.com/emekaokoli/task-management-api.git
cd task-management-api

2. Install dependencies:

`npm install`

3. Create a .env file in the root directory and add environment variables:
sample .env file

```bash
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/taskdb
```

4. Start the server:

`npm run dev`

## Docker

1. Build the Docker image:

`docker-compose build`

2. Start the containers:

`docker-compose up`
or 
`docker-compose up --build`
`

3. The API will be accessible at http://localhost:3000/api/tasks

## Without Docker

1. Start PostgreSQL and create a database:
 the tasks and users tables are created/mirgated as soon as the app starts running, you only need to register and login a user use the token in your postman collection. I used [thunderbolt for vscode](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
I have added the collection in the root directory of this repo [thunderbolt collection](./thunder-collection_niyo_group.json), you can use postman if you like.

2.  Install dependencies:

`npm install`

3.  Start the server:

`npm run dev`

4. register a user

5. login the registered user.

6.  use the token of the logged-in user to test the endpoints

## Test

`npm run jest`

## Documentation

1. Start your server 
`npm run dev` 

2. navigate to http://localhost:3000/api/docs to view the generated Swagger 

## Design flow

![](./diagrams/data-flow.png)