import axios from "axios";
import React from "react";
import {Link} from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="input-group">
        <Link to="/categories/add">Add Category</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.categories.map(category => (
            <tr>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-primary" value={category._id} >Edit</button>
                <button className="btn btn-danger" >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Categories;