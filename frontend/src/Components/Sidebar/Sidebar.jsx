import React from "react";
import { FaTachometerAlt, FaUsers, FaExchangeAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUsersSlash, FaComputer } from "react-icons/fa6";
import { RiLuggageDepositFill, RiLogoutCircleLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside
      className={`h-full ${isCollapsed ? "w-20" : "w-60"} p-4 bg-gray-200 `}
    >
      <ul>
        <li className="mb-2">
          <Link to="/" className="flex items-center p-2 hover:bg-gray-300">
            <IoHome className="mr-2" />
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/dashboard" className="flex items-center p-2 hover:bg-gray-300">
            <FaTachometerAlt className="mr-2" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="flex items-center p-2 hover:bg-gray-300">
            <FaUsers className="mr-2" />
            {!isCollapsed && <span>Users</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <FaUsersSlash className="mr-2" />
            {!isCollapsed && <span>Employees</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <RiLuggageDepositFill className="mr-2" />
            {!isCollapsed && <span>Departments</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <FaComputer className="mr-2" />
            {!isCollapsed && <span>Assets</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <FaExchangeAlt className="mr-2" />
            {!isCollapsed && <span>Asset Handlings</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <IoIosSettings className="mr-2" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link to="#" className="flex items-center p-2 hover:bg-gray-300">
            <RiLogoutCircleLine className="mr-2" />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
