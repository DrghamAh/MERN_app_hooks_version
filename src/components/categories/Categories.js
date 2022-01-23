import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then((response) => {
      setCategories(response.data);
    })
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/categories', {
      data : {
        id : id,
      }
    }).then(response => {
      setCategories(categories.filter(category => {
        if (category.id != id) return category;
      }));
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <div className="input-group my-3">
        <Link to="/categories/add" className="btn btn-primary">Add Category</Link>
      </div>
      <table className="table table-hover my-3">
        <thead>
          <tr className="bg-dark text-white-50">
            <th>name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
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
    </>
  );
}

export default Categories;