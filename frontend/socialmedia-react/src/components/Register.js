import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/Register.css'

function Register() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    created_on: new Date()

  });


  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // axios.post("http://localhost:8080/createuser", userDetails)
    //   .then((response) => {
    //     navigate('/login');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    console.log(userDetails)
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/feed');
    }
  }, [isLoggedIn, navigate]);



  return (
    <div className='rg-container'>
      <img src={require('../assets/register.png')} alt="register image" />
      <div className='register-container'>
        <div className='register-title'>
          <h1>Registration</h1>
          <p>We're glad to have you here!<br /> Begin your journey and create an account here.</p>
        </div>
        <div className='register-body'>

          <div className='form-group'>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile" />
              <label className="custom-file-label">Choose a profile picture</label>
            </div>
          </div>

          <div className='form-group'>
            <input type='text' placeholder='First Name' name="first_name" onChange={handleChange} value={userDetails.firstName} className='form-control' />
          </div>

          <div className='form-group'>
            <input type='text' placeholder='Last Name' name="last_name" onChange={handleChange} value={userDetails.lastName} className='form-control' />
          </div>

          <div className='form-group'>
            <input type='text' placeholder='Username' name="username" onChange={handleChange} value={userDetails.username} className='form-control' />
          </div>

          <div className='form-group'>
            <input type='text' placeholder='Email' name="email" onChange={handleChange} value={userDetails.email} className='form-control' />
          </div>

          <div className='form-group'>
            <select className="custom-select" name="gender" onChange={handleChange} value={userDetails.gender}>
              <option selected value="">Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className='form-group'>
            <input type='password' placeholder='Password' name="password" onChange={handleChange} value={userDetails.password} className='form-control' />
          </div>

          <button className='btn' onClick={handleSubmit}>Let's get started!</button>
        </div>
        <p id='register-subtext'>Already have an account?
          <Link to='/login'>
            <span id="login-small"> Log In</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register