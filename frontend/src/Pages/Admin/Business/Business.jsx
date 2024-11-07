import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import useBusiness from "../../../Hooks/BusinessHook/BusinessHook";
import DataTable from "react-data-table-component";
import BusinessModal from "./BusinessModel";
import {
  createBusinessApi,
  getBusinessByIdApi,
  moveToDashboardApi,
  updateBusinessApi,
} from "../../../Api/BusinessApi/BusinessApi";

const Business = () => {
  const { business, loading, error } = useBusiness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null); // ID of business to edit

  const columns = [
    {
      name: "Business Name",
      cell: (row) => (
        <div
          className="flex space-x-2 font-bold"
          onClick={() => moveToDashboard(row._id)}
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

  const handleAddBusiness = () => {
    setSelectedBusiness(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (row) => {
    setSelectedBusinessId(null);
    setSelectedBusinessId(row._id);
    setSelectedBusiness();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      if (selectedBusinessId) {
        const response = await getBusinessByIdApi(selectedBusinessId);
        if (response.status === true) {
          const { business, user } = response;

          const combinedData = {
            _id: business._id,
            businessName: business.businessName,
            businessEmail: business.businessEmail,
            address: business.address,
            city: business.city,
            businessStatus: business.status,
            ownerId: business.ownerId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contact: user.contact,
            ownerStatus: user.status,
            role: user.role,
          };

          setSelectedBusiness(combinedData);
        } else {
          console.log(response.error || "Error fetching business details");
        }
      }
    };
    fetchBusiness();
  }, [selectedBusinessId]);

  const handleSubmit = async (formData) => {
    try {
      let response = {};
      if (formData._id) {
        response = await updateBusinessApi(formData);
        if (response?.status === true) {
          window.location.reload();
        } else if (response?.status === false) {
          console.log(response.message);
          console.log("Error:", response.errors);
        }
      } else {
        response = await createBusinessApi(formData);
        if (response?.status === true) {
          window.location.reload();
        } else if (response?.status === false) {
          console.log(response.message);
          console.log("Error:", response.errors);
        }
      }
    } catch (error) {}
  };

  const moveToDashboard = async (id) => {
    try {
      const response = await moveToDashboardApi(id);
      if (response?.status === true) {
        window.location.href = `/dashboard`;
      } else if (response?.status === false) {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    console.log("Delete Business ID:", id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      <div className="flex m-6 ">
        <main className="flex-grow w-full p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddBusiness}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Add Business
            </button>
          </div>
          <div className="p-4 bg-white rounded">
            <DataTable
              title="Business List"
              columns={columns}
              data={business || []}
              pagination
              highlightOnHover
              pointerOnHover
            />
          </div>
        </main>
      </div>
      <BusinessModal
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedBusiness(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
        businessData={selectedBusiness}
      />
    </div>
  );
};

export default Business;
