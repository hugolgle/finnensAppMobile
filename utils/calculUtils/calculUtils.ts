import { format } from "date-fns";

export function totalByMonth(data, type, monthDate, field = "amount") {
  if (!Array.isArray(data)) return 0;

  if (typeof monthDate === "string") {
    const year = Number(monthDate.slice(0, 4));
    const month = Number(monthDate.slice(4)) - 1;
    monthDate = new Date(year, month);
  }

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth() + 1;

  const filteredOperations = data.filter((transaction) => {
    const transactionDate =
      transaction.date instanceof Date
        ? transaction.date
        : new Date(transaction.date);

    const transactionYear = transactionDate.getFullYear();
    const transactionMonth = transactionDate.getMonth() + 1;

    return (
      transaction.type === type &&
      transactionYear === year &&
      transactionMonth === month
    );
  });
  return filteredOperations.reduce(
    (total, transaction) => total + transaction[field],
    0.0
  );
}

export function totalByYear(data, type, year, filterCategory, filterTitle) {
  if (!Array.isArray(data)) {
    return [];
  }

  const filteredOperations = data?.filter((transaction) => {
    const transactionYear = format(transaction.date, "yyyy");
    return transaction.type === type && transactionYear === `${year}`;
  });

  const filteredOperationsByCategory =
    filterCategory && filterCategory.length > 0
      ? filteredOperations.filter((transaction) =>
          filterCategory.includes(transaction.category)
        )
      : filteredOperations;

  const filteredOperationsByTitle =
    filterTitle && filterTitle.length > 0
      ? filteredOperationsByCategory.filter((transaction) =>
          filterTitle.includes(transaction.title)
        )
      : filteredOperationsByCategory;

  const totalAmount = filteredOperationsByTitle.reduce(
    (total, transaction) => total + transaction.amount,
    0.0
  );

  return totalAmount;
}

export function calculTotalAmount(data, field = "amount") {
  let total = 0;

  data?.forEach((transaction) => {
    total += transaction[field];
  });
  return total;
}
