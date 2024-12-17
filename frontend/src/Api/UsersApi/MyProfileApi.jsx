import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const myProfileApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
