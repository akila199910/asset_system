import React from "react";
import { Route, Routes } from "react-router-dom";
import Asset from "../../Pages/Asset/Asset";

const AssetRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Asset />} />
    </Routes>
  );
};

export default AssetRoutes;
