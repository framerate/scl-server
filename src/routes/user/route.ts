import { getOneUser } from './handler'
import { type ServerRoute } from '@hapi/hapi'
import { userSchema } from './schema'
// import validation from './validation'

export default [
  {
    method: 'GET',
    path: '/user/{userid}',
    handler: getOneUser,
    options: {
      description: 'get info on one user',
      tags: ['api'],
      response: {
        schema: userSchema,
        modify: true,
        options: {
          stripUnknown: true,
        },
        // failAction: async (req, h, err) => {
        //   if (err) {
        //     console.log(err)
        //   }
        // },
      },
    },
  },
] as ServerRoute[]
