
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationRoute from "./Routes/AuthenticationRoutes/AuthenticationRoute";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import ProfileRoute from "./Routes/ProfileRoutes/ProfileRoute";

function App() {
  return (
    <div className="flex w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationRoute />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/users/profile" element={<ProfileRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
