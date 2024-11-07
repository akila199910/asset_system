import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../../Pages/Users/UserDashboard";

const DashboardRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  );
};

export default DashboardRoute;
