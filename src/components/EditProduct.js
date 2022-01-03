import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const EditProduct = () => {
  return (
    <>
      <form className="w-50 my-2 mx-auto" onSubmit={this.handleFormSubmit} >
        <input type="hidden" value={this.state.id} />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" className="form-control" value={this.state.price} onChange={this.handlePriceChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" className="form-control" value={this.state.quantity} onChange={this.handleQuantityChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category_id" onChange={this.handleCategoryIdChange}>
            <option>Select</option>
            {this.state.categories.map(category => <option value={category._id}>{category.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default EditProduct;