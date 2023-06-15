import React from 'react'
import { Link } from 'react-router-dom'
import "./css/LandingPage.css"
import "../assets/home.png"

function LandingPage() {
  return (
    <div className="container">
      <img src={require('../assets/home.png')} alt="Home Image" width={'500px'}/>
      <div className="landing-container">
        <h1 id='landing-h1'>Welcome to <br /><span>Echotopia!</span></h1>
        <p>Explore, discover and make some new friends!</p>
        <div className="user-buttons">
          <Link to="/login">
            <button className="btn" id='login-btn'>Log In</button>
          </Link>
          <Link to="/register">
            <button className="btn" id='register-btn'>Register</button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default LandingPage