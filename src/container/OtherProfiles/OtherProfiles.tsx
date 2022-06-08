import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'src/container/Navbar/Navbar';

const OtherProfile = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const [postsData, setPostsData] = useState([]);
  const [numOfPosts, setNumOfPosts] = useState<number>();
  let numOfFriends;
  let usernameOfPerson;
  const users = useSelector((state: any) => state.users.users);
  const renderUser = localStorage.getItem('viewProfile');

  users.map((user: any) => {
    if (user.email === renderUser) {
      usernameOfPerson = user.username;
      numOfFriends = user.friends.length;
    }
  });

  const followHandler = () => {
    setFollowing(!following);
  };

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
          setNumOfPosts(result.posts.length);
          setPostsData(result.posts);
        })
        .catch((error) => error);
    };
    fetchData().catch();
  }, []);

  return (
    <Fragment key={Math.floor(Math.random() * 100000)}>
      <Navbar />
      <div className="main-profile-container" data-testid="otherProfile-elem">
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
            <span className="number-profile">{`${
              numOfPosts === undefined ? 'Loading' : numOfPosts
            } Posts`}</span>
            <span className="number-profile">{`${
              numOfFriends === undefined ? 'Loading' : numOfFriends
            } Friends`}</span>
            {/* <span className="number-profile">
              {num}
              <p>following</p>
            </span> */}
          </div>
        </div>
      </div>

      <div className="user-posts-container">
        {postsData.map((element: any) => {
          return (
            <img
              src={element.imageURL}
              className="users-posts-profile"
              key={Math.floor(Math.random() * 1000000)}
              alt="user profile"
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default OtherProfile;