import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className='container'>
          <Link className='navbar-brand' to={`/`} >MERN</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

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
            </ul>
            <form className="form-inline my-2 my-md-0">
              <input className="form-control" type="text" placeholder="Search" />
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;