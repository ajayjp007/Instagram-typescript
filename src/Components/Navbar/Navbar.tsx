import "./Navbar.css";
import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [addPost, setAddPost] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openHome, setOpenHome] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const AddNewPostHandler = () => {
    setAddPost(true);
    setOpenProfile(false);
    setOpenHome(false);
  };
  const openProfileHandler = () => {
    setOpenProfile(true);
    setAddPost(false);
    setOpenHome(false);
  };
  const homeHandler = () => {
    setAddPost(false);
    setOpenHome(true);
    setOpenProfile(false);
  };
  return (
    <div className="header-home">
      {addPost && <Navigate to="/newPost-page" />}
      {openProfile && <Navigate to="/UserProfile-page" />}
      {openHome && <Navigate to="/home-page" />}
      <img
        alt="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
        id="logo-home"
      />
      <input
        className="search-bar"
        type="text"
        placeholder="Search"
        ref={searchInputRef}
      />
      <div className="icons-container-navbar">
        <img
          className="icons-navbar"
          alt="home"
          src="https://cdn-icons.flaticon.com/png/512/2099/premium/2099144.png?token=exp=1653124278~hmac=fbe7860c6a31ba78d2f9b8348d80d60a"
          onClick={homeHandler}
        />
        <img
          className="icons-navbar"
          title="Feature will be added soon."
          alt="messages"
          src="https://cdn-icons-png.flaticon.com/512/589/589671.png"
        />
        <img
          className="icons-navbar"
          alt="add posts"
          src="https://cdn-icons-png.flaticon.com/512/3487/3487486.png"
          onClick={AddNewPostHandler}
        />
        <img
          className="icons-navbar"
          title="Feature will be added soon."
          alt="navigation"
          src="https://cdn-icons.flaticon.com/png/512/1947/premium/1947206.png?token=exp=1653124127~hmac=dc198e2d6aff9698b5b287a96484f4e5"
        />
        <img
          className="icons-navbar"
          title="Feature will be added soon."
          alt="comments"
          src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
        />
        <img
          className="icons-navbar"
          alt="Profile"
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          onClick={openProfileHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;
