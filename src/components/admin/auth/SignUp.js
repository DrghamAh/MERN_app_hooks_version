import React, { useState } from 'react';
import LoginSchema from '../../../validation/LoginValidation';
import {Link} from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';


function SignUp() {
  const [data, setData] = useState({
    name : '',
    email : '',
    password : '',
    confirmPassword : '',
    phone : '',
  });

  const [errors, setErrors] = useState([]);

  const handleInputChange = e => {
    switch(e.target.name) {
      case "name" : setData({...data, name : e.target.value}); break;
      case "email" : setData({...data, email : e.target.value}); break;
      case "password" : setData({...data, password : e.target.value}); break;
      case "phone" : setData({...data, phone : e.target.value}); break;
      default : setData(data);
    };
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const {error, value} = Joi.validate(data, LoginSchema, {abortEarly : false});

    if (!error) {
      setErrors([]);
      handleSaveData(value);
    } else {
      const errData = [];
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errData[name] = message;
      }
      setErrors(errData);
      console.log(errors);
    }

  }

  const handleSaveData = async user => {
    console.log(user);
    try {
      const config = {
        headers : {
          'Content-type' : 'application/json',
        },
      };
      const response = await axios.post('http://localhost:5000/users/add',{
        name : user.name,
        email : user.email,
        password : user.password,
        phone : user.phone,
      }, config);
      if (response) {
        localStorage.setItem('user_info', JSON.stringify(response.data._id));
        alert("You've Sign up successfully");
        setErrors([]);
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert("error" + error);
    }
  }

  return (
    <>
      <form className="w-50 my-5 mx-auto" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input type="text" name="name" className="form-control" value={data.name} onChange={handleInputChange} />
          <span className="text-danger">{errors.name || ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="name">E-mail</label>
          <input type="email" name="email" className="form-control" value={data.email} onChange={handleInputChange} />
          <span className="text-danger">{errors.email || ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" value={data.password} onChange={handleInputChange} />
          <span className="text-danger">{errors.password || ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" value={data.phone} onChange={handleInputChange} />
          <span className="text-danger">{errors.phone || ''}</span>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        <span className="text-dark ml-2">I already have an account <Link to={`/login`} >Login</Link></span>
      </form>
    </>
  );
}

export default SignUp;

