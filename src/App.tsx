import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import NewPost from "./Pages/NewPost/NewPost";
import OtherProfile from "./Pages/OtherProfiles/OtherProfiles";
import Profile from "./Pages/ProfilePage/Profile";
import SignUp from "./Pages/Signup/SignUp";

function App() {
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
}
export default App;
