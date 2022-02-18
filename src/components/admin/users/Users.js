import axios from 'axios';
import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { UsersContext } from '../AdminDashborad';

function Users() {
  const {users, dispatch} = useContext(UsersContext);

  const handleDelete = (id) => {
    try {
      const response = axios.delete(`http://localhost/users/${id}`)
      if (response) {
        dispatch({type : 'FETCH_SUCCESS', payload : users.data.filter(user => user._id !== id)});
        console.log(response);
      } 
    } catch (error) {
      dispatch({type : 'FETCH_FAILED', payload : error.response.data});
      console.log(error);
    }
  }

  return (
    <div>
      <div className="input-group my-2">
        <Link className="btn btn-primary" to={'/users/add'} ><i className='fa fa-plus'></i> Add New User</Link>
      </div>
      <table className="table table-hover my-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.loading ? "Loading" : users.data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link className='btn btn-outline-primary' to={`/users/edit/${user._id}`} ><i className='fa fa-pencil'></i></Link>
                <Link className='btn btn-outline-warning' to={``}><i className='fa fa-eye'></i></Link>
                <button type='button' className='btn btn-outline-danger' onClick={() => handleDelete(user._id)} ><i className='fa fa-trash'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.error && ''}
    </div>
  )
}

export default Users
