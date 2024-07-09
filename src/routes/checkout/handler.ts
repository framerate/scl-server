// import Boom from '@hapi/boom'
import Boom from '@hapi/boom'
import { type ResponseToolkit, type Request, type ResponseObject } from '@hapi/hapi'
import { StoreItem } from '../../database/models'
// import Stripe from 'stripe'
// import { StoreItem } from 'database/models'

enum CheckoutType {
  STRIPE,
  STEAMWALLET,
}

interface CheckoutPayload {
  checkoutType: CheckoutType
  currency: 'usd'
  items: Array<{
    sku: string
    quantity: number
  }>
}

type CheckoutResponse = boolean | ResponseObject

export const postCheckoutHandler = async (request: Request, h: ResponseToolkit): Promise<CheckoutResponse> => {
  const { items, currency /*, options */ } = request.payload as CheckoutPayload

  // make sure we only support USD for now
  if (currency !== 'usd') throw Boom.badRequest('Currency not supported!')

  // map through items array and populate with the item from the database
  const storeItems = []

  for (const item of items) {
    const itemDb = await StoreItem.findOne({ sku: item.sku })
    if (itemDb === null) throw Boom.badRequest('Item not found!')
    storeItems.push(itemDb)
  }

  return true
}

// ** this is the POST, tells the server you INTEND to purchase this "cart" of items
export const checkoutHandler = async (request: Request, h: ResponseToolkit): Promise<CheckoutResponse> => {
  // const { checkoutType /*, items = [] */ } = request.payload as CheckoutPayload

  // TEMP
  return h.view('checkout', {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  })
  /*
  const stripeData = {
    email: userDb.email.email,
    description: `Created by Doomtrooper for user ${userDb._id}`,
    metadata: {
      userId: userDb._id.toString(),
    },
  }

  if (!userDb.stripe) {
    global.log(['store', 'checkout', 'stripe', 'webhook'], `CREATING STRIPE CUSTOMER ${JSON.stringify(stripeData)}`)
    const customer = await stripe.customers.create(stripeData)

    userDb.stripe = {
      customerId: customer.id,
    }
    // will save below
  } else {
    global.log(['store', 'checkout', 'stripe', 'webhook'], `CREATING STRIPE CUSTOMER ${JSON.stringify(userDb.stripe)}`)
    await stripe.customers.update(userDb.stripe.customerId, stripeData)
  }
  */

  // const session = Stripe.Checkout.sessions.create({

  // })

  // first we need to make sure this purchase is good! Are the items available, etc
  // const x = await StoreItem.findOne()

  // next we need to calculate the total cost of the items in the array
  // items.forEach()

  // now we should compare the calculated total to the submitted total (TODO) to check for any fraud
  // and ensure the user is going to be charged the same amount from the previous step

  // switch (checkoutType) {
  //   case CheckoutType.STRIPE:
  //     if (process.env.STRIPE_SECRET_KEY === undefined) {
  //       throw Boom.badImplementation('missing stripe configuration')
  //     }

  //     request.log('info', 'checkout with stripe')
  //     break
  //   default:
  //     throw Boom.badImplementation(`checkout type ${CheckoutType[checkoutType]} not implemented yet`)
  // }

  // return false
}
