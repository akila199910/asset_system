import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users/Users";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
};

export default UsersRoutes;
