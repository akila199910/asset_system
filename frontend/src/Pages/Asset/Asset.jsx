import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Layout from "../../Components/Layout/Layout";
import AssetModel from "./AssetModel";
const API_URL = process.env.REACT_APP_API_URL;

const Asset = () => {
  const [data, setData] = useState([]);
  const [assetCategories, setAssetCategories] = useState([]);
  const [assetSubCategories, setAssetSubCategories] = useState([]);
  const [assetModel, setAssetModel] = useState(false);
  const [editAsset, setEditAsset] = useState({
    _id: "",
    name: "",
    status: false,
    business_id: "",
    asset_category_id: "",
    asset_sub_category_id: "",
    asset_no: "",
    serial_no: "",
    purchased_date: "",
    warranty: "true",
    description: "",
  });

  const columns = [
    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Asset Category Name",
      selector: (row) => row.asset_category_id.name,
      sortable: false,
    },
    {
      name: "Asset Sub Category Name",
      selector: (row) => row.asset_sub_category_id.name,
      sortable: false,
    },
    {
      name: "Asset No",
      selector: (row) => row.asset_no,
      sortable: false,
    },
    {
      name: "Purchased Date",
      selector: (row) => row.purchased_date,
      sortable: false,
    },
    {
      name: "Serial No",
      selector: (row) => row.serial_no,
      sortable: false,
    },
    {
      name: "Warranty",
      selector: (row) => row.warranty,
      sortable: false,
    },
    {
      name: " Description",
      selector: (row) => row.description,
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
      const response = await axios.get(`${API_URL}/assets`, {
        withCredentials: true,
      });
      setData(response.data.asset || []);
      setAssetCategories(response.data.assetCategories || []);
      setAssetSubCategories(response.data.assetSubCategories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addAsset = () => {
    setEditAsset({});
    setAssetModel(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (row) => {
    try {
      const response = await axios.get(`${API_URL}/assets/${row._id}`, {
        withCredentials: true,
      });
      const assetData = response.data.asset;
      setEditAsset({
        _id: assetData._id,
        name: assetData.name,
        status: assetData.status,
        business_id: assetData.business_id,
        asset_category_id: assetData.asset_category_id,
        asset_sub_category_id: assetData.asset_sub_category_id,
        asset_no: assetData.asset_no,
        serial_no: assetData.serial_no,
        purchased_date: assetData.purchased_date,
        warranty: assetData.warranty,
        description: assetData.description,
      });

      setAssetModel(true);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  return (
    <Layout>
      <div className="relative bg-white rounded-md shadow-md">
        {/* Header section with fixed background */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
          <h2 className="p-4 text-lg font-bold text-gray-800">Assets</h2>
          <button
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
            onClick={addAsset}
          >
            Add Asset
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
        {assetModel && (
          <AssetModel
            onClose={() => setAssetModel(false)}
            assetData={editAsset}
            fetchData={fetchData}
            assetCategories={assetCategories}
            assetSubCategories={assetSubCategories}
          />
        )}
      </div>
    </Layout>
  );
};

export default Asset;
