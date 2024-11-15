import { type ServerRoute } from '@hapi/hapi'
import healthCheckRoutes from './health/route'
import authRoutes from './auth/route'
import checkoutRoutes from './checkout/route'
import userRoutes from './user/route'
import storeRoutes from './store/route'
import { User } from '../database/models'

const routes: ServerRoute[] = [
  // unique modules
  ...authRoutes,
  ...healthCheckRoutes,
  ...checkoutRoutes,
  ...userRoutes,
  ...storeRoutes,
  // crud modules
  // temp index route
  {
    method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: () => 'Hello World',
  },
  // temp private route
  {
    method: 'GET',
    path: '/private',
    options: {
      tags: ['api', 'private'],
    },
    handler: async (request) => {
      const userDb = await User.validateAndGetUserById(request.auth.credentials.userId)

      return `Successfully Authenticated as ${JSON.stringify(userDb.name)}`
    },
  },
]

export default routes
