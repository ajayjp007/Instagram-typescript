import React, { useEffect, useState } from 'react';
import './Posts.css';

const Posts = () => {
  const [postsData, setPostsData] = useState<any>([]);
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [postURL, setPostURL] = useState<string>();
  useEffect(() => {
    const email = localStorage.getItem('emailId');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      email,
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const fetchData = async () => {
      await fetch('http://localhost:5000/api/posts/user-posts', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setPostsData(result.posts);
        })
        .catch((error) => error);
    };
    fetchData().catch();
  }, []);
  const deletePostHandler = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      id: deleteId,
    });
    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    await fetch('http://localhost:5000/api/posts//delete-post', requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => error);
    window.location.reload();
  };
  const openPostHandler = (event: any) => {
    setPostURL(event.target.src);
    setDeleteId(event.target.id);
    setOpenPost(true);
  };
  const closePostHandler = () => {
    setOpenPost(false);
  };

  return (
    <div className="user-posts-container">
      {postsData.map((element: any) => {
        return (
          <button
            onClick={openPostHandler}
            type="button"
            className="post-container-profile"
            id={element._id}
          >
            <img
              src={element.imageURL}
              id={element._id}
              className="users-posts-profile"
              alt=""
              key={Math.floor(Math.random() * 100)}
            />
          </button>
        );
      })}
      {openPost && (
        <div className="about-post-container">
          <img src={postURL} alt="Your post" className="post-about-posts" />
          <div className="options-container-about-post">
            <button
              className="option-items-about"
              onClick={deletePostHandler}
              type="button"
            >
              Delete Post
            </button>
            <button className="option-items-about" type="button">
              Archive Post
            </button>
            <button className="option-items-about" type="button">
              Edit Post
            </button>
            <button
              className="option-items-about"
              type="button"
              onClick={closePostHandler}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
