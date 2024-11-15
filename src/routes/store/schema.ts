import Joi from 'joi'

export const storeSchema = Joi.object()
  .keys({
    name: Joi.string(),
    description: Joi.string(),
    storeId: Joi.string(),
  })
  .label('Store Schema')
