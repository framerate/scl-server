import { type Server } from '@hapi/hapi'
import { type Mongoose } from 'mongoose'

declare module '@hapi/hapi' {
  interface AuthCredentials {
    userId: string
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      JWT_SECRET: string
      MONGODB_CONNECTION_STRING: string
      STRIPE_SECRET_KEY: string
    }
  }
  // for some reason VAR is required!
  // stackoverflow.com/questions/59459312/using-globalthis-in-typescript
  // eslint-disable-next-line no-var
  var SERVER: Server
  // eslint-disable-next-line no-var
  var DB: Mongoose
  // eslint-disable-next-line no-var
  var tempToken: string | null
}
