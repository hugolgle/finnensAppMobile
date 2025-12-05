import { fetchTransactions } from "@/services/financialTransaction.service";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

interface Callbacks {
  onErrorCallback?: (message: string) => void;
}

function useFinancialTransactionQuery(
  type?: string,
  monthKey?: string,
  yearKey?: string,
  callbacks?: Callbacks
) {
  const { onErrorCallback } = callbacks || {};

  const {
    data: dataTransactionsFinancial,
    isLoading: isLoadingTransactionsFinancial,
    isFetching: isFetchingTransactionsFinancial,
    refetch: refetchTransactionsFinancial,
  } = useQuery({
    queryKey: ["fetchTransactions", type, monthKey, yearKey],
    queryFn: async () => {
      const response: any = await fetchTransactions(type, monthKey, yearKey);
      if (response?.status !== HttpStatusCode.Ok) {
        onErrorCallback?.(
          response?.response?.data?.message ||
            "Erreur lors du chargement des transactions"
        );
      }
      return response?.data || [];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    dataTransactionsFinancial,
    isLoadingTransactionsFinancial,
    isFetchingTransactionsFinancial,
    refetchTransactionsFinancial,
  };
}

export default useFinancialTransactionQuery;
