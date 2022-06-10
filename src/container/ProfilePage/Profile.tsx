import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';
import './Profile.css';

const Profile = () => {
  const [logOut, setLogOut] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const posts = useSelector((state: any) => state.posts.posts);
  let postCount: number = 0;

  posts.forEach((post: any) => {
    if (post.name === localStorage.getItem('userName')) {
      postCount += 1;
    }
  });
  const openSettingsHandler = () => {
    setOpenSettings(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    localStorage.removeItem('totalFriends');
    localStorage.removeItem('viewProfile');
    setLogOut(true);
  };

  return (
    <Fragment key={Math.floor(Math.random() * 1000000)}>
      <Navbar />
      {openSettings && <Navigate to="/user-settings" />}
      {logOut && <Navigate to="/" />}
      <div className="main-profile-container" data-testid="Profile-elem">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
          alt="Your profile"
          className="user-profile-picture"
        />
        <div className="user-info-container">
          <div className="user-details-container-profile">
            <p className="username-profile">
              {localStorage.getItem('userName')}
            </p>
            <button
              className="settings-btn-icon"
              type="button"
              aria-label="settings"
              onClick={openSettingsHandler}
            />
            <button
              className="logout-btn-profile"
              onClick={logoutHandler}
              type="button"
              aria-label="logout"
            >
              Logout
            </button>
          </div>
          <span>{localStorage.getItem('emailId')}</span>
          <div className="followers-following-container">
            <span className="number-profile">
              {`${postCount === undefined ? 'Loading' : postCount} Posts`}
            </span>
            <span className="number-profile">
              {`${localStorage.getItem('totalFriends')} Friends`}
            </span>
          </div>
        </div>
      </div>
      <Posts />
    </Fragment>
  );
};

export default Profile;
