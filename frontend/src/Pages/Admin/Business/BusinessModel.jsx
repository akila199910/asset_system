import React, { useState, useEffect } from "react";

const BusinessModal = ({ isOpen, onClose, onSubmit, businessData = {} }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    address: "",
    ownerId: "",
    city: "",
    status: false,
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    owner_status: false,
    role: "business_user",	
  });

  useEffect(() => {
    if (businessData) {
      setFormData({
        businessName: businessData.businessName || "",
        businessEmail: businessData.businessEmail || "",
        address: businessData.address || "",
        ownerId: businessData.ownerId || "",
        city: businessData.city || "",
        status: businessData.status || false,
        profilePic: businessData.profilePic || "",
        firstName: businessData.firstName || "",
        lastName: businessData.lastName || "",
        email: businessData.email || "",
        contact: businessData.contact || "",
        owner_status: businessData.owner_status || false,
        role: businessData.role || "business_user",
      });
    }
  }, [businessData]);

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
          {businessData ? "Edit" : "Add"} Business
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Business Details Section */}
          <h3 className="mb-2 text-lg font-semibold">Business Details</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
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

          {/* Owner Details Section */}
          <h3 className="mt-6 mb-2 text-lg font-semibold">Owner Details</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-1">Profile Picture URL</label>
              <input
                type="text"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Status</label>
              <input
                type="checkbox"
                name="owner_status"
                checked={formData.owner_status}
                onChange={handleChange}
                className="form-checkbox"
              />
            </div>
            <div>
              
              <input
                type="hidden"
                name="role"
                value="business_user"
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

export default BusinessModal;
