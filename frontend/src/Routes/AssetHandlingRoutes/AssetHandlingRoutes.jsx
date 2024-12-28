import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetHandling from "../../Pages/AssetHandling/AssetHandling";

const AssetHandlingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AssetHandling />} />
    </Routes>
  );
};

export default AssetHandlingRoutes;
