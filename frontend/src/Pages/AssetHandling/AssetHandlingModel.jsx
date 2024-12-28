import axios from "axios";
import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export const AssetHandlingModel = ({
  onClose,
  assetHandlingData,
  fetchData,
  assets,
  users,
}) => {
  const [formData, setFormData] = useState({
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
  useEffect(() => {
    if (assetHandlingData) {
      setFormData({
        _id: assetHandlingData._id || "",
        name: assetHandlingData.name || "",
        status: assetHandlingData.status || false,
      });
    }
  }, [assetHandlingData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = assetHandlingData?._id
      ? `${API_URL}/assets_handling`
      : `${API_URL}/assets_handling`;
    const method = assetHandlingData?._id ? "put" : "post";
    try {
      const response = await axios({
        method,
        url,
        data: formData,
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        onClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while saving the asset handling. Please try again."
      );
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-full max-w-lg p-6 bg-white rounded-t-lg mx-4 sm:mx-auto max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold text-center">
          {assetHandlingData._id ? "Edit" : "Add"} Asset Handling
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Owner Details Section */}
          <h3 className="mt-6 mb-2 text-lg font-semibold">
            Asset Handling Details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="hidden"
              name="_id"
              value={formData._id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <div>
              <label className="block mb-1">Select Asset</label>
              <select
                name="asset_id"
                value={formData.asset_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  -- Select a sub category --
                </option>
                {assets.map((asset) => (
                  <option key={asset._id} value={asset._id}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Status</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="form-checkbox"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
