import axios from "axios";
import {React, useState, useContext} from "react";
import Joi from 'joi-browser';
import { CategoriesContext, ProductsContext } from "../../App";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name : '',
    price : 0 || '',
    quantity : 0 || '',
    category_id : '',
  });

  const {categories} = useContext(CategoriesContext);
  const {products, dispatch} = useContext(ProductsContext);

  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'name' : setProduct(product => ({...product, name : e.target.value})); break;
      case 'price' : setProduct(product => ({...product, price : e.target.value})); break;
      case 'quantity' : setProduct(product => ({...product, quantity : e.target.value})); break;
      case 'category_id' : setProduct(product => ({...product, category_id : e.target.value})); break;
      default : setProduct(product => ({...product}));
    }
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

  const handleSave = async (product) => {
    try {
      const result = await axios.post('http://localhost:5000/products', {
        name : product.name,
        price : product.price,
        quantity : product.quantity,
        category_id : product.category_id,
      });
      dispatch({type : 'MODIFICATION_SUCCESS', payload : [...products.data, {
        _id : result.data._id,
        name : result.data.name,
        price : result.data.price,
        quantity : result.data.quantity,
        category_id : result.data.category_id,
      }]})
      setProduct({
        name : '',
        price : '',
        quantity : '',
        category_id : '',
      })
      console.log(products.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={validateForm} encType="multipart-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleInputChange} />
          <span className="text-danger">{errors.name ? errors.name : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" className="form-control" value={product.price} onChange={handleInputChange} />
          <span className="text-danger">{errors.price ? errors.price : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" className="form-control" value={product.quantity} onChange={handleInputChange} />
          <span className="text-danger">{errors.quantity ? errors.quantity : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <select name="category_id" className="form-control" onChange={handleInputChange}>
            <option value="null" >Select</option>
            {categories.data.map((category, index) => {
              return (<option key={index} value={category._id}>{category.name}</option>)
            })}
          </select>
          <span className="text-danger">{errors.category_id ? errors.category_id : ''}</span>
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input type="file" name="image" className="form-control" />
          <span className="text-danger"></span>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default AddProduct;