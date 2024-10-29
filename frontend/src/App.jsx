import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationRoute from "./Routes/AuthenticationRoutes/AuthenticationRoute";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";

function App() {
  return (
    <div className="flex w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationRoute />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
