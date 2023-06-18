import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from 'uuid';
import "./css/Feed.css";

function Feed() {
  // Get logged in user information
  const user = JSON.parse(localStorage.getItem('user'));
  // Check the state of isLoggedIn
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  // Loading Feed
  const [feed, setFeed] = useState([]);
  const loadFeed = async () => {
    try {
      let response = await axios.get("http://localhost:8080/feed");
      const sortedFeed = response.data.sort((a, b) => b.post_id - a.post_id);
      setFeed(sortedFeed);
    } catch (error) {
      console.error(error.response.data)
    }
  }

  // Handling of Video and Image Upload
  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
    previewFile(file);
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoUpload(file);
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
        setPost({ ...post, media: "image" });
      } else if (file.type.includes("video")) {
        reader.readAsDataURL(file);
        setPost({ ...post, media: "video" });
      } else {
        setPost({ ...post, media: null });
      }
    }
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `post-images/${imageUpload + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            handlePostCreation(url);
            setImageUpload(null);
          })
          .catch((error) => {
            console.error("Error retrieving download URL: ", error)
          })
      })
      .catch((error) => {
        console.error("Error uploading media: ", error);
      });
  }

  const uploadVideo = () => {
    if (videoUpload == null) return;
    const videoRef = ref(storage, `post-videos/${videoUpload + v4()}`);
    uploadBytes(videoRef, videoUpload)
      .then(() => {
        getDownloadURL(videoRef)
          .then((url) => {
            handlePostCreation(url);
            setVideoUpload(null);
          })
          .catch((error) => {
            console.error("Error retrieving download URL: ", error)
          })
      })
      .catch((error) => {
        console.error("Error uploading media: ", error);
      });
  }

  // Creation of Post
  const [post, setPost] = useState({
    content: '',
    image: null,
    video: null,
    created_on: new Date(),
    user: user
  })

  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (imageUpload) {
      uploadImage();
    } else if (videoUpload) {
      uploadVideo();
    } else {
      handlePostCreation(null);
    }
    setMediaPreview('');
  }

  const handlePostCreation = (mediaURL) => {
    let newPost = { ...post };
    if (imageUpload && !videoUpload) {
      newPost = { ...post, image: mediaURL };
    } else if (!imageUpload && videoUpload) {
      newPost = { ...post, video: mediaURL };
    }

    axios.post('http://localhost:8080/createpost', newPost)
      .then((response) => {
        setPost({ ...post, content: '' });
        loadFeed();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // Update Function


  // Delete Function
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

  useEffect(() => {
    loadFeed();
  }, [])

  return (
    <div className='feed-container'>
      {/* Create Post Container */}
      <div className='create-post-container'>
        <form onSubmit={handlePostSubmit} className='post-form'>
          <textarea className='form-control' placeholder='Create a new post!' name='content' value={post.content} onChange={handlePostChange} />
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile" accept="image/*" onChange={handleImageUpload} />
            <label className="custom-file-label">Add a photo!</label>
          </div>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile" accept="video/*" onChange={handleVideoUpload} />
            <label className="custom-file-label">Add a video!</label>
          </div>
          <button className='btn btn-primary' type='submit'>Create Post</button>
        </form>
      </div>

      {/* View All Posts Container */}
      <div className='view-post-container'>
        {/* For Each Post in Post, Display the Post and Details */}
        {feed.length === 0 ?
          (<p>No posts made yet! Begin by creating one now.</p>) :
          (feed.map((post) => (
            <div className='post-card' key={post.id}>
              <div className='post-user'>
                <div className='user-dp'>
                  {
                    post.user.profile_picture ?
                      (<img src={post.user.profile_picture} id='post-profile-picture' />) :
                      (<img src={require('../assets/placeholder.png')} id='post-profile-picture' />)
                  }
                </div>
                <div className='user-content'>
                  <div className='user-details'>
                    <b>{post.user.first_name} {post.user.last_name}</b>
                    <Link to={`/profile/${post.user.username}`}>
                      <span>@{post.user.username}</span>
                    </Link>
                  </div>
                  <div className='post-content'>
                    {
                      post.image ?
                        (<img src={post.image} width={'300px'} />) :
                        (null)
                    }
                    {
                      post.video ?
                        (<video src={post.video} width={'300px'} controls />) :
                        (null)
                    }
                    <p>{post.content}</p>
                    <small>Posted on {post.created_on}</small>
                  </div>
                </div>
              </div>
              <div class="btn-group dropright">
                <button type="button" className='dropdown-btn' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fi fi-rr-menu-dots"></i>
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" type="button" key={post.post_id} onClick={() => { handleTrashClick(post.post_id) }}>
                    <i className="fi fi-rr-trash"></i>
                    <span className='delete-dropdown'>Delete</span>
                  </button>
                  <a className="dropdown-item edit" type="button" key={post.post_id} data-toggle="modal" data-target={`#exampleModal${post.post_id}`}>
                    <i className="fi fi-rr-edit"></i>
                    <span className='edit-dropdown'>Edit</span>
                  </a>
                </div>
              </div>

              {/* Modal for Update */}
              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )))
        }
      </div>
    </div>
  )
}

export default Feed