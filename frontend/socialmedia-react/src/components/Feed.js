import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from 'uuid';
import './css/Feed.css'

function Feed() {
  // Get logged in user information
  const user = JSON.parse(localStorage.getItem('user'));
  // Check the state of isLoggedIn
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  // Media - Start
  const [mediaUpload, setMediaUpload] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('')

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setMediaUpload(file);
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result);
    };
    if (file) {
      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
      } else if (file.type.includes("video")) {
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadMedia = () => {
    if (mediaUpload == null) return;
    // Create a storage reference with a unique path for the image using v4
    const mediaRef = ref(storage, `post-images/${mediaUpload.name + v4()} `);
    uploadBytes(mediaRef, mediaUpload)
      .then(() => {
        getDownloadURL(mediaRef)
          .then((url) => {
            handlePostCreation(url);
            setMediaUpload(null);
          })
          .catch((error) => {
            console.error("Error retrieving download URL: ", error)
          })
      })
      .catch((error) => {
        console.error("Error uploading media: ", error);
      });
  }
  // Media - End

  // All Posts Data
  const [feed, setFeed] = useState([])

  // Singular Post Data
  const [post, setPost] = useState({
    content: '',
    media: null,
    created_on: new Date(),
    user: user
  })

  // Update Singular Post Data
  const [updatedPost, setUpdatedPost] = useState({
    post_id: '',
    content: '',
    media: '',
    created_on: new Date(),
    user: user
  });

  // Detect URL Links in Content
  const detectLinks = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
  };

  useEffect(() => {
    loadFeed();

    if (!isLoggedIn) {
      navigate("/")
    }
  }, [])

  // Retrieve Posts - Start
  const loadFeed = async () => {
    try {
      let response = await axios.get("http://localhost:8080/feed");
      const sortedFeed = response.data.sort((a, b) => b.post_id - a.post_id);
      setFeed(sortedFeed);
    } catch (error) {
      console.error(error.response.data)
    }
  }
  // Retrieve Posts - End

  // Create: Handling Data - Start
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }
  // Create: Handling Data - End


  // New Create Function - Start
  const handleSubmit = (e) => {
    e.preventDefault()
    if (mediaUpload) {
      uploadMedia();
    } else {
      handlePostCreation(null);
    }
    setMediaPreview(''); 
  };

  const handlePostCreation = (mediaURL) => {
    const newPost = { ...post, media: mediaURL };
    axios.post('http://localhost:8080/createpost', newPost)
      .then((response) => {
        setPost({ ...post, content: '' });
        loadFeed();
      })
      .catch((error) => {
        console.error(error);
      })
  }
  // New Create Function - End

  // Update: Handling Data - Start
  const handleUpdateChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  }
  // Update: Handling Data - End

  // Update Function - Start
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
  // Update Function - End

  // Delete Function - Start
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
  // Delete Function - End

  // Handle Username Click -> Goes to User Profile
  const handleUsernameClick = (username) => {
    loadFeed(username);
    navigate(`/profile/${username}`);
  };

  return (
    <div className='container'>
      {/* New Form - Start */}
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              name="content"
              placeholder="What's on your mind?"
              value={post.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {/* Preview File: */}
          <div className='img-preview-section'>
            {mediaPreview && (
              <div>
                {mediaPreview.startsWith("data:image") ? (
                  <img src={mediaPreview} width={'300px'} className='img-preview' />
                ) : (
                  <video src={mediaPreview} width={'300px'} className='img-preview' controls />
                )}
              </div>
            )}
          </div>

          <div className='post-btn-grp'>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile" accept="image/*, video/*" onChange={handleMediaUpload} />
              <label className="custom-file-label">Add a photo!</label>
            </div>
            <button type="submit" className="post-btn">
              Create Post
            </button>
          </div>
        </form>
      </div>
      {/* New Form - End */}

      {/* Display Post - START */}
      <div className='posts'>
        {
          // Check if there are any posts made
          feed.length === 0 ? (<p style={{ textAlign: "center" }}>No posts made yet!</p>)
            : (

              feed.map((i) => (
                <div className='post-card' key={i.post_id}>
                  <div className='img-content'>
                    {
                      i.user.profile_picture ?
                        (<img src={i.user.profile_picture} id="profile-picture" />) :
                        (<img src={require('../assets/placeholder.png')} id="profile-picture" />)
                    }

                    <div className='content-user'>
                      {/* Display user details */}
                      <div className='user-details'>
                        <b>{i.user.first_name} {i.user.last_name}</b>
                        <Link to={`/profile/${i.user.username}`} onClick={handleUsernameClick}><span>@{i.user.username}</span></Link>
                      </div>
                      <div>
                        <p dangerouslySetInnerHTML={{ __html: detectLinks(i.content) }}></p>
                        {i.media && (
                          i.media.startsWith("data:image") ? (
                            <img src={i.media} width={'300px'} alt="Uploaded Media" />
                          ) : (
                            <video src={i.media} width={'300px'} controls />
                          )
                        )}

                      </div><br />
                      <small>Posted on: {i.created_on}</small>
                    </div>
                  </div>

                  <div className='actions'>
                    {
                      // Check if the user logged in is either an admin or the post is made by the logged in user 
                      user.user_id === i.user.user_id || user.admin ?
                        (
                          <div className="btn-group dropright">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='btn-action'>
                              <i class="fi fi-bs-menu-dots"></i>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" key={i.post_id} data-toggle="modal" data-target={`#exampleModal${i.post_id}`}>
                                <i className="fi fi-rr-edit"></i><span id='edit-btn'>Edit</span>
                              </a>

                              <a className="dropdown-item" key={i.post_id} onClick={() => handleTrashClick(i.post_id)}>
                                <i className="fi fi-rr-trash"></i><span id='del-btn'>Delete</span>
                              </a>
                            </div>
                          </div>
                        ) : (null)
                    }
                  </div>

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
                          <b>Posted by: {i.user.first_name} {i.user.last_name} (@{i.user.username})</b><br />
                          {
                            i.media ?
                              (<img src={i.media} width='200px' />) :
                              (null)
                          }
                          <p>{i.content}</p>
                          <input type='number' onChange={handleUpdateChange} name='post_id' value={updatedPost.post_id} hidden />
                          <textarea className='form-control' onChange={handleUpdateChange} name='content' value={updatedPost.content} style={{ border: '1px solid grey' }} />
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