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
import Layout from "../../Components/Layout/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

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
            onClick={() => row}
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

  return (
    <Layout>
      <h1 className="text-2xl font-bold">User</h1>
      <p>Welcome to the User table!</p>
    </Layout>
  );
};

export default Users;
