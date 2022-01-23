import axios from 'axios';
import Joi from 'joi';
import {React, useState, useEffect } from 'react';
import validate from 'react-joi-validation';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleFormSubmit = (e) => {
    axios.post('http://localhost:5000/categories', {
      name : name,
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }


  return (
    <form className="form-inline" onSubmit={handleFormSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Category name : </label>
        <input type="text" name='name' className='form-control' value={name} onChange={handleNameChange} />
        <span className='text-danger'></span>
      </div>
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>
  );
}


export default AddCategory;