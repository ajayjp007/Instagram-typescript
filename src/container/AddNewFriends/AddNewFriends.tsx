import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './AddNewFriends.css';

const AddNewFriends = () => {
  const [viewOtherProfile, setViewOtherProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state: any) => state.users.users);
  const viewOtherProfileHandler = (event: any | undefined) => {
    localStorage.setItem('viewProfile', event.target.id);
    setViewOtherProfile(true);
  };

  useEffect(() => {
    try {
      const requestOptions: any = {
        method: 'GET',
        redirect: 'follow',
      };
      const fetchAllUsers = async () => {
        await fetch(
          'http://localhost:5000/api/profiles/get-all-users',
          requestOptions,
        )
          .then((response) => response.json())
          .then((result) => {
            dispatch({ type: 'USERS-LOADED', payload: result.users });
          })
          .catch((error) => error);
      };
      fetchAllUsers().catch();
    } catch (err) {
      // handle err
    }
  }, []);

  return (
    <div className="add-friends-container">
      {viewOtherProfile && <Navigate to="/other-profile" />}
      {allUsers.map((element: any) => {
        return (
          <div
            key={Math.floor(Math.random() * 100)}
            className="new-friends-details-container"
          >
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
              alt="profile"
              className="profile-picture-add-friends"
            />
            <button
              type="button"
              id={element.email}
              className="user-name-AddNewFriends"
              onClick={viewOtherProfileHandler}
            >
              {element.username}
            </button>
            <Button content="Follow" />
          </div>
        );
      })}
    </div>
  );
};

export default AddNewFriends;
