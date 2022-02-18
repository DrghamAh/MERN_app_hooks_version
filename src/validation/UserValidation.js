import Joi from 'joi-browser';

const UserSchema = {
  name : Joi.string().required().min(5),
  email : Joi.string().required(),
  phone : Joi.string().required(),
  password : Joi.string().min(8).required(),
};

export default UserSchema;