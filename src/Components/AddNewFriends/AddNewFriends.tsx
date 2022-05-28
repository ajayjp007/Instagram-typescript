import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loadUsers } from "../Store/actions/allUsersActions";
import Button from "../UI/Button";
import "./AddNewFriends.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddNewFriends = ({ loadUsers, users }: any) => {
  const [viewOtherProfile, setViewOtherProfile] = useState<boolean>(false);
  const viewOtherProfileHandler = (event: any | undefined) => {
    localStorage.setItem("viewProfile", event.target.id);
    setViewOtherProfile(true);
  };
  const storeUsers = users.users;
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="add-friends-container">
      {viewOtherProfile && <Navigate to="/other-profile" />}
      {storeUsers.map((element: any, index: number) => {
        return (
          <div key={index} className="new-friends-details-container">
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              alt="profile picture"
              className="profile-picture-add-friends"
            />
            <p
              id={element.email}
              className="user-name-AddNewFriends"
              onClick={viewOtherProfileHandler}
            >
              {element.username}
            </p>
            <Button content={"Follow"} />
          </div>
        );
      })}
    </div>
  );
};

AddNewFriends.propTypes = {
  loadUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state: any) => ({
  users: state.users,
});

export default connect(mapStateToProps, { loadUsers })(AddNewFriends);
