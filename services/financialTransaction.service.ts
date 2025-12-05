import api from "../api/api";

const API_URL_ = `http://192.168.0.102:8000/transactions`;

export const fetchTransactions = async (type: any, month: any, year: any) => {
  const params: any = {};
  if (month && month !== "all") params.month = month;
  if (year && year !== "all") params.year = year;
  if (type) params.type = type;

  return await api.get(API_URL_, { params });
};

export const addTransaction = async (transactionData: any) => {
  const { title, category, date, detail, amount, type, tag, creditId } =
    transactionData;

  const newTransaction = {
    title,
    category,
    date,
    detail,
    amount,
    type,
    tag: tag || [],
    creditId,
  };

  return await api.post(`${API_URL_}`, newTransaction);
};
