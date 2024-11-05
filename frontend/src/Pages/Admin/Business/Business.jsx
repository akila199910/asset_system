import React, { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import useBusiness from "../../../Hooks/BusinessHook/BusinessHook";
import DataTable from "react-data-table-component";
import BusinessModal from "./BusinessModel";
import {
  createBusinessApi,
  getBusinessByIdApi,
} from "../../../Api/BusinessApi/BusinessApi";

const Business = () => {
  const { business, loading, error } = useBusiness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const columns = [
    {
      name: "Business Name",
      selector: (row) => row.businessName,
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
    
    // const response = await getBusinessByIdApi(row._id);
    // console.log(response);
    setSelectedBusiness();
    setIsModalOpen(true);

    // console.log("Edit Business:", row);
  };
  const handleSubmit = async (formData) => {
    try {
      const response = await createBusinessApi(formData);

      if (response?.status === true) {
        window.location.reload();
      } else if (response?.status === false) {
        console.log(response.message);
        console.log("Error:", response.errors);
      }
    } catch (error) {}
  };

  const handleDelete = (id) => {
    console.log("Delete Business ID:", id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      <div className="flex mt-2 ">
        <main className="flex-grow w-full p-4">
          <div className="mb-4">
            <button
              onClick={handleAddBusiness}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Add Business
            </button>
          </div>

          <DataTable
            title="Business List"
            columns={columns}
            data={business || []}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </main>
      </div>
      <BusinessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        businessData={selectedBusiness}
      />
    </div>
  );
};

export default Business;
