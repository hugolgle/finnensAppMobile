import api from "@/api/api";

const API_URL_ = `http://192.168.0.102:8000/credits`;

export const fetchCredits = async () => {
  return await api.get(API_URL_);
};

export const addCredit = async (creditData: any) => {
  return await api.post(`${API_URL_}`, creditData);
};

export const editCredit = async (creditData: any) => {
  try {
    const response = await api.put(`${API_URL_}/${creditData.id}`, creditData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCredit = async (id: any) => {
  return await api.delete(`${API_URL_}/${id}`);
};

export const addPayment = async (id: any, paymentData: any) => {
  return await api.post(`${API_URL_}/${id}/payment`, paymentData);
};

export const updateStatus = async (id: any, status: any) => {
  return await api.patch(`${API_URL_}/${id}`, { status });
};

export const deletePayment = async (creditId: any, paymentId: any) => {
  return await api.delete(`${API_URL_}/${creditId}/payment/${paymentId}`);
};
