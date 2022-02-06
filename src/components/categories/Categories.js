import axios from "axios";
import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { CategoriesContext, ProductsContext } from "../../App";

const Categories = () => {
  const {categories, dispatch} = useContext(CategoriesContext);
  const {products, dispatchProducts} = useContext(ProductsContext);

  const handleDelete = (id) => {
    dispatch({type : 'FETCH_LOADING'});
    try {
      axios.delete(`http://localhost:5000/categories/${id}`);
      dispatch({type : 'FETCH_SUCCESS', payload : categories.data.filter(category => 
        category._id !== id
      )})
      dispatchProducts({type : "MODIFICATION_SUCCESS", payload : products.data.filter(product => product._id !== id)})
    } catch (err) {
      dispatch({type : 'FETCH_FAILED', payload : err});
    }
  }

  return (
    <>
      <div className="input-group my-3">
        <Link to="/categories/add" className="btn btn-primary">Add Category</Link>
      </div>
      {categories.loading ? '<h1>loading</h1>' :
        <table className="table table-hover my-3">
          <thead>
            <tr className="bg-dark text-white-50">
              <th>name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          
            {categories.data.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>
                  <Link className="btn btn-outline-primary" to={`/categories/update/${category._id}`} ><i className="fa fa-pencil"></i></Link>
                  <Link className="btn btn-outline-warning" to={`/categories/${category._id}`} ><i className="fa fa-eye"></i></Link>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(category._id)} ><i className="fa fa-trash"></i></button>
                </td>
              </tr>
            ))}
          
          </tbody>
        </table>
      }
      {categories.error && ''}
    </>
  );
}

export default Categories;