import axios from "axios";
import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const DepartmentModel = ({ onClose, departmentData, fetchData }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    status: false,
    business_id: "",
  });

  useEffect(() => {
    if (departmentData) {
      setFormData({
        _id: departmentData._id || "",
        name: departmentData.name || "",
        status: departmentData.status || false,
        business_id: departmentData.business_id || "",
      });
    }
  }, [departmentData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = departmentData?._id
      ? `${API_URL}/department`
      : `${API_URL}/department`;
    const method = departmentData?._id ? "put" : "post";
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
      alert("An error occurred while saving the department. Please try again.");
    }
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-full max-w-lg p-6 bg-white rounded-t-lg mx-4 sm:mx-auto max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold text-center">
          {departmentData ? "Edit" : "Add"} Department
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Owner Details Section */}
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
              <label className="block mb-1">Department Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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

export default DepartmentModel;
