import { currentDate } from "@/utils/otherUtils/other";
import { useMemo } from "react";

import { TYPES } from "@/constants/StaticData";
import { Epargn } from "@/interfaces/epargn.interface";
import { Investment } from "@/interfaces/investment.interface";
import { FinancialTransaction } from "@/interfaces/transaction.interface";
import {
  calculTotalAmount,
  totalByMonth,
} from "@/utils/calculUtils/calculUtils";

interface UseDataCalculationsProps {
  dataTransactionsFinancial?: FinancialTransaction[];
  dataInvestments?: Investment[];
  dataAccounts?: Epargn[];
}

interface UseDataCalculationsReturn {
  dataTransacsInvest: any;
  amountIncomesMonth: number;
  amountExpensesMonth: number;
  amountResult: number;
  amountBuy: number;
  amountInvest: number;
  previousDate: string;
  amountIncomesLastMonth: number;
  amountExpensesLastMonth: number;
  amountEpargn: number;
  percentInvest: number;
  percentEpargn: number;
  amountHeritage: number;
}

export const useDataCalculations = ({
  dataTransactionsFinancial,
  dataInvestments,
  dataAccounts,
}: UseDataCalculationsProps): UseDataCalculationsReturn => {
  const { month: currentMonth, year: currentYear } = currentDate();
  const monthNumber = parseInt(currentMonth, 10);
  const currentMonthYear = `${currentYear}${currentMonth}`;

  const dataTransacsInvest = useMemo(
    () =>
      dataInvestments?.flatMap(
        (inv) =>
          inv.cycles?.flatMap((cycle) =>
            cycle.transactions.map((trans) => ({
              _id: trans._id,
              title: inv.name,
              amount: Math.abs(trans.amount),
              date: trans.date ? new Date(trans.date) : null,
            }))
          ) || []
      ) || [],
    [dataInvestments]
  );

  const amountIncomesMonth = useMemo(
    () =>
      totalByMonth(dataTransactionsFinancial, TYPES.INCOME, currentMonthYear),
    [dataTransactionsFinancial, currentMonthYear]
  );

  const amountExpensesMonth = useMemo(
    () =>
      totalByMonth(dataTransactionsFinancial, TYPES.EXPENSE, currentMonthYear),
    [dataTransactionsFinancial, currentMonthYear]
  );

  const amountResult = useMemo(() => {
    if (!Array.isArray(dataInvestments)) return 0;
    return dataInvestments
      .filter(
        (item) =>
          Array.isArray(item.cycles) &&
          item.cycles.some((c) =>
            c.transactions?.some((t) => t.type === "sell")
          )
      )
      .reduce((total, item) => {
        const sale =
          item.cycles?.reduce((sum, c) => sum + (c.amountSale || 0), 0) || 0;
        const buy =
          item.cycles?.reduce((sum, c) => sum + (c.amountBuy || 0), 0) || 0;
        return total + (sale + buy);
      }, 0);
  }, [dataInvestments]);

  const amountBuy = useMemo(() => {
    if (!Array.isArray(dataInvestments)) return 0;
    return dataInvestments.reduce((total, item) => {
      const sale =
        item.cycles?.reduce((sum, c) => sum + (c.amountSale || 0), 0) || 0;
      const buy =
        item.cycles?.reduce((sum, c) => sum + (c.amountBuy || 0), 0) || 0;
      return total + (sale + buy);
    }, 0);
  }, [dataInvestments]);

  const amountInvest = useMemo(
    () => amountBuy - amountResult,
    [amountBuy, amountResult]
  );

  const { previousMonth, previousYear } = useMemo(() => {
    let m = monthNumber - 1,
      y = currentYear;
    if (m === 0) {
      m = 12;
      y--;
    }
    return { previousMonth: String(m).padStart(2, "0"), previousYear: y };
  }, [currentMonth, currentYear]);

  const previousDate = `${previousYear}${previousMonth}`;

  const amountIncomesLastMonth = useMemo(
    () => totalByMonth(dataTransactionsFinancial, TYPES.INCOME, previousDate),
    [dataTransactionsFinancial, previousDate]
  );

  const amountExpensesLastMonth = useMemo(
    () => totalByMonth(dataTransactionsFinancial, TYPES.EXPENSE, previousDate),
    [dataTransactionsFinancial, previousDate]
  );

  const amountEpargn = useMemo(
    () => calculTotalAmount(dataAccounts, "balance"),
    [dataAccounts]
  );

  const percentInvest = useMemo(
    () =>
      (Math.abs(amountInvest) * 100) /
      (Math.abs(amountInvest) + amountEpargn || 1),
    [amountInvest, amountEpargn]
  );

  const percentEpargn = useMemo(
    () => (amountEpargn * 100) / (Math.abs(amountInvest) + amountEpargn || 1),
    [amountInvest, amountEpargn]
  );

  const amountHeritage = useMemo(
    () => amountEpargn + Math.abs(amountInvest),
    [amountEpargn, amountInvest]
  );

  return {
    dataTransacsInvest,
    amountIncomesMonth,
    amountExpensesMonth,
    amountResult,
    amountBuy,
    amountInvest,
    previousDate,
    amountIncomesLastMonth,
    amountExpensesLastMonth,
    amountEpargn,
    percentInvest,
    percentEpargn,
    amountHeritage,
  };
};
