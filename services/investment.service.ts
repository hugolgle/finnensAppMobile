import api from "@/api/api";

const API_URL_ = `http://192.168.0.102:8000/investments`;

export const fetchInvestments = async () => {
  return await api.get(API_URL_);
};

export const fetchInvestmentById = async (id: any) => {
  return await api.get(`${API_URL_}/${id}`);
};

export const addInvestment = async (investmentData: any) => {
  const { name, symbol, isin, type, transaction } = investmentData;

  const newInvestment = {
    name,
    type,
    symbol,
    isin,
    transaction: {
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.action,
    },
  };

  return await api.post(`${API_URL_}`, newInvestment);
};

export const addTransactionInvestment = async (
  investmentId: any,
  transactionData: any
) => {
  const { amount, date, action, closed } = transactionData;
  const newTransaction = {
    amount,
    date,
    type: action,
    closed,
  };

  return await api.post(
    `${API_URL_}/${investmentId}/transaction`,
    newTransaction
  );
};

export const addDividend = async (investmentId: any, dividendData: any) => {
  const { amount, date } = dividendData;
  const newDividend = {
    amount,
    date,
  };

  return await api.post(`${API_URL_}/${investmentId}/dividend`, newDividend);
};

export const editDividend = async (editData: any, idInvestment: any) => {
  const { id, date, amount } = editData;

  const updatedDividend = {
    date,
    amount,
  };

  return await api.put(
    `${API_URL_}/${idInvestment}/dividend/${id}`,
    updatedDividend
  );
};

export const editInvestments = async (editData: any) => {
  const { id, name, symbol, isin, type } = editData;

  const updatedInvestment = {
    name,
    symbol,
    isin,
    type,
  };

  return await api.put(`${API_URL_}/${id}`, updatedInvestment);
};

export const editInvestmentsTransaction = async (
  editData: any,
  idInvestment: any
) => {
  const { id, date, amount, action } = editData;

  const updatedTransaction = {
    date,
    amount,
    type: action,
  };

  return await api.put(
    `${API_URL_}/${idInvestment}/transaction/${id}`,
    updatedTransaction
  );
};

export const deleteTransactionInvestment = async (id: any) => {
  return await api.delete(
    `${API_URL_}/${id.idInvest}/transaction/${id.itemId}`
  );
};

export const deleteDividend = async (id: any) => {
  return await api.delete(`${API_URL_}/${id.idInvest}/dividend/${id.itemId}`);
};
