import {
  fetchInvestmentById,
  fetchInvestments,
} from "@/services/investment.service";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

interface Callbacks {
  onErrorCallback?: (message: string) => void;
}

function useInvestmentQuery(investmentId?: string, callbacks?: Callbacks) {
  const { onErrorCallback } = callbacks || {};

  const {
    data: dataInvestments,
    isLoading: isLoadingInvestments,
    isFetching: isFetchingInvestments,
    refetch: refetchInvestments,
  } = useQuery({
    queryKey: ["fetchInvestments"],
    queryFn: async () => {
      const res: any = await fetchInvestments();
      if (res?.status !== HttpStatusCode.Ok) {
        onErrorCallback?.(
          res?.response?.data?.message ||
            "Erreur lors du chargement des investissements"
        );
      }
      return res?.data || [];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: dataInvestmentById,
    isLoading: isLoadingInvestmentById,
    isFetching: isFetchingInvestmentById,
    refetch: refetchInvestmentById,
  } = useQuery({
    queryKey: ["fetchInvestmentById", investmentId],
    queryFn: async () => {
      const response: any = await fetchInvestmentById(investmentId);
      if (response?.status !== HttpStatusCode.Ok) {
        onErrorCallback?.(
          response?.response?.data?.message ||
            "Erreur lors du chargement de l'investissement"
        );
      }
      return response?.data;
    },
    enabled: !!investmentId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    dataInvestments,
    isLoadingInvestments,
    isFetchingInvestments,
    refetchInvestments,
    dataInvestmentById,
    isLoadingInvestmentById,
    isFetchingInvestmentById,
    refetchInvestmentById,
  };
}

export default useInvestmentQuery;
