import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const EditProduct = () => {
  const [id] = useState(useParams().id);
  const [product, setProduct] = useState({
    name : '',
    price : Number,
    quantity : Number,
    category_id : '',
  });

  const [categories, setCategories] = useState([])


  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(response => {
      setCategories(response.data);
    })
    axios.get(`http://localhost:5000/products/${id}`).then(response => {
      setProduct(product => ({...product, name : response.data.name}));
      setProduct(product => ({...product, price : response.data.price}));
      setProduct(product => ({...product, quantity : response.data.quantity}));
      setProduct(product => ({...product, category_id : response.data.category_id}));
    })
  }, [id]);

  const handleNameChange = (e) => {
    setProduct(product => ({...product, name : e.target.value}));
  }

  const handlePriceChange = (e) => {
    setProduct(product => ({...product, price : e.target.value}));
  }
  
  const handleQuantityChange = (e) => {
    setProduct(product => ({...product, quantity : e.target.value}));
  }

  const handleCategoryIdChange = (e) => {
    setProduct(product => ({...product, category_id : e.target.value}));
  }

  const handleFormSubmit = (e) => {
    axios.put(`http://localhost:5000/products/${id}`, {
      name : product.name,
      price : product.price, 
      quantity : product.quantity,
      category_id : product.category_id,
    }).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <form className="w-50 my-2 mx-auto" onSubmit={handleFormSubmit} >
        <input type="hidden" value={id} />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" className="form-control" value={product.price} onChange={handlePriceChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" className="form-control" value={product.quantity} onChange={handleQuantityChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className='form-control' name="category_id" onChange={handleCategoryIdChange}>
            <option>Select</option>
            {categories.map(category => <option value={category._id}>{category.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default EditProduct;