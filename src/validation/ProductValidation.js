import Joi from 'joi-browser';

const productSchema = {
  name : Joi.string().required(),
  price : Joi.number().required(),
  quantity : Joi.number().required(),
  category_id : Joi.string().required(),
}

export default productSchema;