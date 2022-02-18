import React from 'react';
import Hero from './Hero';

function Header() {
  const handleToggleClick = () => {
    let navBarHeight = document.getElementById('nav-bar');
    if (navBarHeight.style.height == "4rem") {
      navBarHeight.style.height = "18rem";
    } else {
      navBarHeight.style.height = "4rem"
    }
  }

  return (
    <header>
      <nav className="navigation-bar" id="nav-bar">
        <div className="toggle-collapse">
          <button type="button" className="toggle-button" onClick={handleToggleClick}>
            <i className="fa fa-navicon"></i>
          </button>
        </div>
        <div className="nav-brand">
          <a href="#" className='nav-brand-link'>MERN</a>
        </div>
        <ul className='nav-list'>
          <li><a href="" className="nav-item">Products</a></li>
          <li><a href="" className='nav-item'>Categories</a></li>
          <li><a href="" className="nav-item">About us</a></li>
        </ul>
        <div className='cart'>
          <a href="" className="nav-item"><i className="fa fa-cart-plus"></i></a>
        </div>
      </nav>
      <Hero />
    </header>
  );
}

export default Header;
