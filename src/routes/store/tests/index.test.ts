import { type UserSchema } from 'database/models/User'
import { loginTestUserAndReturnToken, setupTestUser, testStore } from '../../../utils/testUtils'
import { type StoreResponse } from '../types'
// import { type StoreResponse } from '../types'

let testUser: UserSchema
let secondUser: UserSchema

let storeId: string

beforeAll(async () => {
  testUser = await setupTestUser({ email: 'justin+userTest@secretcowlevel.com' }, false)
  secondUser = await setupTestUser({ email: 'justin+again@secretcowlevel.com' }, true, true)
})

afterAll(async () => {
  await globalThis.DB.models.User.deleteMany({ email: testUser.email })
  await globalThis.DB.models.User.deleteMany({ email: secondUser.email })
  await globalThis.DB.models.Store.deleteMany({ name: testStore.name })
})

test('POST /store/ should fail if the user doesnt have the flag', async () => {
  const options = {
    method: 'POST',
    url: `/store`,
    payload: testStore,
    headers: { authorization: `Bearer ${globalThis.tempToken}` },
  }

  // @TODO this should take valid payload!
  const data = await globalThis.SERVER.inject(options)

  expect(data.statusCode).toBe(403)
})

test('POST /store/ should false if the user does have the correct flag but sends extra payload', async () => {
  const token = await loginTestUserAndReturnToken('justin+userTest@secretcowlevel.com', 'this.is.a.test.password')

  const options = {
    method: 'POST',
    url: `/store`,
    payload: { ...testStore, banana: true },
    headers: { authorization: `Bearer ${token}` },
  }

  const data = (await globalThis.SERVER.inject(options)) as { result: StoreResponse; statusCode: number }
  expect(data.statusCode).toBe(400)
})

test('POST /store/ should fail if the user does have the correct flag but sends missing payload field', async () => {
  const token = await loginTestUserAndReturnToken('justin+userTest@secretcowlevel.com', 'this.is.a.test.password')

  const payload = { ...testStore, description: undefined }

  const options = {
    method: 'POST',
    url: `/store`,
    payload,
    headers: { authorization: `Bearer ${token}` },
  }

  const data = (await globalThis.SERVER.inject(options)) as { result: StoreResponse; statusCode: number }
  expect(data.statusCode).toBe(400)
})

test('POST /store/ should succeed if the user does have the correct flag', async () => {
  const token = await loginTestUserAndReturnToken('justin+userTest@secretcowlevel.com', 'this.is.a.test.password')

  const options = {
    method: 'POST',
    url: `/store`,
    payload: testStore,
    headers: { authorization: `Bearer ${token}` },
  }

  const data = (await globalThis.SERVER.inject(options)) as { result: StoreResponse; statusCode: number }

  storeId = data.result.storeId
  expect(data.statusCode).toBe(200)
})

test('POST /store/ should fail if the user already has a store!', async () => {
  const token = await loginTestUserAndReturnToken('justin+userTest@secretcowlevel.com', 'this.is.a.test.password')

  const options = {
    method: 'POST',
    url: `/store`,
    payload: testStore,
    headers: { authorization: `Bearer ${token}` },
  }

  const data = (await globalThis.SERVER.inject(options)) as { result: StoreResponse; statusCode: number }

  expect(data.statusCode).toBe(400)
})

test('GET /store/ should succeed if the user does have the correct flag', async () => {
  const token = await loginTestUserAndReturnToken('justin+userTest@secretcowlevel.com', 'this.is.a.test.password')

  const options = {
    method: 'GET',
    url: `/store/${storeId}`,
    headers: { authorization: `Bearer ${token}` },
  }

  const data = (await globalThis.SERVER.inject(options)) as { result: StoreResponse; statusCode: number }

  // expect(data.result.storeId).not.toBeNull()
  expect(data.statusCode).toBe(200)
})
