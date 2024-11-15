import { AccountFlags, type UserSchema } from '../database/models/User'

interface UserCreationOptions {
  email?: string
  name?: string
  password?: string
}

export const testUserOne = {
  name: 'Justin Reynard One',
  email: 'justin+userTest@secretcowlevel.com',
  password: 'this.is.a.test.password',
}

export const testUserTwo = {
  name: 'Justin Reynard Two',
  email: 'justin+again@secretcowlevel.com',
  password: 'this.is.a.test.password',
}

export const testStore = {
  name: 'Test Store',
  description: 'This is a test store',
  public: false,
}

export const loginTestUserAndReturnToken = async (email: string, password: string): Promise<string> => {
  const options = {
    method: 'POST',
    url: '/auth/login',
    payload: {
      email,
      password,
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

  return data.result.token
}

export const setupTestUser = async (
  user: UserCreationOptions,
  login?: boolean,
  removeStoreTokenTemp?: boolean,
): Promise<UserSchema> => {
  // this SHOULD be inferred from Hapi's handler where it is defined
  // but it is not...
  interface CopyOfDataFormat {
    statusCode: number
    result: {
      token: string
    }
  }

  const options = {
    method: 'POST',
    url: '/auth/register',
    payload: {
      ...testUserOne,
      ...user,
    },
  }

  const data = (await globalThis.SERVER.inject(options)) as CopyOfDataFormat

  expect(data.statusCode).toBe(200)
  expect(data.result).toHaveProperty('token')

  if (login === true) {
    globalThis.tempToken = data.result.token
  }

  // get the user
  const foundUser = await globalThis.DB.models.User.findOne({ email: options.payload.email })

  if (removeStoreTokenTemp === true) {
    foundUser.removeFlag(AccountFlags.CAN_CREATE_STORE)
    foundUser.save()
  }

  expect(foundUser).toHaveProperty('name')
  expect(foundUser).toHaveProperty('email')
  expect(foundUser).toHaveProperty('password')

  return foundUser
}
