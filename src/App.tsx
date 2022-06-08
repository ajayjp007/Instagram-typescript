import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './container/HomePage/HomePage';
import Login from './Components/Login/Login';
import NewPost from './Components/NewPost/NewPost';
import OtherProfile from './container/OtherProfiles/OtherProfiles';
import Profile from './container/ProfilePage/Profile';
import SignUp from './Components/Signup/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login-page" />} />
      <Route path="/signup-page" element={<SignUp />} />
      <Route path="/login-page" element={<Login />} />
      <Route path="/home-page" element={<HomePage />} />
      <Route path="/newPost-page" element={<NewPost />} />
      <Route path="/UserProfile-page" element={<Profile />} />
      <Route path="/other-profile" element={<OtherProfile />} />
    </Routes>
  );
};
export default App;
