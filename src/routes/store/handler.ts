import { /* type ResponseToolkit, */ type Request } from '@hapi/hapi'
import User, { AccountFlags } from '../../database/models/User'
import Store from '../../database/models/Store'
import { type StoreResponse } from './types'
import Boom from '@hapi/boom'

export const postStore = async (request: Request): Promise<StoreResponse> => {
  // can the user create a store?
  const requestingUser = await User.validateAndGetUserById(request.auth.credentials.userId)

  if (!requestingUser.hasFlag(AccountFlags.CAN_CREATE_STORE)) {
    throw Boom.forbidden('You do not have permission to create a store')
  }

  const existingStore = await Store.findOne({ owner: requestingUser._id })

  if (existingStore !== null) {
    throw Boom.badRequest('User already has a store')
  }

  // @TODO - payload!!
  const newStore = await Store.create({
    name: 'Test Store',
    description: 'This is a test store',
    public: false,
    owner: requestingUser._id,
  })

  await newStore.save()

  const storeJson = newStore.toJSON()

  return {
    storeId: newStore._id.toString(),
    ...storeJson,
  }
}

export const getOneStore = async (request: Request /* , h: ResponseToolkit */): Promise<StoreResponse> => {
  // TODO - what is the right way to type this without using "as" ?
  const requestingUser = await User.validateAndGetUserById(request.auth.credentials.userId)
  const store = await Store.validateAndGetStoreById(request.params.storeid as string, requestingUser)

  const storeJson = store.toJSON()

  return {
    storeId: store._id.toString(),
    ...storeJson,
  }
}
