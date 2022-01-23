import {React, useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(response => {
      setCategories(response.data);
    });
    axios.get('http://localhost:5000/products').then((response) => {
      setProducts(response.data);
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/products', {
      data : {
        id : id
      }
    }).then(response => {
      setProducts(products.filter(product => {
        if (product.id != id) return product
      }));
    });
  }

  const category_name = (id) => {
    const category = categories.find(({ _id }) => _id == id);
    return category !== undefined ? category.name : '';
  }

  return (
    <>
      <div className="input-group my-3">
        <Link to="/products/add" className="btn btn-primary">Add product</Link>
      </div>
      <table className="table table-hover my-3">
        <thead>
          <tr className="bg-dark text-white-50">
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              {/* <td>{categories.find((category) => category._id === product.category_id).name}</td> */}
              <td>{category_name(product.category_id)}</td>
              <td>
                <Link className="btn btn-outline-primary" to={`/products/update/${product._id}`} ><i className="fa fa-pencil"></i></Link>
                <Link className="btn btn-outline-warning" to={`/products/${product._id}`} ><i className="fa fa-eye"></i></Link>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(product._id)}><i className="fa fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;