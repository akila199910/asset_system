import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}

      <nav className="fixed top-0 z-10 flex items-center w-full h-16 px-4 text-white bg-gray-800">
        <Navbar handleSidebar={handleSidebar} />
      </nav>

      {/* Sidebar and Content */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} />

        {/* Main Content */}
        <main className="flex-grow p-4 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
