import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function Admin() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/feed');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (user_id) => {
    axios
      .delete(`http://localhost:8080/deleteuser/${user_id}`)
      .then((response) => {
        console.log('User deleted:', response.data);
        loadUsers(); // Reload the user data after deletion
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Created On</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.created_on}</td>
              <td>{user.admin ? <p>Admin</p> : <p>User</p>}</td>
              <td>
                <button onClick={() => handleDeleteClick(user.user_id)}>
                  Delete
                </button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
