import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css'
import { useState } from 'react';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/')
  }

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/users/search/${searchTerm}`);
  
      if (!response.ok) {
        console.log(`Response: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  }
  

  return (
    <nav className='navbar'>
      <li className='nav-item'>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search usernames" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </li>
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
          user.admin ? (
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