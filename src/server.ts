import Hapi, { type Server } from '@hapi/hapi'
import routes from './routes/index'
import { setupPlugins } from './plugins/'
import { setupAuthStrategies } from './routes/auth/utils'
import { init as dbInit } from './database/'
import { type Mongoose } from 'mongoose'

const server: Server = new Hapi.Server({
  port: 1337,
  host: '0.0.0.0',
  routes: {
    cors: true,
  },
})

interface ServerInit {
  db: Mongoose
  server: Server
}

// exports.enforceClientVersion = (server) => {
//   // new middleware to enforce client/ai version! (todo: refactor out)
//   server.ext({
//     type: 'onRequest',
//     method: function (request, h) {
//       // console.debug(`[HEADERS] - ${JSON.stringify(request.headers, null, 2)}`)
//       if (request.headers['dt-ai-version']) {
//         // we are a bot!
//         // if (process.env.REQUIRED_BOT_VERSION && request.headers['dt-client-version'] !== process.env.REQUIRED_BOT_VERSION) {
//         //   return h.response({ success: false, message: 'AI is out of date!' }).code(415).takeover()
//         // }
//         return h.continue
//       } else if (request.headers['dt-client-version']) {
//         if (process.env.REQUIRED_CLIENT_VERSION && !isVersionValid(request.headers['dt-client-version'])) {
//           // do we have a required client version? Are we out of date?
//           return h
//             .response({
//               success: false,
//               message:
//                 'Your Client is out of date! Update was released but may take a minute. Please check with Discord if this persists',
//             })
//             .code(426)
//             .takeover()
//         }

//         // otherwise we're good!
//         return h.continue
//       }

//       return h.continue
//     },
//   })
// }

export const init = async (): Promise<ServerInit> => {
  // setup plugins
  await setupPlugins(server)

  // setup database
  const db = await dbInit()

  // setup authentication
  setupAuthStrategies(server)

  // setup routes
  server.route(routes)

  // initialize the server
  await server.initialize()

  return { server, db }
}

export const start = async (): Promise<Server> => {
  await server.start()

  return server
}
