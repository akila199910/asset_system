import React from "react";
import { FaTachometerAlt, FaUsers, FaExchangeAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUsersSlash, FaComputer } from "react-icons/fa6";
import { RiLuggageDepositFill, RiLogoutCircleLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const navLinks = [
  {
    id: 1,
    title: "Home",
    icon: <IoHome className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/",
  },
  {
    id: 2,
    title: "Dashboard",
    icon: <FaTachometerAlt className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/dashboard",
  },
  {
    id: 3,
    title: "Users",
    icon: <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/users",
  },
  {
    id: 4,
    title: "Employees",
    icon: <FaUsersSlash className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/employees",
  },
  {
    id: 5,
    title: "Departments",
    icon: <RiLuggageDepositFill className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/departments",
  },
  {
    id: 6,
    title: "Assets Categories",
    icon: <FaComputer className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/employees",
  },{
    id: 10,
    title: "Assets Sub Categories",
    icon: <FaComputer className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/employees",
  },
  {
    id: 11,
    title: "Assets",
    icon: <FaComputer className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/employees",
  },
  {
    id: 7,
    title: "Assets Handlings",
    icon: <FaExchangeAlt className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/asset_handlings",
  },
  {
    id: 8,
    title: "Settings",
    icon: <IoIosSettings className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/asset_handlings",
  },
  {
    id: 9,
    title: "Log Out",
    icon: <RiLogoutCircleLine className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/logout",
  },
];
const Sidebar = ({ sidebarOpen }) => {
  return (
    <>
      <aside className={`${sidebarOpen ? "block" : "hidden"} w-64 h-full overflow-y-auto text-white bg-gray-800 scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300`}>
      {/*  */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center">
            <div className="p-4">
              {navLinks.map((link) => (
                <div key={link.id} className="p-2 mb-3">
                  <Link to={link.path} className="flex items-center">
                    {link.icon}
                    <span className="ml-2">{link.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
