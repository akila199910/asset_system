import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetSubCategory from "../../Pages/AssetSubCategory/AssetSubCategory";

const AssetSubCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AssetSubCategory />} />
    </Routes>
  );
};

export default AssetSubCategoryRoutes;
