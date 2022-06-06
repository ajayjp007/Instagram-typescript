import React, { useState, useEffect, Fragment } from 'react';
import Navbar from 'src/container/Navbar/Navbar';

const OtherProfile = () => {
  const num = 0;
  const [following, setFollowing] = useState<boolean>(false);
  const [postsData, setPostsData] = useState([]);
  const [usernameOfPerson, setUsernameOfPerson] = useState<string>();

  const followHandler = () => {
    setFollowing(!following);
  };

  const renderUser = localStorage.getItem('viewProfile');
  useEffect(() => {
    const raw = JSON.stringify({
      email: renderUser,
    });
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

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
          setUsernameOfPerson(result.posts[0].name);
          setPostsData(result.posts);
        })
        .catch((error) => error);
    };
    fetchData().catch();
  }, []);

  return (
    <Fragment key={Math.floor(Math.random() * 100)}>
      <Navbar />
      <div className="main-profile-container">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
          alt="Your profile"
          className="user-profile-picture"
        />
        <div className="user-info-container">
          <div className="user-details-container-profile">
            <p className="username-profile">{usernameOfPerson}</p>
            <button
              className="logout-btn-profile"
              onClick={followHandler}
              type="button"
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>

          <span>{renderUser}</span>

          <div className="followers-following-container">
            <span className="number-profile">
              {num}
              <p> Posts</p>
            </span>
            <span className="number-profile">
              {num}
              <p> followers</p>
            </span>
            <span className="number-profile">
              {num}
              <p>following</p>
            </span>
          </div>
        </div>
      </div>

      <div className="user-posts-container">
        {postsData.map((element: any) => {
          return (
            <img
              src={element.imageURL}
              className="users-posts-profile"
              key={Math.floor(Math.random() * 100)}
              alt="user profile"
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default OtherProfile;
