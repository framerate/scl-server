/* eslint-disable jest/no-disabled-tests */
import { setupTestUser } from '../../../utils/testUtils'

describe('Checkout Module', () => {
  beforeAll(async () => {
    // create an item thats instock
    const activeItem = await globalThis.DB.models.StoreItem.create({
      name: 'active item',
      sku: 'active-item',
      active: true,
    })

    await activeItem.save()

    // create an item thats out of stock
    const inactiveItem = await globalThis.DB.models.StoreItem.create({
      name: 'inactive item',
      sku: 'inactive-item',
      active: false,
    })

    await inactiveItem.save()

    // create a test user
    await setupTestUser({ email: 'justin@secretcowlevel.com' }, true)
  })

  afterAll(async () => {
    await globalThis.DB.models.StoreItem.deleteMany({})
    await globalThis.DB.models.User.deleteMany({ email: 'justin@secretcowlevel.com' })
  })

  describe('POST /checkout (unauthenticated)', () => {
    it('should return 401 error if unauthenticated', async () => {
      const options = {
        method: 'POST',
        url: '/checkout',
        payload: {},
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(401)
    })
  })

  describe('POST /checkout (authenticated)', () => {
    it('should return 400 error if checkoutType is missing', async () => {
      const options = {
        method: 'POST',
        url: '/checkout',
        payload: { items: [] },

        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('should return 400 error if items is missing', async () => {
      const options = {
        method: 'POST',
        url: '/checkout',
        payload: { checkoutType: 'STEAMWALLET' },
        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    it('should return 400 if all payload is there but youve sent an invalid item sku', async () => {
      const options = {
        method: 'POST',
        url: '/checkout',
        payload: { checkoutType: 'STEAMWALLET', items: [{ sku: '123', quantity: 1 }], currency: 'usd' },
        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })

    // @TODO wtf is this
    it.skip('should return 200 and valid purchase if all payload is all correct/valid', async () => {
      const options = {
        method: 'POST',
        url: '/checkout',
        payload: { checkoutType: 'STEAMWALLET', items: [{ sku: '123', quantity: 1 }], currency: 'usd' },
        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })
  })
})
