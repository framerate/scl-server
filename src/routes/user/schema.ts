import Joi from 'joi'

export const userSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string(),
    flags: Joi.array().items(
      Joi.object().keys({
        flag: Joi.string(),
        meta: Joi.object(),
        created: Joi.date(),
        expirationDate: Joi.date().allow(null),
      }),
    ),
  })
  .label('User Schema')
