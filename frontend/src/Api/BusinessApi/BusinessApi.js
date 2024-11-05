import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const businessApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/business`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createBusinessApi = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/business`, formData, {
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

export const getBusinessByIdApi = async (businessId) => {
  try {
    
    const response = await axios.get(`${API_URL}/business/${businessId}`, {
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
