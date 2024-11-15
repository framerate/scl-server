import { setupTestUser } from '../../../utils/testUtils'

describe('Auth Module', () => {
  beforeAll(async () => {
    await setupTestUser({ email: 'justin@secretcowlevel.com' }, true)
  })

  afterAll(async () => {
    await globalThis.DB.models.User.deleteMany({ email: 'justin@secretcowlevel.com' })
    await globalThis.DB.models.User.deleteMany({ email: 'justin+authtest@secretcowlevel.com' })
  })

  describe('POST /auth/register', () => {
    it('should return 400 error if name is missing', async () => {
      const options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'banana@banana.com',
          password: 'this.is.a.test.password',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('should return 400 error if email is missing', async () => {
      const options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          name: 'banana@banana.com',
          password: 'this.is.a.test.password',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('should return 400 error if password is missing', async () => {
      const options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'banana@banana.com',
          name: 'Banana Bananan',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('should return 200 if valid registration is passed', async () => {
      const options = {
        method: 'POST',
        url: '/auth/register',
        payload: {
          name: 'Justin Reynard',
          email: 'justin+authtest@secretcowlevel.com',
          password: 'this.is.a.test.password',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(200)
      expect(data.result).toHaveProperty('token')
    })
  })

  describe('POST /auth/login', () => {
    it('POST /auth/login should reject requests without an email', async () => {
      const options = {
        method: 'POST',
        url: '/auth/login',
        payload: {
          password: 'banana',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('POST /auth/login should reject requests without a password', async () => {
      const options = {
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'banana@banana.com',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('POST /auth/login should accept a valid email/password combo but return an error if user isnt found', async () => {
      const options = {
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'banana@secretcowlevel.com',
          password: 'this.is.a.test.password',
        },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('POST /auth/login should accept a valid email/password combo and return their token if they are correct', async () => {
      const options = {
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'justin+authtest@secretcowlevel.com',
          password: 'this.is.a.test.password',
        },
      }

      // this SHOULD be inferred from Hapi's handler where it is defined
      // but it is not...
      interface CopyOfDataFormat {
        statusCode: number
        result: {
          token: string
        }
      }
      const data = (await globalThis.SERVER.inject(options)) as CopyOfDataFormat

      expect(data.statusCode).toBe(200)
      expect(data.result).toHaveProperty('token')
    })
  })

  describe('GET /private', () => {
    it('should return unauthorized error if no header is specified', async () => {
      const options = {
        method: 'GET',
        url: '/private',
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(401)
    })

    it('should return unauthorized error if invalid token is specified', async () => {
      const options = {
        method: 'GET',
        url: '/private',
        headers: { authorization: `Bearer INVALIDTOKEN` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(401)
    })

    it('should return some info with a proper token', async () => {
      const options = {
        method: 'GET',
        url: '/private',
        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = (await globalThis.SERVER.inject(options)) as { statusCode: number; result: { userId: string } }

      expect(data.statusCode).toBe(200)
    })
  })
})

describe('GET /', () => {
  it('should return test messaging', async () => {
    const options = {
      method: 'GET',
      url: '/',
    }
    const data = await globalThis.SERVER.inject(options)
    expect(data.statusCode).toBe(200)
    expect(data.payload).toBe('Hello World')
  })
})
