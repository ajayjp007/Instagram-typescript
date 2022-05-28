import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUsers } from "../Store/actions/allUsersActions";

const Navbar = ({ loadUsers, users }: any) => {
  const [addPost, setAddPost] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openHome, setOpenHome] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const allUsernames: any = [];
  const storeUsers = users.users;

  useEffect(() => {
    loadUsers();
  }, []);

  storeUsers.map((item: any) => {
    allUsernames.push(item.username);
  });
  const searchUsersHandler = () => {
    for (let i = 0; i < allUsernames.length; i++) {
      let result = allUsernames[i].match(searchInputRef.current?.value);
      console.log(result);
      //loads result but not able to tap into it
    }
  };
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
        onChange={searchUsersHandler}
      />
      <div className="icons-container-navbar">
        <img
          className="icons-navbar"
          alt="home"
          src="https://img.icons8.com/external-jumpicon-line-ayub-irawan/344/external-home-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan.png"
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
          src="https://img.icons8.com/ios/344/near-me.png"
        />
        <img
          className="icons-navbar"
          title="Feature will be added soon."
          alt="comments"
          src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
        />
        <img
          className="icons-navbar"
          alt="Profile picture"
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          onClick={openProfileHandler}
        />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  loadUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  users: state.users,
});

export default connect(mapStateToProps, { loadUsers })(Navbar);
