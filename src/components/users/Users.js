import axios from 'axios';
import React, {useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom';

const initialState = {
  products : [],
  loading : true,
  errors : '',
}

const reducer = (currentState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS" : 
      return {
        loading : false,
        users : action.payload,
        errors : ''
      };
    case "FETCH_FAILED" : 
      return {
        loading : false,
        users : [],
        errors : "Something went wrong...",
      }
    default : return currentState;
  }
}

function Users() {
  // const [users, setUsers] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('http://localhost:5000/users').then((response) => {
      // setUsers(response.data);
      // console.log(response);
      dispatch({type : "FETCH_SUCCESS", payload : response.data});
    }).catch(err => {
      dispatch({type : "FETCH_FAILED"})
    })
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`).then(response => {
      dispatch({type : "FETCH_SUCCESS", payload : state.users.filter(user => {
        if (user._id !== id) return user;
      })});
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
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
          {state.loading ? "Loading" : state.users.map((user, index) => (
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
          {state.errors ? state.errors : ''}
        </tbody>
      </table>
    </div>
  )
}

export default Users
