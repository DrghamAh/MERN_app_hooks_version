import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Joi from 'joi-browser';

function EditUser() {
  const [id] = useState(useParams().id);
  const [user, setUser] = useState({
    name : '',
    email : '',
    password : '',
    phone : '',
  });

  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:5000/users/${id}`).then(response => {
      console.log(response.data);
      setUser({
        name : response.data.name,
        email :  response.data.email,
        password : response.data.password,
        phone : response.data.phone,
      });
    });
  }, [id])

  const [errors, setErrors] = useState([]);

  const handleNameChange = (e) => {
    setUser({...user, name : e.target.value});
  }

  const handleEmailChange = (e) => {
    setUser({...user, email : e.target.value});
  }

  const handlePasswordChange = (e) => {
    setUser({...user, password : e.target.value});
  }

  const handlePhoneChange = (e) => {
    setUser({...user, phone : e.target.value});
  }

  const UserSchema = {
    name : Joi.string().required(),
    email : Joi.string().required().email(),
    password : Joi.string().required(),
    phone : Joi.string().required(),
  };

  const handleFormValidate = (e) => {
    e.preventDefault();
    const {error, value} = Joi.validate(user, UserSchema);
    
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

  const handleSaveData = user => {
    axios.put(`http://localhost:5000/users/${id}`, {
      name : user.name,
      email : user.email,
      password : user.password,
      phone : user.phone,
    }).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <form onSubmit={handleFormValidate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className='form-control' name='name' value={user.name} onChange={handleNameChange} />
          <span className='text-danger'>{errors.name ? errors.name : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" className='form-control' name='email' value={user.email} onChange={handleEmailChange} />
          <span className='text-danger'>{errors.email ? errors.email : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' name='password' value={user.password} onChange={handlePasswordChange} />
          <span className='text-danger'>{errors.password ? errors.password : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" className='form-control' name='phone' value={user.phone} onChange={handlePhoneChange} />
          <span className='text-danger'>{errors.phone ? errors.phone : ''}</span>
        </div>
        <button type="submit" className='btn btn-primary'>Create</button>
      </form>
    </div>
  )
}

export default EditUser
