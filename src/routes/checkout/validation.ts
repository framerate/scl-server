import Joi from 'joi'

export default {
  postCheckout: {
    payload: Joi.object({
      checkoutType: Joi.string().valid('STEAMWALLET', 'STRIPE').required(),
      items: Joi.array()
        .items(
          Joi.object({
            sku: Joi.string().required(),
            quantity: Joi.number().required(),
          }).label('Item'),
        )
        .required(),
      currency: Joi.string().valid('usd').default('usd'),
      // options: Joi.object({
      //   // isSteam: Joi.boolean().default(false), //I don't think we need this, since checkoutType is an enum
      // }),
    }).options({ stripUnknown: true }),
  },
  checkout: {
    // payload: Joi.object({
    //   checkoutType: Joi.string().required(),
    //   expectedTotal: Joi.number().required(),
    //   user: Joi.string().required(),
    //   items: Joi.array().items(
    //     Joi.object({
    //       sku: Joi.string().required(),
    //       quantity: Joi.number().required(),
    //     }).label('Item'),
    //   ),
    // }),
  },
}
