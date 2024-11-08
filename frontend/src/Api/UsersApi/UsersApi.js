import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const usersApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    console.log(response.data.users);
    const filteredUsers = response.data.users.filter(user => user.role === "business_user"); // Filter users by role
    console.log(filteredUsers);
    return filteredUsers;
  } catch (error) {
    throw error.response;
  }
};

export const createUserApi = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, formData, {withCredentials: true,});
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        throw new Error("Something went wrong");
      }
    }
  };
  
  export const getUserByIdApi = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        throw new Error("Something went wrong");
      }
    }
  };
  
  export const updateUserApi = async (formData) => {
    try {
      const response = await axios.put(`${API_URL}/users`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        throw new Error("Something went wrong");
      }
    }
  };