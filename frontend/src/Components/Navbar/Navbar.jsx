import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../img/userprofile.png";

const Navbar = ({ handleSidebar }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full p-4">
        <div className="flex items-center text-xl">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 mr-2"
            onClick={handleSidebar}
          />
          <span className="ml-2 font-semibold text-white">Sl-Assets</span>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="relative">
            <button className="text-white group">
              <FaUserCircle className="w-6 h-6 mt-1" />
              <div className="absolute right-0 z-10 hidden w-32 bg-white rounded-lg shadow group-focus:block top-full">
                <ul className="py-2 text-sm text-gray-950">
                  <li>
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
