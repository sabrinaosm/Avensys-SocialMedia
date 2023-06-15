import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Feed.css'

function Feed() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([])
  const [post, setPost] = useState({
    content: '',
    image: null,
    created_on: new Date()
  })

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/')
  }

  useEffect(() => {
    loadFeed();
  }, [])

  const loadFeed = async() => {
    const result = await axios.get("http://localhost:8080/feed");
    setFeed(result.data)
  }

  const handleChange = (e) => {
    setPost({...post, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/createpost", post)
    .then((response) => {
      console.log(response.data);
      loadFeed();
      document.getElementById('content').innerHTML = '';

    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const handlePostClick = (postId) => {
    console.log('Clicked Post ID:', postId);
  };


  return (
    <div>
      <nav className='navbar'>
        <a href='#'><img src={require("../assets/logo.png")} width={'30px'}/></a>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href="#">@Username</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={handleLogout} id='logout-btn'>Logout</a>
          </li>
        </ul>
      </nav>

      <div className='container'>

        <div className='create-post'>
          <textarea name='content' id='content' onChange={handleChange} value={post.content} className='form-control' cols='10' rows='4' placeholder='Create a post here!' />
          <button onClick={handleSubmit} className="btn">Post</button>
        </div>

        <div className='posts'>
            {
              feed.map((i) => (
                <div className='card' key={i.post_id} onClick={() => handlePostClick(i.post_id)}>
                  <a><i class="fi fi-rr-trash"></i></a>
                  <p>{i.content}</p>
                  <small>{i.created_on}</small>
                </div>
              ))
            }
        </div>

      </div>
    </div>
  )
}

export default Feed