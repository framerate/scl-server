import Joi from 'joi'

export default {
  store: {
    payload: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      public: Joi.boolean().default(false),
    }),
  },
}
