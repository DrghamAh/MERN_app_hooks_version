import Joi from 'joi-browser';

const LoginSchema = {
  email : Joi.string().email().required(),
  password : Joi.string().min(8).required(),
}

export default LoginSchema;
