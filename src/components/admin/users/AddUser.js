import React, {useState} from 'react';
import axios from 'axios';
import UserSchema from '../../../validation/UserValidation';
import Joi from 'joi';

function AddUser() {
  const [user, setUser] = useState({
    name : '',
    email : '',
    password : '',
    phone : '',
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = e => {
    switch (e.target.name) {
      case "name"     : setUser({...user, name : e.target.name}); break;
      case "email"    : setUser({...user, email : e.target.value}); break;
      case "phone"    : setUser({...user, phone : e.target.value}); break;
      case "password" : setUser({...user, password : e.target.value}); break;
      default : setUser(user);
    }
  }

  const handleFormValidate = (e) => {
    e.preventDefault();
    const {error, value} = Joi.validate(user, UserSchema, {abortEarly : false});
    
    if (!error) {
      setErrors([]);
      handleSaveData(value);
    } else {
      const errData = [];
      for (var item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errData[name] = message;
      }
      setErrors(errData);
    }
  }

  const handleSaveData = async user => {
    try {
      const result = await axios.post('http://localhost:5000/users', {
        name : user.name,
        email : user.email,
        password : user.password,
        phone : user.phone,
      });
      console.log(result);  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleFormValidate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className='form-control' name='name' value={user.name} onChange={handleInputChange} />
          <span className='text-danger'>{errors.name ? errors.name : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" className='form-control' name='email' value={user.email} onChange={handleInputChange} />
          <span className='text-danger'>{errors.email ? errors.email : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' name='password' value={user.password} onChange={handleInputChange} />
          <span className='text-danger'>{errors.password ? errors.password : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" className='form-control' name='phone' value={user.phone} onChange={handleInputChange} />
          <span className='text-danger'>{errors.phone ? errors.phone : ''}</span>
        </div>
        <button type="submit" className='btn btn-primary'>Create</button>
      </form>
    </div>
  )
}

export default AddUser
