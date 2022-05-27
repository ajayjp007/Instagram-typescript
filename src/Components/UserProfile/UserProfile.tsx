import React from "react";
import AddNewFriends from "../AddNewFriends/AddNewFriends";
import Button from "../UI/Button";
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="newFriends-user-container">
      <div className="user-profile-container">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
          alt="Your Profile Picture"
          className="user-profile-picture-home"
        />
        <p>{localStorage.getItem("userName")}</p>
        <Button content={"Switch"} />
      </div>
      <AddNewFriends />
    </div>
  );
};

export default UserProfile;
