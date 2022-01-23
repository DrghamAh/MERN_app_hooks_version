import axios from 'axios';
import React, {useState, useEffect, useReducer} from 'react'
import {useParams, matchPath, Redirect, BrowserRouter} from 'react-router-dom';

const initialState = {
  data : '',
  err : '',
  loading : true,
};

const reducer = (currentState, action) => {
  switch (action) {
    case 'success' : return {
      data : currentState.data,
      err : '',
      loading : false,
    }
    case 'fail' : return {
      data : {},
      err : `Error : ${currentState.err}`,
      loading : false,
    }
    default : return currentState;
  }
}

function EditCategory({props}) {
  const [category, setCategory] = useState({});
  // const {id} = match.path;
  const {id} = useParams();

  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(`http://localhost:5000/categories/${id}`).then(response => {
      console.log(response.data);
      setCategory(response.data);
    });
  }, []);

  const handleFormSubmit = (e) => {
    axios.put(`http://localhost:5000/categories/${id}`, {
      name : e.target['name'].value,
    }).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleNameChange = (e) => {
    setCategory(category.name = e.target.value);
  }

  return (
    <form className="form-inline" onSubmit={handleFormSubmit}>
      {/* <h1>{id}</h1> */}
      <div className='form-group'>
        <label htmlFor='name'>Category name : </label>
        <input type="text" name='name' className='form-control' value={category.name} onChange={handleNameChange} />
        <span className='text-danger'></span>
      </div>
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>
  )
}

export default EditCategory
