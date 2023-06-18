import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import './css/Admin.css';

function Admin() {
    const [users, setUsers] = useState([]);
    const loadUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users");
            const formattedUsers = response.data.map(user => ({
                ...user, created_on: moment(user.created_on).format('DD MMMM YYYY')
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error(error);
        }
    }

    const [posts, setPosts] = useState([]);
    const loadPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/feed");
            const formattedPosts = response.data.map(post => ({
                ...post, created_on: moment(post.created_on).format('DD MMMM YYYY')
            }));
            setPosts(formattedPosts);
        } catch (error) {
            console.error(error);
        }
    }

    const [display, setDisplay] = useState('users');

    // Delete Function
    const handleTrashClick = (postId) => {
        axios.delete(`http://localhost:8080/deletepost/${postId}`)
            .then(response => {
                console.log('Post deleted:', response.data);
                loadPosts();
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }

    useEffect(() => {
        loadUsers();
        loadPosts();
    }, [])

    return (
        <div className='admin-container'>
            <ul className="nav nav-pills">
                <li className="nav-item" role="presentation">
                    <a className={`nav-link ${display === 'users' ? 'active' : ''}`} href="#" onClick={() => setDisplay('users')}>Users</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={`nav-link ${display === 'posts' ? 'active' : ''}`} href="#" onClick={() => setDisplay('posts')}>Posts</a>
                </li>
            </ul>

            {/* Displaying Users */}
            {display === 'users' && (
                <div className='tab-content'>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Profile Picture</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Date Joined</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className='tbl-rows'>
                                    <th>{user.user_id}</th>
                                    <td>
                                        {
                                            user.profile_picture ?
                                                (<img src={user.profile_picture} className='admin-profile-picture' />) :
                                                (<img src={require('../assets/placeholder.png')} className='admin-profile-picture' />)
                                        }
                                    </td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>@{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.created_on}</td>
                                    <td>{user.admin = true ? (<p>Admin</p>) : (<p>User</p>)}</td>
                                    <td><i class="fi fi-rr-menu-dots"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}

            {/* Displaying Posts */}
            {display === 'posts' && (
                <div className='tab-content'>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Content</th>
                                <th scope="col">Image</th>
                                <th scope="col">Video</th>
                                <th scope="col">Date Posted</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <th>{post.post_id}</th>
                                    <td>{post.user.username}</td>
                                    <td>{
                                        post.content === "" ?
                                            (<i>User did not include content.</i>) :
                                            (<p>{post.content}</p>)
                                    }
                                    </td>
                                    <td>
                                        {
                                            post.image ?
                                                (<img src={post.image} id="admin-post-img" />)
                                                : (<i>User did not include image.</i>)
                                        }
                                    </td>
                                    <td>{
                                        post.video ?
                                            (<video src={post.video} id='admin-post-img' />)
                                            : (<i>User did not include video.</i>)
                                    }</td>
                                    <td>{post.created_on}</td>
                                    <td>
                                        <div class="btn-group dropright">
                                            <button type="button" class="dropdown-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fi fi-rr-menu-dots"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <button className="dropdown-item" type="button" key={post.post_id} onClick={() => { handleTrashClick(post.post_id) }}>
                                                    <i className="fi fi-rr-trash"></i>
                                                    <span className='delete-dropdown'>Delete</span>
                                                </button>
                                                <a className="dropdown-item edit" type="button" key={post.post_id} data-toggle="modal" data-target={`#exampleModal${post.post_id}`}>
                                                    <i className="fi fi-rr-edit"></i>
                                                    <span className='edit-dropdown'>Edit</span>
                                                </a>
                                            </div>
                                        </div></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    )
}

export default Admin
