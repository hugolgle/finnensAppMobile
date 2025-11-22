import api from "../api/api";

const API_URL_ = `http://192.168.0.100:8000/user`;

export const loginUser = async (credentials: any) => {
  try {
    const response = await api.post(`${API_URL_}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  return await api.post(`${API_URL_}/logout`, {});
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`${API_URL_}/current`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
