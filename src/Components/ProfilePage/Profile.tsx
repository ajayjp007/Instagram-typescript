import React, { useState, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from 'src/container/Navbar/Navbar';
import Posts from '../../container/Posts/Posts';
import './Profile.css';

const Profile = () => {
  const [logOut, setLogOut] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const openSettingsHandler = () => {
    setOpenSettings(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    setLogOut(true);
  };
  const num = 10;
  return (
    <Fragment key={Math.floor(Math.random() * 100)}>
      <Navbar />
      {openSettings && <Navigate to="/user-settings" />}
      {logOut && <Navigate to="/" />}
      <div className="main-profile-container">
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
              {num}
              <p> Posts</p>
            </span>
            <span className="number-profile">
              {num}
              <p> followers</p>
            </span>
            <span className="number-profile">
              {num}
              <p> following</p>
            </span>
          </div>
        </div>
      </div>
      <Posts />
    </Fragment>
  );
};

export default Profile;
