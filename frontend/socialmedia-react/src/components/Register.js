import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/Register.css'

function Register() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
  });

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
    e.preventDefault();
    const validationErrors = {};
    for (const field in userDetails) {
      if (userDetails[field] === '') {
        validationErrors[field] = `Please enter a ${field.replace('_', ' ')}.`;
      }
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:8080/createuser", userDetails)
        .then((response) => {
          navigate('/login');
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Handle specific error messages
            if (error.response.data === 'Username is already in use.') {
              setErrors({ ...errors, username: 'Username is already in use.' })
            } else if (error.response.data === 'Email is already in use.') {
              setErrors({ ...errors, email: 'Email is already in use.' })
            }
          } else {
            console.error(error);
          };
        });
    }
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
            {errors.first_name && <p className='text-danger'>{errors.first_name}</p>}

          </div>

          <div className='form-group'>
            <input type='text' placeholder='Last Name' name="last_name" onChange={handleChange} value={userDetails.lastName} className='form-control' />
            {errors.last_name && <p className='text-danger'>{errors.last_name}</p>}

          </div>

          <div className='form-group'>
            <input type='text' placeholder='Username' name="username" onChange={handleChange} value={userDetails.username} className='form-control' />
            {errors.username && <p className='text-danger'>{errors.username}</p>}

          </div>

          <div className='form-group'>
            <input type='text' placeholder='Email' name="email" onChange={handleChange} value={userDetails.email} className='form-control' />
            {errors.email && <p className='text-danger'>{errors.email}</p>}

          </div>

          <div className='form-group'>
            <select className="custom-select" name="gender" onChange={handleChange} value={userDetails.gender}>
              <option selected value="">Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className='text-danger'>{errors.gender}</p>}

          </div>

          <div className='form-group'>
            <input type='password' placeholder='Password' name="password" onChange={handleChange} value={userDetails.password} className='form-control' />
            {errors.password && <p className='text-danger'>{errors.password}</p>}

          </div>

          <button id='rg-btn' onClick={handleSubmit}>Let's Get Started!</button>
        </div>
        <p id='register-subtext'>Already have an account? <b><Link to='/login'>Log In</Link></b>
          
        </p>
      </div>
    </div>
  )
}

export default Register