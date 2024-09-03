import React from 'react';

const Header = () => {
  return (
    <>
 <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></a></li>
            <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></a></li>
          </ul>
          
        </form>

       
      </nav>
    </>
  )
}

export default Header;