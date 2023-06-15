import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { userStore } from './redux.js';
import './style.css'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Users from './components/Users'
import Feed from './components/Feed';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/users' element={<Users />} />
                <Route path='/feed' element={<Feed />} />
            </Routes>
        </Router>
    )
}

render(<Provider store={userStore}><App /></Provider>, document.getElementById('root'))