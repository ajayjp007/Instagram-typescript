import React, { useEffect, useState } from "react";
import "./Posts.css";

const Posts = () => {
  const [postsData, setPostsData] = useState<any>([]);
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [postURL, setPostURL] = useState<string>();
  useEffect(() => {
    const email = localStorage.getItem("emailId");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const fetchData = async () => {
      await fetch("http://localhost:5000/api/posts/user-posts", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setPostsData(result.posts);
        })
        .catch((error) => console.log("error", error));
    };
    fetchData().catch(console.error);
  }, []);
  const deletePostHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      id: deleteId,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:5000/api/posts//delete-post", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };
  const openPostHandler = (event: any | undefined) => {
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
          <img
            src={element.imageURL}
            id={element._id}
            className="users-posts-profile"
            key="posts"
            onClick={openPostHandler}
            alt=""
          />
        );
      })}
      {openPost && (
        <div className="about-post-container">
          <img src={postURL} alt="Your post" className="post-about-posts" />
          <div className="options-container-about-post">
            <p className="option-items-about" onClick={deletePostHandler}>
              Delete Post
            </p>
            <p className="option-items-about">Archive Post</p>
            <p className="option-items-about">Edit Post</p>
            <p className="option-items-about" onClick={closePostHandler}>
              Close
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
