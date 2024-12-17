import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../img/userprofile.png";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const Navbar = ({ handleSidebar }) => {
  const [businessList, setBusinessList] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/business`, {
        withCredentials: true,
      });
      setBusinessList(response.data.businesses || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleBusinessSelect = async (event) => {
    const business_id = event.target.value;

    try {
      const response = await axios.post(
        `${API_URL}/business/select_business`,
        { business_id },
        { withCredentials: true }
      );
      window.location.reload();
      console.log("Business selected:", response.data);
      setSelectedBusiness(business_id);
    } catch (error) {
      console.error("Error selecting business:", error);
    }
  };

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
          <span className="hidden ml-2 font-semibold text-white md:inline">
            Sl-Assets
          </span>
          {businessList.length > 0 ? (
            <select
              className="px-2 py-1 ml-5 border rounded-lg"
              value={selectedBusiness || ""} // Use selectedBusiness state as the value
              onChange={(event) => handleBusinessSelect(event)}
            >
              <option value="" disabled>
                Select a Business
              </option>
              {"select a business"}
              {businessList.map((business) => (
                <option
                  key={business._id}
                  value={business._id}
                  className="text-black"
                >
                  {business.businessName}
                </option>
              ))}
            </select>
          ) : (
            <p className="ml-5 text-gray-400">No businesses available</p>
          )}
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
