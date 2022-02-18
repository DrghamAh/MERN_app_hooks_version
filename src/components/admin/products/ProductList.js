import {React, useContext, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import { CategoriesContext, ProductsContext } from '../AdminDashborad';

const ProductList = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem('user_info')));
  const {products, dispatch} = useContext(ProductsContext);
  const {categories} = useContext(CategoriesContext);

  const handleDelete = (id) => {

    console.log(id);
    console.log(products.data.filter(product => product._id !== id));
    try {
      const result = axios.delete(`http://localhost:5000/products/${id}`, {
        headers : {
          'Content-type' : 'application/json',
          'Autherization' : 'application/json',
          'Token': userInfo,
        }
      });
      console.log(result);
      dispatch({type : 'MODIFICATION_SUCCESS', payload : products.data.filter(product => 
        product._id !== id
      )})
    } catch (error) {
      dispatch({type : 'MODIFICATION_FAILED', payload : error})
    }
    
  }

  const category_name = (id) => {
    const category = categories.data.find(({ _id }) => _id === id);
    return category !== undefined ? category.name : '';
  }

  return (
    <>
      <div className="input-group my-3">
        <Link to="/products/add" className="btn btn-primary">Add product</Link>
      </div>
      {products.loading ? 'Loading' : 
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
            {products.data.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                {/* <td>{categories.find((category) => category._id === product.category_id).name}</td> */}
                <td>{category_name(product.category_id)}</td>
                <td>
                  <Link className="btn btn-outline-primary" to={`/products/update/${product._id}`} ><i className="fa fa-pencil"></i></Link>
                  <Link className="btn btn-outline-warning" to={`/products/${product._id}`} ><i className="fa fa-eye"></i></Link>
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(product._id)} ><i className="fa fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      
    </>
  );
}

export default ProductList;