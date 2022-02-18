import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Category_details() {
  const [id, setId] = useState(useParams().id);
  const [category, setCategory] = useState({
    name : '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/categories/${id}`).then(response => {
      setCategory(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, [id]);

  return (
    <div>
      <div className='container'>
      <div className='card p-5'>
        <h1>Name : <span>{category.name}</span></h1>
        <Link className='btn btn-primary' to={`/categories/update/${id}`} >Edit</Link>
      </div>
    </div>
    </div>
  )
}

export default Category_details
