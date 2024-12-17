import React from "react";
import { Route, Routes } from "react-router-dom";
import MyProfile from "../../Pages/Users/MyProfile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
    </Routes>
  );
};

export default ProfileRoute;
