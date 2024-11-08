import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DataTable from "react-data-table-component";
import {
  createUserApi,
  getUserByIdApi,
  updateUserApi,
  usersApi,
} from "../../Api/UsersApi/UsersApi";
import UserModel from "./UserModel";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // ID of business to edit

  const columns = [
    {
      name: "Profile",
      selector: (row) => row.profile.profilePic,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "User Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
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
            // onClick={() => handleDelete(row._id)}
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
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await usersApi();
        setUsers(response);
        console.log(response);
      } catch (error) {
        setError(error?.message || "Failed to fetch business data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleAddUsers = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };
  const handleEdit = async (row) => {
    setSelectedUserId(null);
    setSelectedUserId(row._id);
    setSelectedUser(null);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedUserId) {
        const response = await getUserByIdApi(selectedUserId);
        if (response.status === true) {
          const user_data = {
            _id: response.user._id,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.email,
            contact: response.user.contact,
            status: response.user.status,
            role: response.user.role,
          };
          setSelectedUser(user_data);
        } else {
          console.log(response.error || "Error fetching business details");
        }
      }
    };
    fetchUsers();
  }, [selectedUserId]);
  const handleSubmit = async (formData) => {
    try {
      let response = {};
      if (formData._id) {
        response = await updateUserApi(formData);
        if (response?.status === true) {
          console.log(response.message);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === formData._id ? { ...user, ...formData } : user
            )
          );
        } else if (response?.status === false) {
          console.log(response.message);
          console.log("Error:", response.errors);
        }
      } else {
        response = await createUserApi(formData);
        if (response?.status === true) {
          setUsers((prevUsers) => [...prevUsers, response.user]);

          console.log(response.message);

          // window.location.reload();
        } else if (response?.status === false) {
          console.log(response.message);
          console.log("Error:", response.errors);
        }
      }
    } catch (error) {}
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-grow mt-2">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className="flex-grow w-full p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddUsers}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Add Users
            </button>
          </div>
          <div className="p-4 bg-white rounded">
            <DataTable
              title="Users List"
              data={users}
              columns={columns}
              pagination
              highlightOnHover
              pointerOnHover
            />
          </div>
        </main>
      </div>
      {/* This is model */}
      <UserModel
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedUser(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
        userData={selectedUser}
      />
    </div>
  );
};

export default Users;
