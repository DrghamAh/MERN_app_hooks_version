import axios from "axios";
import {React, useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import {yup} from '@hookform/resolvers'
import Joi from 'joi-browser';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name : '',
    price : Number,
    quantity : Number,
    category_id : '',
  });

  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState([]);

  const { register, handleSubmit, errs } = useForm()

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(response => {
      setCategories(response.data);
    });
  }, []);


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

  
  const schema = {
    name : Joi.string().required(),
    price : Joi.number().required(),
    quantity : Joi.number().required(),
    category_id : Joi.string().required(),
  }
  
  const validateForm = (e) => {
    e.preventDefault();
    const result = Joi.validate(product, schema, {abortEarly : false});
    // console.log(result.error);
    const {error, value} = result;
    
    if (!error) {
      handleSave(value);
      setErrors([]);
    } else {
      const errsData = [];
      for(let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errsData[name] = message;
      }
      setErrors(errsData);
      console.log(error);
      console.log(errors);
      return errsData;
    }
  }

  const handleSave = (product) => {
    console.log(product);
    axios.post('http://localhost:5000/products', {
      name : product.name,
      price : product.price,
      quantity : product.quantity,
      category_id : product.category_id,
    }).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={validateForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleNameChange} />
          <span className="text-danger">{errors.name ? errors.name : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" className="form-control" value={product.price} onChange={handlePriceChange} />
          <span className="text-danger">{errors.price ? errors.price : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" className="form-control" value={product.quantity} onChange={handleQuantityChange} />
          <span className="text-danger">{errors.quantity ? errors.quantity : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <select name="category_id" className="form-control" onChange={handleCategoryIdChange}>
            <option>Select</option>
            {categories.map(category => {
              return (<option value={category._id}>{category.name}</option>)
            })}
          </select>
          <span className="text-danger">{errors.category_id ? errors.category_id : ''}</span>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default AddProduct;