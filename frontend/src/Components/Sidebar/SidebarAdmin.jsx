import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiLuggageDepositFill, RiLogoutCircleLine } from "react-icons/ri";
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
    title: "Admin Users",
    icon: <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "admin/admin_users",
  },

  {
    id: 3,
    title: "Business",
    icon: <RiLuggageDepositFill className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "admin/business",
  },

  {
    id: 4,
    title: "Log Out",
    icon: <RiLogoutCircleLine className="inline-block w-6 h-6 mr-2 -mt-2" />,
    path: "/logout",
  },
];
const SidebarAdmin = ({ sidebarOpen }) => {
  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } w-64 h-full overflow-y-auto text-white bg-gray-800 scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300`}
      >
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

export default SidebarAdmin;
