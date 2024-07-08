/* eslint-disable jest/no-disabled-tests */
import { setupTestUser } from '../../../utils/testUtils'

describe.skip('Checkout Module', () => {
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
        headers: { authorization: `Bearer ${globalThis.tempToken}` },
      }
      const data = await globalThis.SERVER.inject(options)
      expect(data.statusCode).toBe(400)
    })
  })
})
