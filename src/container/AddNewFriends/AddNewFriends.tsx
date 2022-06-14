import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './AddNewFriends.css';

const AddNewFriends = () => {
  const dispatch = useDispatch();
  const [viewOtherProfile, setViewOtherProfile] = useState<boolean>(false);
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
    <div className="add-friends-container" data-testid="addNewFriends-test">
      {viewOtherProfile && <Navigate to="/other-profile" />}
      {allUsers.map((element: any) => {
        if (element.email === localStorage.getItem('emailId')) {
          localStorage.setItem('totalFriends', element.friends.length);
        }
        return (
          <div
            key={Math.floor(Math.random() * 1000000)}
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
              data-testid="view-Other-users-btn"
              className="user-name-AddNewFriends"
              onClick={viewOtherProfileHandler}
            >
              {element.username}
            </button>
            <Button content="Follow" id={element._id} />
          </div>
        );
      })}
    </div>
  );
};

export default AddNewFriends;
