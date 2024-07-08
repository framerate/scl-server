import { type Request, type ResponseToolkit, type ResponseObject } from '@hapi/hapi'
import User from '../../database/models/User'
import StoreItem from '../../database/models/StoreItem'
import { type HealthJSON } from './types'

export const getHealth = (request: Request, h: ResponseToolkit): ResponseObject => {
  // TODO - make sure database etc are good before returning
  return h.response('Healthy!')
}

export const getHealthJson = async (): Promise<HealthJSON> => {
  const userCount = await User.countDocuments()
  const storeItemCount = await StoreItem.countDocuments()

  return {
    healthy: true,
    userCount,
    storeItemCount,
  }
}
