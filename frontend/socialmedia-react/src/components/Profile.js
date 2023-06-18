import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Profile.css';
import { useParams } from 'react-router';

function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const [feed, setFeed] = useState([])
  const [user, setUser] = useState([])
  const { username } = useParams();

  // Fetch user data based on the username
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/search/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    };
  };

  // Retrieve Posts 
  const loadFeed = async () => {
    try {
      let response = await axios.get("http://localhost:8080/feed");
      setFeed(response);
    } catch (error) {
      console.error(error.response.data)
    }
  }

  useEffect(() => {
    fetchUserData();
    loadFeed();
  }, [username])

  return (
    <div className='profile-container'>
      <div className='profile-left'>
        {/* Display profile information: */}
        <div className='profile-card'>
          {
            user.profile_picture ?
              (<img src={user.profile_picture} id="profile-dp" />) :
              (<img src={require('../assets/placeholder.png')} id="profile-dp" />)
          }
          <b>{user.first_name} {user.last_name}</b>
          <p>@{user.username}</p>
          <small>Joined {user.created_on}</small>
          <div className='ff-section'>
            <div className='following-section'>
              <b>100</b><span> Following</span>
            </div>
            <div className='followers-section'>
              <b>123</b><span> Followers</span>
            </div>
          </div>
        </div>
        {
          user.user_id == loggedInUser.user_id ?
            (<button className='btn btn-primary'>Edit Profile</button>)
            : (null)
        }

      </div>

      {/* Display all posts from this user: */}
    </div>
  )
}

export default Profile