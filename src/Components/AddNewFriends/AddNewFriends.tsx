import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../UI/Button";
import "./AddNewFriends.css";

const AddNewFriends = () => {
  const [otherActiveUsers, setOtherActiveUsers] = useState<any>([]);
  const [viewOtherProfile, setViewOtherProfile] = useState<boolean>(false);
  const viewOtherProfileHandler = () => {
    setViewOtherProfile(true);
  };
  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };
    const fetchData = async () => {
      await fetch(
        "http://localhost:5000/api/profiles/get-all-users",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setOtherActiveUsers(result.users);
        })
        .catch((error) => console.log("error", error));
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="add-friends-container">
      {viewOtherProfile && <Navigate to="/other-profile" />}
      {otherActiveUsers.map((element: any) => {
        return (
          <div
            key={element + 12}
            className="new-friends-details-container"
            id={element.email}
          >
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              alt="profile"
              className="profile-picture-add-friends"
            />
            <p
              className="user-name-AddNewFriends"
              onClick={viewOtherProfileHandler}
            >
              {element.username}
            </p>
            <Button content="Follow" />
          </div>
        );
      })}
      ;
    </div>
  );
};

export default AddNewFriends;
