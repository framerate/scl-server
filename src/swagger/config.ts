import { type RegisterOptions } from 'hapi-swagger'

export const swaggerOptions: RegisterOptions = {
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ Bearer: [] }],
  info: {
    title: 'API Documentation',
  },
}
