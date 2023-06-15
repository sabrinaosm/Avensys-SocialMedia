import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUsername } from '../redux.js'
import axios from 'axios'
import './css/Login.css'
import '../assets/login.png'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);

        axios.post("http://localhost:8080/login", params)
            .then((response) => {
                dispatch(getUsername())
                localStorage.setItem('isLoggedIn', true);
                navigate('/feed');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };



    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <div className='lg-container'>
            <div>
                <img src={require('../assets/login.png')} alt='login image' width={'300px'} />
            </div>
            <div className='login-container'>
                <div className='login-title'>
                    <h1>Login</h1>
                    <p>Welcome back! Log into your account here.</p>
                </div>
                <div className='login-body'>
                    <form>
                        <div className='form-group'>
                            <input type='text' id='username' name="username" onChange={handleChange} value={userDetails.username} placeholder='Username' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <input type='password' id='password' name="password" onChange={handleChange} value={userDetails.password} placeholder='Password' className='form-control' />
                        </div>

                        <button className='btn' onClick={handleSubmit}>Log In</button>
                    </form>
                </div>
                <p id='login-subtext'>Don't have an account?
                    <Link to='/register'>
                        <span id="register-small"> Sign Up</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login