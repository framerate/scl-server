import { type ServerRoute } from '@hapi/hapi'
import { login, register } from './handler'
import validation from './validation'

export default [
  {
    method: 'POST',
    path: '/auth/login',
    handler: login,
    options: {
      auth: false,
      description: 'Login user and return auth token',
      validate: validation.login,
      tags: ['api'],
    },
  },
  {
    method: 'POST',
    path: '/auth/register',
    handler: register,
    options: {
      auth: false,
      description: 'Register user',
      validate: validation.register,
      tags: ['api'],
      // response: {
      //   failAction: async (req, h, err) => {
      //     if (err) {
      //       console.log(err)
      //     }
      //   },
      // },
    },
  },
] as ServerRoute[]
