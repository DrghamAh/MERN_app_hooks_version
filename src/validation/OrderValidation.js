import Joi from 'joi'

const OrderSchema = {
  user_id : Joi.string().required(),
  product_id : Joi.string().required(),
  quantity : Joi.number().required().default(1),
  subtotal : Joi.number().required(),
}

export default OrderSchema;