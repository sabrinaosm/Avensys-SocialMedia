import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./css/Navbar.css"

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/')
  }

  const [searchTerm, setSearchTerm] = useState("");
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
    <div>
      {
        user ? (
          <nav className='navbar'>
            <a className='navbar-brand'>
              <img src={require('../assets/echotopia.png')} height={'35px'} />
            </a>
            <div className='nav'>
              <form className="form-inline" onSubmit={handleSearch}>
                <input className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <Link to='/'>
                <a>
                  @{user.username}
                </a>
              </Link>
              <Link to='/'>
                <a>
                  Home
                </a>
              </Link>
              {
                user.admin ?
                  (<Link to='/admin'>
                    <a>
                      Admin
                    </a>
                  </Link>)
                  :
                  (null)
              }
              <Link to='/'>
                <a onClick={handleLogout}>
                  Logout
                </a>
              </Link>
            </div>

          </nav>
        ) : (
          <nav className='navbar'>
            <a className='navbar-brand'>
              <img src={require('../assets/echotopia.png')} height={'35px'} />
            </a>
            <div className='nav'>
              <Link to='/login'>
                <a>
                  Login
                </a>
              </Link>
              <Link to='/register'>
                <a>
                  Register
                </a>
              </Link>
            </div>

          </nav>
        )
      }
    </div>
  )
}

export default Navbar