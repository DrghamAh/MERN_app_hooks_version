import Joi from 'joi-browser';

const categorySchema = {
  name : Joi.string().required(),
}

export default categorySchema;