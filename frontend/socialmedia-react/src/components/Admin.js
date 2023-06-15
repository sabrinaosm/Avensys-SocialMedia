import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
function Admin() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const loadUsers = async () => {
        try {
            let response = axios.get("http://localhost:8080/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const loadPosts = async () => {
        try {
            let response = axios.get("http://localhost:8080/feed");
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='container'>
            <Navbar />
        </div>
    )
}

export default Admin