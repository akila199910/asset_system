import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../../Pages/Authentication/LoginPage";
import SignupPage from "../../Pages/Authentication/SignupPage";

const AuthenticationRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthenticationRoute;
