import Joi from 'joi'

export default {
  user: {
    name: Joi.string().required(),
  },
}
