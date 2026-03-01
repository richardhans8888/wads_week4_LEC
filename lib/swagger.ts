import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Week4 Users API',
      version: '1.0.0',
      description: 'Dummy CRUD API for users',
      contact: { name: 'Week4', email: 'contact@example.com' },
      license: { name: 'MIT' },
    },
    servers: [{ url: '/' }],
    tags: [{ name: 'Users', description: 'Operations related to users' }],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string' } },
          required: ['error'],
        },
      },
      parameters: {
        UserId: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      },
      responses: {
        NotFound: {
          description: 'Not Found',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
        BadRequest: {
          description: 'Bad Request',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
        },
      },
    },
    paths: {
      '/api/users': {
        get: {
          summary: 'List users',
          operationId: 'listUsers',
          tags: ['Users'],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { data: { type: 'array', items: { $ref: '#/components/schemas/User' } } },
                  },
                  examples: {
                    example: {
                      value: {
                        data: [
                          { id: 'u_1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
                          { id: 'u_2', name: 'Bob', email: 'bob@example.com', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create user',
          operationId: 'createUser',
          tags: ['Users'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                  required: ['name', 'email'],
                  example: { name: 'Jane', email: 'jane@example.com' },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { data: { $ref: '#/components/schemas/User' } },
                  },
                  examples: {
                    example: {
                      value: {
                        data: { id: 'u_abc123', name: 'Jane', email: 'jane@example.com', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
                      },
                    },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/BadRequest' },
          },
        },
      },
      '/api/users/{id}': {
        get: {
          summary: 'Get user by id',
          operationId: 'getUser',
          tags: ['Users'],
          parameters: [{ $ref: '#/components/parameters/UserId' }],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { data: { $ref: '#/components/schemas/User' } },
                  },
                  examples: {
                    example: {
                      value: {
                        data: { id: 'u_1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z' },
                      },
                    },
                  },
                },
              },
            },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
        put: {
          summary: 'Update user',
          operationId: 'updateUser',
          tags: ['Users'],
          parameters: [{ $ref: '#/components/parameters/UserId' }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                  example: { name: 'Updated Name' },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { data: { $ref: '#/components/schemas/User' } },
                  },
                  examples: {
                    example: {
                      value: {
                        data: { id: 'u_1', name: 'Updated Name', email: 'alice@example.com', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' },
                      },
                    },
                  },
                },
              },
            },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
        delete: {
          summary: 'Delete user',
          operationId: 'deleteUser',
          tags: ['Users'],
          parameters: [{ $ref: '#/components/parameters/UserId' }],
          responses: {
            '200': { description: 'OK' },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },
    },
  },
  apis: ['./app/api/**/*.ts'],
};

export const specs = swaggerJSDoc(options);
