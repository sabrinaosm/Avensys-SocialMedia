import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function Admin() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        gender: '',
        profile_picture: null,
        admin: false
    })

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: name === 'admin' ? value === 'true' : value
        }));
    };    
    
    const openEditModal = (user) => {
        setUpdatedUser(user);
    };


    const updateUser = (e) => {
        e.preventDefault();
        console.log(updatedUser)
        axios.put("http://localhost:8080/updateuser", updatedUser)
            .then((response) => {
                setUpdatedUser(response.data);
                loadUsers();
            })
            .catch((error) => {
                console.error(error.message);
            })
    };



    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users');
            setUsers(response.data);
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
            <h2>Admin Control</h2>
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
                                <button data-toggle="modal" data-target={`#exampleModal${user.user_id}`} onClick={() => openEditModal(user)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Edit Modal */}
            {users.map((user) => (
                <div
                    className="modal fade"
                    id={`exampleModal${user.user_id}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    key={user.user_id}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit User
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h4>Editing User: <b>@{user.username}</b></h4>
                                {/* User ID */}
                                <input type="number" className="form-control" name="user_id" value={updatedUser.user_id} onChange={handleUpdateChange} hidden/>

                                {/* First Name */}
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="first_name" value={updatedUser.first_name} onChange={handleUpdateChange} />
                                </div>
                                {/* Last Name */}
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="last_name" value={updatedUser.last_name} onChange={handleUpdateChange} />
                                </div>
                                {/* Username */}
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" name="username" value={updatedUser.username} onChange={handleUpdateChange} />
                                </div>
                                {/* Email */}
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" name="email" value={updatedUser.email} onChange={handleUpdateChange} />
                                </div>
                                {/* Gender */}
                                <div className="form-group">
                                    <select name="gender" onChange={handleUpdateChange} value={updatedUser.gender} className="custom-select custom-select-sm">
                                        <option value="">Gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                {/* Role */}
                                <div className="form-group">
                                    <select name="admin" onChange={handleUpdateChange} value={updatedUser.admin} className="custom-select custom-select-sm">
                                        <option value="">Role</option>
                                        <option value="true">Admin</option>
                                        <option value="false">User</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={updateUser}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Admin;
