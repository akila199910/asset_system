import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="w-full p-3 text-white bg-gray-800">
      <div className="flex items-center justify-between mx-auto ">
        <div className="flex pl-4 text-xl font-semibold">Dashboard Logo</div>
        <div className="hidden pr-4 space-x-4 md:flex">
        <div className="">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
        </div>
          {/* <Link to="/admin/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin/users" className="hover:text-gray-300">
            Users
          </Link>
          <Link to="/admin/reports" className="hover:text-gray-300">
            Reports
          </Link>
          <Link to="/admin/settings" className="hover:text-gray-300">
            Settings
          </Link> */}
        </div>
        <div className="flex items-center pr-4 md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 text-left">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Users
            </Link>
            <Link
              to="/admin/reports"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Reports
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
