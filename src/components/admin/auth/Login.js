
import axios from 'axios';
import Joi from 'joi-browser';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginSchema from '../../../validation/LoginValidation';
import AlertMessage from '../messages/AlertMessage';

function Login({history}) {
  const [data, setData] = useState({
    email : '',
    password : '',
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      window.location = 'http://localhost:3000/';
    }
  })

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'email' : setData({...data, email : e.target.value}); break;
      case 'password' : setData({...data, password : e.target.value}); break;
      default : setData(data);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const {error, value} = Joi.validate(data, LoginSchema, {abortEarly : false});

    if (!error) {
      console.log(value);
      handleSaveData(value);
      setLoading(false);
    } else {
      const errData = [];
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errData[name] = message;
      }
      setErrors(errData);
      setLoading(false);
    }
  }

  const handleSaveData = async (data) => {
    try {
      const config = {
        headers : {
          'Content-type' : 'application/json',
        }
      }

      const response = await axios.post('http://localhost:5000/auth/login',{
        email : data.email,
        password : data.password,
      }, config);

      if (response.status === 200) {
        localStorage.setItem('user_info', JSON.stringify(response.data._id));
        localStorage.setItem('user_info', JSON.stringify(response.data.token));
        setErrors({
          email : '',
          passowrd : '',
        });
        setSuccess(true);
      } else {
        setErrors({
          email : 'Email may not exist',
          password : 'Password May not correct',
        });
        console.log(response);
      }
    } catch (error) {
      setErrors({
        email : error.response.data.email,
        password : error.response.data.password,
      });
      console.log(error.response);
    }
  }

  return (
    <>
      {
        loading && 
        <div className="text-center my-3">
          <i className='spinner-border'></i>
        </div>
      }
      {
        success &&
        <AlertMessage type="success" content="You are logged in" />
      }
      <form  className="w-50 my-5 mx-auto" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor='email'>E-mail</label>
          <input type="email" className='form-control' name="email" value={data.email} onChange={handleInputChange} />
          <span className="text-danger">{errors.email ? errors.email : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input type="password" className='form-control' name="password" value={data.password} onChange={handleInputChange}  />
          <span className="text-danger">{errors.password ? errors.password : ''}</span>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <span className="text-dark ml-2">I don't have an account <Link to={`/signup`} >Sign up</Link></span>
      </form>
    </>
  );
}

export default Login;

