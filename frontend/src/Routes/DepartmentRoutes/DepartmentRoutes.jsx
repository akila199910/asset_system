import React from "react";
import { Route, Routes } from "react-router-dom";
import Department from "../../Pages/Department/Department";

const DepartmentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Department />} />
    </Routes>
  );
};

export default DepartmentRoutes;
