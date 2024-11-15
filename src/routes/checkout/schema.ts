import Joi from 'joi'

export const healthJson = Joi.object({
  healthy: Joi.boolean(),
  // userCount: Joi.number().integer(),
})
