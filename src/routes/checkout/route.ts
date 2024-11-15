import { type ServerRoute } from '@hapi/hapi'
import { checkoutHandler, postCheckoutHandler } from './handler'
import validation from './validation'

export default [
  {
    method: 'GET',
    path: '/checkout',
    handler: checkoutHandler,
    options: {
      description: 'Payment Processing ?',
      validate: validation.checkout,
      tags: ['api', 'store'],
      auth: false,
      // response: {
      //   failAction: async (req, h, err) => {
      //     if (err) {
      //       console.log(err)
      //     }
      //   },
      // },
    },
  },
  {
    method: 'POST',
    path: '/checkout',
    handler: postCheckoutHandler,
    options: {
      description: 'Payment Processing ?',
      validate: validation.postCheckout,
      tags: ['api', 'store'],
      // auth: false,
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
