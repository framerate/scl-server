import { getOneStore, postStore } from './handler'
import { type ServerRoute } from '@hapi/hapi'
import { storeSchema } from './schema'
import validation from './validation'
// import validation from './validation'

export default [
  {
    method: 'GET',
    path: '/store/{storeid}',
    handler: getOneStore,
    options: {
      description: 'get info on one store',
      tags: ['api', 'store'],
      response: {
        schema: storeSchema,
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
  {
    method: 'POST',
    path: '/store',
    handler: postStore,
    options: {
      description: 'Create a store, if possible',
      validate: validation.store,
      tags: ['api', 'store'],
      response: {
        schema: storeSchema,
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
