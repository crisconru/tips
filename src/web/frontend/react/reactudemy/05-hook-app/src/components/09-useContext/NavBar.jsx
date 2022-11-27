import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>useContext</Link>
      <div className='collapse navbar-collapse'>
        <div className='navbar-nav'>
          <NavLink exact activeClassName='active' to='/' className='nav-item nav-link'>HOME</NavLink>
          <NavLink exact activeClassName='active' to='about' className='nav-item nav-link'>ABOUT</NavLink>
          <NavLink exact activeClassName='active' to='login' className='nav-item nav-link'>LOGIN</NavLink>
        </div>
      </div>
    </nav>
  )
}
export default NavBar