import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Feed.css'
import Navbar from './Navbar';

function Feed() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const [feed, setFeed] = useState([])
  const [post, setPost] = useState({
    content: '',
    image: null,
    created_on: new Date(),
    user: user
  })

  const [updatedPost, setUpdatedPost] = useState({
    post_id: '',
    content: '',
    image: null,
    created_on: new Date(),
    user: user
  });

  useEffect(() => {
    loadFeed();

    if (!isLoggedIn) {
      navigate("/")
    }
  }, [])

  const loadFeed = async () => {
    try {
      let response = await axios.get("http://localhost:8080/feed");
      setFeed(response.data);
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/createpost", post)
      .then((response) => {
        setPost({ ...post, content: '' })
        loadFeed();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const handleUpdateChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  }

  const updatePost = (e) => {
    console.log(updatedPost)
    e.preventDefault();
    axios.put("http://localhost:8080/updatepost", updatedPost)
      .then((response) => {
        setUpdatedPost(response.data);
        loadFeed();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleTrashClick = (postId) => {
    axios.delete(`http://localhost:8080/deletepost/${postId}`)
      .then(response => {
        console.log('Post deleted:', response.data);
        loadFeed()
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  }


  const handlePostClick = (postId) => {
    const selectedPost = feed.find(post => post.post_id === postId);
    if (selectedPost) {
      setUpdatedPost({ ...selectedPost });
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <div className='create-post'>
        <form method='POST'>
          <textarea name='content' id='content' onChange={handleChange} value={post.content} className='form-control' cols='10' rows='4' placeholder='Create a post here!' />
          <div className='post-btn-grp'>
            <i class="fi fi-rr-copy-image"></i>
            <button onClick={handleSubmit} className="post-btn">Post</button>
          </div>

        </form>

      </div>

      <div className='posts'>
        {
          // Check if there are any posts made
          feed.length === 0 ? (<p style={{ textAlign: "center" }}>No posts made yet!</p>)
            : (

              feed.map((i) => (
                <div className='card' key={i.post_id} onClick={() => handlePostClick(i.post_id)}>
                  <div className='content-user'>

                  </div>
                  <div className='user-details'>
                    <b>{i.user.first_name} {i.user.last_name}</b>
                    <span>@{i.user.username}</span>
                  </div>
                  <p>{i.content}</p>
                  {
                    // Check if the user logged in is either an admin or the post is made by the logged in user
                    user.user_id === i.user.user_id || user.admin ?
                      (
                        <div className='post-action-btns'>
                          <a key={i.post_id} data-toggle="modal" data-target={`#exampleModal${i.post_id}`}>
                            <i className="fi fi-rr-edit"></i>
                          </a>

                          <a key={i.post_id} onClick={() => handleTrashClick(i.post_id)}>
                            <i className="fi fi-rr-trash"></i>
                          </a>
                        </div>
                      ) : (null)
                  }
                  <small>{i.created_on}</small>
                  {/* Start of Modal */}
                  <div className="modal fade" id={`exampleModal${i.post_id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel${i.post_id}`} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`exampleModalLabel${i.post_id}`}>Edit Post</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <b>Your original post:</b>
                          <p>{i.content}</p>
                          <input type='number' onChange={handleUpdateChange} name='post_id' value={updatedPost.post_id} hidden />
                          <textarea className='form-control' onChange={handleUpdateChange} name='content' value={updatedPost.content} style={{ border: '1px solid grey' }} />
                          <p>editing: {i.post_id}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" onClick={updatePost}>Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End of Modal */}
                </div>
              ))

            )

        }

      </div>

    </div>
  )
}

export default Feed