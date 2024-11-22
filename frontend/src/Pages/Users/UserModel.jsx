import React, { useState, useEffect } from "react";

const UserModel = ({ isOpen, onClose, onSubmit, userData = {} }) => {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    status: false,
    role: "user",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        _id: userData._id || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        contact: userData.contact || "",
        status: userData.status || false,
        role: userData.role || "user",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="w-full max-w-lg p-6 bg-white rounded-t-lg mx-4 sm:mx-auto max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold text-center">
          {userData ? "Edit" : "Add"} User
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Owner Details Section */}
          <h3 className="mt-6 mb-2 text-lg font-semibold">User Details</h3>
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
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Contact</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
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
            <div>
              <input
                type="hidden"
                name="role"
                value="user"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
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

export default UserModel;