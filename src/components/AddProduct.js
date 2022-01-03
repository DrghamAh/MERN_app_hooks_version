import axios from "axios";
import {React, useState, useEffect} from "react";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(response => {
      setCategories(response.data);
    });
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  }

  const handleFormSubmit = (e) => {
    axios.post('http://localhost:5000/products/create', {
      name : name,
      price : price,
      quantity : quantity,
    }).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <form className="w-50 my-2 mx-auto" onSubmit={handleFormSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={name} onChange={handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" className="form-control" value={price} onChange={handlePriceChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" className="form-control" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category_id" onChange={handleCategoryIdChange}>
            <option>Select</option>
            {categories.map(category => <option value={category._id}>{category.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default AddProduct;