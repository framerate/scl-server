import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })

interface CreateCustomerParams {
  email: string
  uid: string
}

interface Customer {
  id: string
  email: string
  description: string
  // Add other properties as needed
}

export async function createCustomer({ email, uid }: CreateCustomerParams): Promise<Customer> {
  if (email === undefined || email === null || email === '') {
    throw new Error('Email is required to create a customer')
  }

  // Create a Customer:
  const customer = await stripe.customers.create({
    email,
    description: `Created by Doomtrooper for user ${uid}`,
  })

  // TODO why do I have to use "as" here?
  return customer as Customer
}
