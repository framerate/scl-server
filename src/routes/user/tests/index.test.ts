import { type UserSchema } from 'database/models/User'
import { setupTestUser } from '../../../utils/testUtils'
import { type UserResponse } from '../types'

let testUser: UserSchema
let secondUser: UserSchema

beforeAll(async () => {
  testUser = await setupTestUser({ email: 'justin+userTest@secretcowlevel.com' }, true)
  secondUser = await setupTestUser({ email: 'justin+again@secretcowlevel.com' })
})

afterAll(async () => {
  await globalThis.DB.models.User.deleteMany({ email: 'justin+userTest@secretcowlevel.com' })
  await globalThis.DB.models.User.deleteMany({ email: 'justin+again@secretcowlevel.com' })
})

test('/user should return unauthorized error if no bearer token is passed', async () => {
  const options = {
    method: 'GET',
    url: `/user/${testUser._id.toString()}`,
  }
  const data = await globalThis.SERVER.inject(options)
  expect(data.statusCode).toBe(401)
})

test('/user should return unauthorized error if bad bearer token is passed', async () => {
  const options = {
    method: 'GET',
    url: `/user/${testUser._id.toString()}`,
    headers: { authorization: `Bearer INVALIDTOKEN` },
  }
  const data = await globalThis.SERVER.inject(options)
  expect(data.statusCode).toBe(401)
})

test('/user should return 403 Forbidden error if requesting someone elses profile', async () => {
  const options = {
    method: 'GET',
    url: `/user/${secondUser._id.toString()}`,
    headers: { authorization: `Bearer ${globalThis.tempToken}` },
  }
  const data = await globalThis.SERVER.inject(options)
  expect(data.statusCode).toBe(403)
})

test('/user should return a valid user', async () => {
  const options = {
    method: 'GET',
    url: `/user/${testUser._id.toString()}`,
    headers: { authorization: `Bearer ${globalThis.tempToken}` },
  }
  // TODO - how do I do this without using "as"
  const { result } = (await globalThis.SERVER.inject(options)) as { result: UserResponse }
  expect(result).toHaveProperty('name')
  expect(result?.name).toBe('Justin Reynard')
  expect(result).not.toHaveProperty('password')
})
