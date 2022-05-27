import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";

//set the props value accordingly when clicked on the other persons username
const OtherProfile = () => {
  const num = 0;
  const [following, setFollowing] = useState<boolean>(false);
  const followHandler = () => {
    setFollowing(!following);
  };
  return (
    <React.Fragment>
      <Navbar />
      <div className="main-profile-container">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
          alt="Your profile"
          className="user-profile-picture"
        />
        <div className="user-info-container">
          <div className="user-details-container-profile">
            <p className="username-profile">Other username</p>
            <button className="logout-btn-profile" onClick={followHandler}>
              {following ? "Following" : "Follow"}
            </button>
          </div>
          <span>their email</span>
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
    </React.Fragment>
  );
};

export default OtherProfile;
