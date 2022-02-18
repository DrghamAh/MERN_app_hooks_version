import axios from 'axios';
import {React, useContext, useState } from 'react';
import { CategoriesContext } from '../AdminDashborad';

const AddCategory = () => {
  const [name, setName] = useState('');

  const {categories, dispatch} = useContext(CategoriesContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    try {
      const result = await axios.post('http://localhost:5000/categories', {
        name : name,
      });
      dispatch({type : "FETCH_SUCCESS", payload : [...categories, result.data]});
    } catch (error) {
      console.log(error);
    }

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