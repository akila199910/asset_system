import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Layout from "../../Components/Layout/Layout";
import AssetCategoryModel from "./AssetCategoryModel";
const API_URL = process.env.REACT_APP_API_URL;

const AssetCategory = () => {
  const [data, setData] = useState([]);
  const [assetCategoryModel, setAssetCategoryModel] = useState(false);
  const [editAssetCategory, setEditAssetCategory] = useState({
    _id: "",
    name: "",
    status: false,
    business_id: "",
  });

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Status",
      selector: (row) => <div>{row.status ? "Active" : "Inactive"}</div>,
      sortable: false,
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
            onClick={() => alert(`Deleting ${row.name}`)}
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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/assets_category`, {
        withCredentials: true,
      });
      setData(response.data.assetCategory || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addDepartment = () => {
    setEditAssetCategory({});
    setAssetCategoryModel(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (row) => {
    try {
      const response = await axios.get(
        `${API_URL}/assets_category/${row._id}`,
        {
          withCredentials: true,
        }
      );
      const assetCategoryData = response.data.assetCategory;
      setEditAssetCategory({
        _id: assetCategoryData._id,
        name: assetCategoryData.name,
        status: assetCategoryData.status,
        business_id: assetCategoryData.business_id,
      });

      setAssetCategoryModel(true);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  return (
    <Layout>
      <div className="relative bg-white rounded-md shadow-md">
        {/* Header section with fixed background */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
          <h2 className="p-4 text-lg font-bold text-gray-800">Asset Category</h2>
          <button
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
            onClick={addDepartment}
          >
            Add Asset Category
          </button>
        </div>

        <div className="p-4 overflow-auto bg-gray-50">
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        </div>
        {assetCategoryModel && (
          <AssetCategoryModel
            onClose={() => setAssetCategoryModel(false)}
            assetCategoryData={editAssetCategory}
            fetchData={fetchData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AssetCategory;
