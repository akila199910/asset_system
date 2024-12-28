import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationRoute from "./Routes/AuthenticationRoutes/AuthenticationRoute";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import DashboardRoute from "./Routes/DashboardRoutes/DashboardRoute";
import UsersRoutes from "./Routes/UsersRoutes/UsersRoutes";
import EmployeeRoutes from "./Routes/EmployeeRoutes/EmployeeRoutes";
import DepartmentRoutes from "./Routes/DepartmentRoutes/DepartmentRoutes";
import AssetCategoryRoutes from "./Routes/AssetCategoryRoutes/AssetCategoryRoutes";
import AssetSubCategoryRoutes from "./Routes/AssetSubCategoryRoutes/AssetSubCategoryRoutes";
import AssetRoutes from "./Routes/AssetRoutes/AssetRoutes";
import AssetHandlingRoutes from "./Routes/AssetHandlingRoutes/AssetHandlingRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationRoute />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/users" element={<UsersRoutes />} />
          <Route path="/employee" element={<EmployeeRoutes />} />
          <Route path="/department" element={<DepartmentRoutes />} />
          <Route path="/asset_category" element={<AssetCategoryRoutes />} />
          <Route
            path="/asset_sub_category"
            element={<AssetSubCategoryRoutes />}
          />
          <Route path="/assets" element={<AssetRoutes />} />
          <Route path="/asset_handling" element={<AssetHandlingRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
