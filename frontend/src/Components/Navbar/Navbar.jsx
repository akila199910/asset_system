import { useState } from "react";
import profilePic from "../../img/userprofile.png"; // Ensure the path is correct
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ onToggleSidebar }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handlePopupVisible = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <nav className="w-full p-3 text-white bg-slate-400">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <div className="pl-4 text-xl font-semibold">Logo</div>
          <div className="pl-2 text-xl font-semibold">App Name</div>
          <FaBars
            className="pl-2 text-xl cursor-pointer"
            onClick={onToggleSidebar}
          />
        </div>

        <div
          className="relative pr-4 cursor-pointer"
          onClick={handlePopupVisible}
        >
          <img
            src={profilePic}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          {isPopupVisible && (
            <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <Link to="/users/profile">My Profile</Link>
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  Settings
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
