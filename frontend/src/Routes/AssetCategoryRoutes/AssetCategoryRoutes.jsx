import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetCategory from "../../Pages/AssetCategory/AssetCategory";

const AssetCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AssetCategory />} />
    </Routes>
  );
};

export default AssetCategoryRoutes;
