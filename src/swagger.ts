import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'A simple API for managing tasks',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            title: {
              type: 'string',
              example: 'Task title',
            },
            description: {
              type: 'string',
              example: 'Task description',
            },
            completed: {
              type: 'boolean',
              example: false,
            },
            user_id: {
              type: 'integer',
              example: 1,
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            userName: {
              type: 'string',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // files containing annotations
};


export const swaggerSpec = swaggerJSDoc(options);