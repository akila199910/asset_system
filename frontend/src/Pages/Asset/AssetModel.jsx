import axios from "axios";
import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const AssetModel = ({
  onClose,
  assetData,
  fetchData,
  assetCategories,
  assetSubCategories,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    status: false,
    business_id: "",
    asset_category_id: "",
    asset_sub_category_id: "",
    asset_no: "",
    serial_no: "",
    purchased_date: "",
    warranty: "",
    description: "",
  });

  useEffect(() => {
    if (assetData) {
      setFormData({
        _id: assetData._id || "",
        name: assetData.name || "",
        status: assetData.status || false,
        business_id: assetData.business_id || "",
        asset_category_id: assetData.asset_category_id || "",
        asset_sub_category_id: assetData.asset_sub_category_id || "",
        asset_no: assetData.asset_no || "",
        serial_no: assetData.serial_no || "",
        purchased_date: assetData.purchased_date || "",
        warranty: assetData.warranty || false,
        description: assetData.description || "",
      });
    }
  }, [assetData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = assetData?._id ? `${API_URL}/assets` : `${API_URL}/assets`;
    const method = assetData?._id ? "put" : "post";
    try {
      // alert("submit form")
      const response = await axios({
        method,
        url,
        data: formData,
        withCredentials: true,
      });
      // console.log(response);

      if (response.status === 200 || response.status === 201) {
        onClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the Asset. Please try again.");
    }
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-full max-w-lg p-6 bg-white rounded-t-lg mx-4 sm:mx-auto max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold text-center">
          {assetData._id ? "Edit" : "Add"} Asset
        </h2>
        <form onSubmit={handleSubmit}>
          <h3 className="mt-6 mb-2 text-lg font-semibold">Asset Details</h3>
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
              <label className="block mb-1"> Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Select Category</label>
              <select
                name="asset_category_id"
                value={formData.asset_category_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  -- Select a category --
                </option>
                {assetCategories.map((assetCategory) => (
                  <option key={assetCategory._id} value={assetCategory._id}>
                    {assetCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Select Sub Category</label>
              <select
                name="asset_sub_category_id"
                value={formData.asset_sub_category_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  -- Select a sub category --
                </option>
                {assetSubCategories.map((assetSubCategory) => (
                  <option
                    key={assetSubCategory._id}
                    value={assetSubCategory._id}
                  >
                    {assetSubCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1"> Asset No</label>
              <input
                type="text"
                name="asset_no"
                value={formData.asset_no}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1"> Serial No</label>
              <input
                type="text"
                name="serial_no"
                value={formData.serial_no}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1"> Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1"> Warranty</label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1"> Purchased Date</label>
              <input
                type="date"
                name="purchased_date"
                value={formData.purchased_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
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

export default AssetModel;
