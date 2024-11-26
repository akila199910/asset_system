import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../../Components/Navbar/Navbar";
import DataTable from "react-data-table-component";
import BusinessModal from "./BusinessModel";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
const API_URL = process.env.REACT_APP_API_URL;

const Business = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [editBusiness, setEditBusiness] = useState({
    _id: "",
    businessName: "",
    businessEmail: "",
    address: "",
    ownerId: "",
    city: "",
    businessStatus: false,
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    ownerStatus: false,
    role: "business_user",
  });

  const handleSidebar = () => setSidebarOpen(!sidebarOpen);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/business`, {
        withCredentials: true,
      });
      setTableData(response.data.businesses || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Business Name",
      cell: (row) => (
        <div
          className="flex space-x-2 font-bold"
          // onClick={() => moveToDashboard(row._id)}
        >
          {row.businessName}{" "}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Business Email",
      selector: (row) => row.businessEmail,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row) => row.ownerId,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => (row.status ? "True" : "False"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="px-2 py-1 text-white bg-blue-500 rounded"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="px-2 py-1 text-white bg-red-500 rounded"
            type="button"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f3f4f6",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: "12px",
      },
    },
    cells: {
      style: {
        padding: "12px",
      },
    },
  };
  const handleAddBusiness = () => {
    setEditBusiness({});
    setIsModalOpen(true);
  };

  const handleEdit = async (row) => {
    try {
      // If additional data is required, fetch it from the backend
      const response = await axios.get(`${API_URL}/business/${row._id}`, {
        withCredentials: true,
      });
      const businessData = response.data.data;

      setEditBusiness({
        _id: businessData._id,
        businessName: businessData.businessName,
        businessEmail: businessData.businessEmail,
        address: businessData.address,
        ownerId: businessData.owner._id,
        city: businessData.city,
        businessStatus: businessData.status,
        profilePic: businessData.owner.profilePic,
        firstName: businessData.owner.firstName,
        lastName: businessData.owner.lastName,
        email: businessData.owner.email,
        contact: businessData.owner.contact,
        ownerStatus: businessData.owner.status,
        role: businessData.owner.role,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  const handleDelete = (id) => {
    console.log("Delete Business ID:", id);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}

      <nav className="fixed top-0 z-10 flex items-center w-full h-16 px-4 text-white bg-gray-800">
        <Navbar handleSidebar={handleSidebar} />
      </nav>

      {/* Sidebar and Content */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <SidebarAdmin sidebarOpen={sidebarOpen} />

        {/* Main Content */}
        <main className="flex-grow p-4 overflow-auto bg-gray-100">
          <div className="relative bg-white rounded-md shadow-md">
            {/* Header section with fixed background */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
              <h2 className="p-4 text-lg font-bold text-gray-800">
                Business Data
              </h2>
              <button
                className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
                onClick={handleAddBusiness}
              >
                Add Business
              </button>
            </div>

            {/* Table section with separate background */}
            <div className="p-4 overflow-auto bg-gray-50">
              <DataTable
                columns={columns}
                pagination
                highlightOnHover
                customStyles={customStyles}
                data={tableData}
              />
            </div>
          </div>

          {isModalOpen && (
            <BusinessModal
              onClose={() => setIsModalOpen(false)}
              businessData={editBusiness}
              fetchData={fetchData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Business;
