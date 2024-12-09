import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Layout from "../../Components/Layout/Layout";
import EmployeeModel from "./EmployeeModel";
const API_URL = process.env.REACT_APP_API_URL;

const Employee = () => {
  const [data, setData] = useState([]);
  const [employeeModel, setEmployeeModel] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    _id: "",
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    status: false,
    role: "guest",
    business_id: "",
  });

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
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
      const response = await axios.get(`${API_URL}/employee`, {
        withCredentials: true,
      });
      setData(
        response.data.employees.filter(
          (employee) => employee.role === "guest"
        ) || []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addEmployee = () => {
    setEditEmployee({});
    setEmployeeModel(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (row) => {
    try {
      const response = await axios.get(`${API_URL}/employee/${row._id}`, {
        withCredentials: true,
      });
      const employeeData = response.data.employee;
      setEditEmployee({
        _id: employeeData._id,
        profilePic: employeeData.profilePic,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        contact: employeeData.contact,
        role: employeeData.role,
        business_id: employeeData.business_id,
      });

      setEmployeeModel(true);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return (
    <Layout>
      <div className="relative bg-white rounded-md shadow-md">
        {/* Header section with fixed background */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white">
          <h2 className="p-4 text-lg font-bold text-gray-800">Employees</h2>
          <button
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded"
            onClick={addEmployee}
          >
            Add Employee
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
        {employeeModel && (
          <EmployeeModel
            onClose={() => setEmployeeModel(false)}
            employeeData={editEmployee}
            fetchData={fetchData}
          />
        )}
      </div>
    </Layout>
  );
};

export default Employee;
