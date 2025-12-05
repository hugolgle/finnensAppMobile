import api from "@/api/api";

const API_URL_ = `http://192.168.0.102:8000/epargns`;

export const fetchAccounts = async () => {
  return await api.get(`${API_URL_}/accounts`);
};

export const fetchAccountById = async (id: any) => {
  return await api.get(`${API_URL_}/accounts/${id}`);
};

export const addAccount = async (accountData: any) => {
  return await api.post(`${API_URL_}/accounts`, accountData);
};

export const deleteAccountEpargn = async (id: any) => {
  return await api.delete(`${API_URL_}/${id}`);
};

export const transferAccount = async (transferData: any) => {
  const response = await api.post(`${API_URL_}/transfers`, transferData);
  return response.data;
};

export const interestAccount = async (interestData: any) => {
  const response = await api.post(`${API_URL_}/interest`, interestData);
  return response.data;
};

export const depositAccount = async (depositData: any) => {
  const response = await api.post(`${API_URL_}/deposit`, depositData);
  return response.data;
};

export const withdrawAccount = async (withdrawData: any) => {
  const response = await api.post(`${API_URL_}/withdraw`, withdrawData);
  return response.data;
};
