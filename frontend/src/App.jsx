import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationRoute from "./Routes/AuthenticationRoutes/AuthenticationRoute";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import DashboardRoute from "./Routes/DashboardRoutes/DashboardRoute";
import UsersRoutes from "./Routes/UsersRoutes/UsersRoutes";

function App() {
  return (
    <div className="flex w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationRoute />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
          <Route path="/users" element={<UsersRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
