import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Posts from "../../Components/Posts/Posts";
import "./Profile.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [logOut, setLogOut] = useState<boolean>(false);

  const logoutHandler = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("emailId");
    localStorage.removeItem("token");
    setLogOut(true);
  };

  const num = 10;
  return (
    <React.Fragment>
      <Navbar />
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
              {localStorage.getItem("userName")}
            </p>

            <img
              src="https://www.svgrepo.com/show/147459/settings.svg"
              className="settings-icon"
              alt="settings"
            />

            <button className="logout-btn-profile" onClick={logoutHandler}>
              Logout
            </button>
          </div>

          <span>{localStorage.getItem("emailId")}</span>

          <div className="followers-following-container">
            <span className="number-profile">
              {num} <p> Posts</p>
            </span>
            <span className="number-profile">
              {num}
              <p> followers</p>
            </span>
            <span className="number-profile">
              {num} <p> following</p>
            </span>
          </div>
        </div>
      </div>

      <Posts />
    </React.Fragment>
  );
};

export default Profile;
