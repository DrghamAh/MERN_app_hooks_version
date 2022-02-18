import React from 'react';
import { Link } from 'react-router-dom';

function Header ({history}) {
  const userInfo = localStorage.getItem('user_info');
  
  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('user_info');
    window.location = 'http://localhost:3000/';
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className='container'>
          <Link className='navbar-brand' to={`/`} >MERN</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {
            userInfo ?
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className='nav-link' to={`/categories`}>Categoires</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/products`}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/users`}>Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/orders`}>Orders</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0" onSubmit={handleLogOut}>
                <button type="submit" className="nav-link">Log out</button>
              </form>
            </div>:
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className='nav-link' to={`/`}>Home</Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0" onSubmit={handleLogOut}>
                <Link to={`/login`} className='nav-link'>Login</Link>
              </form>
            </div>
          }
        </div>
      </nav>
    </>
  )
}

export default Header;