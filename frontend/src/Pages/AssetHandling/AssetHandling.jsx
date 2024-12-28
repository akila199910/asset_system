import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import DataTable from "react-data-table-component";
import { AssetHandlingModel } from "./AssetHandlingModel";
const API_URL = process.env.REACT_APP_API_URL;

const AssetHandling = () => {
  const [data, setData] = useState([]);
  const [assetHandlingModel, setAssetHandlingModel] = useState(false);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [editAssetHandling, setEditAssetHandling] = useState({
    _id: "",
    asset_id: "",
    user_id: "",
    created_by: "",
    given_date: "",
    given_by: "",
    handover_date: "",
    handover_to: "",
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
      const response = await axios.get(`${API_URL}/asset_handling`, {
        withCredentials: true,
      });
      setData(response.data.assetHandling || []);
      setAssets(response.data.activeAssets || []);
      setUsers(response.data.users || []);
      console.log(assets);
      console.log(users);
      console.log(data);

      // console.log(assets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addHandling = () => {
    setEditAssetHandling({});
    setAssetHandlingModel(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (row) => {
    try {
      const response = await axios.get(`${API_URL}/asset_handling/${row._id}`, {
        withCredentials: true,
      });
      const assetHandlingData = response.data.assetHandling;
      setEditAssetHandling({
        _id: assetHandlingData._id,
        asset_id: assetHandlingData.asset_id,
        user_id: assetHandlingData.user_id,
        created_by: assetHandlingData.created_by,
        given_date: assetHandlingData.given_date,
        given_by: assetHandlingData.given_by,
        handover_date: assetHandlingData.handover_date,
        handover_to: assetHandlingData.handover_to,
        status: false,
        business_id: assetHandlingData.business_id,
      });

      setAssetHandlingModel(true);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  return (
    <Layout>
      <div className="relative bg-white rounded-md shadow-md">
        {/* Header section with fixed background */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
          <h2 className="p-4 text-lg font-bold text-gray-800">
            Asset Handling
          </h2>
          <button
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
            onClick={addHandling}
          >
            Add Asset Handling
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
        {assetHandlingModel && (
          <AssetHandlingModel
            onClose={() => setAssetHandlingModel(false)}
            assetHandlingData={editAssetHandling}
            fetchData={fetchData}
            assets={assets}
            users={users}
          />
        )}
      </div>
    </Layout>
  );
};

export default AssetHandling;
