import { fetchTransactions } from "@/services/financialTransaction.service";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["fetchTransactions"],
    queryFn: async () => {
      const response = await fetchTransactions(null, null, null);
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
