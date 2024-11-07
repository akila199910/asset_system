import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";

const UserDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div className="flex flex-col w-full h-screen">
      {/* Navbar */}
      <Navbar onToggleSidebar={toggleSidebar}  />

      {/* Main Content */}
      <div className="flex flex-grow mt-2">
        {/* Sidebar */}
        <Sidebar isCollapsed={isSidebarCollapsed} />

        {/* Main Content Area */}
        <main className="flex-grow w-full p-4">
          <h1 className="text-2xl font-bold">Welcome to the User Dashboard</h1>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
