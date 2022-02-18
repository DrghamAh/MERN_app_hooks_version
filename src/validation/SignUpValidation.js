import Joi from 'joi-browser';

const SignUpSchema = {
  name : Joi.string().min(5).required(),
  email : Joi.string().email().required(),
  password : Joi.string().min(8).required(),
  phone : Joi.string().min(10).required(),
}

export default SignUpSchema;