import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <a href='#'><img src={require("../assets/logo.png")} width={'30px'} /></a>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <a className='nav-link' style={{ "fontWeight": "bold" }}>Hello, @{user.username}!</a>
        </li>
        <li className='nav-item'>
          <a className='nav-link'>
            <Link to="/feed">
              Home
            </Link>
          </a>
        </li>
        {
          user.isAdmin = true ? (
            <li className='nav-item'>
              <a className='nav-link'>
                <Link to="/admin">
                  Admin
                </Link>
              </a>
            </li>)
            : (null)
        }
        <li className='nav-item'>
          <a className='nav-link' onClick={handleLogout} id='logout-btn'>Logout</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar