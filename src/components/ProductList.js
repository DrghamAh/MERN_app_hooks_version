import {React, useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";



const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      setProducts(response.data);
    })
  })

  return (
    <>
      <div className="input-group">
        <Link to="/products/add">Add product</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <a className="btn btn-primary"><Link to={`/products/update/${product._id}`} >Edit</Link></a>
                <button type="button" className="btn btn-danger" onClick={() => (this.handleDelete(product._id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;