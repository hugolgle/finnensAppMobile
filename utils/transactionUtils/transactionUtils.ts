import { subMonths, startOfMonth } from "date-fns";

// -------------------------------- Transactions

export function getLastMonthsFromDate(
  date: Date,
  nbMonths: number,
  locale = "fr"
) {
  return Array.from({ length: nbMonths }, (_, i) => {
    const d = new Date(
      date.getFullYear(),
      date.getMonth() - (nbMonths - 1 - i),
      1
    );
    const monthLabel = d.toLocaleString(locale, { month: "short" });
    return { date: d, month: { label: monthLabel }, year: d.getFullYear() };
  });
}

export function getNextMonthsFromDate(
  date: Date,
  nbMonths: number,
  locale = "fr"
) {
  return Array.from({ length: nbMonths }, (_, i) => {
    const d = new Date(date.getFullYear(), date.getMonth() + i, 1);
    const monthLabel = d.toLocaleString(locale, { month: "short" });

    return {
      date: d,
      month: { label: monthLabel },
      year: d.getFullYear(),
    };
  });
}

export function getTransactionsByType(data, type) {
  if (!Array.isArray(data)) {
    return [];
  }

  const filteredTransactions = type
    ? data?.filter((transaction) => transaction.type === type)
    : data;

  return filteredTransactions.sort((a, b) => {
    const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateSort !== 0) return dateSort;
  });
}

// -------------------------------- Titles

export function getTitleOfTransactionsByType(data, type) {
  if (!Array.isArray(data)) {
    return [];
  }
  const currentDate = new Date();
  const startDate = startOfMonth(subMonths(currentDate, 2));

  const filteredTransactions = data?.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transaction.type === type && transactionDate >= startDate;
  });

  const uniqueTitles = Array.from(
    new Set(filteredTransactions.map((transaction) => transaction.title))
  );

  return uniqueTitles.sort((a, b) => a.localeCompare(b));
}

// -------------------------------- Tags

export function getTagsOfTransactions(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  const tags = data.flatMap((transaction) => transaction.tag);

  const uniqueTags = Array.from(new Set(tags));

  return uniqueTags;
}

// -------------------------------- Chart

export function aggregateTransactions(transactions, categoryColorsExpense) {
  const amountTotal = transactions.reduce(
    (sum, transaction) => sum + Math.abs(transaction.amount),
    0
  );

  const amountByCategory = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = Math.abs(transaction.amount);
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  return Object.entries(amountByCategory).map(([category, amount]) => {
    const amt = amount as number;
    return {
      name: category,
      amount: amt,
      percentage: amountTotal ? (amt / amountTotal) * 100 : 0,
      fill: categoryColorsExpense[category] ?? "#8884d8",
    };
  });
}
