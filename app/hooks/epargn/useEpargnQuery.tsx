import { fetchAccountById, fetchAccounts } from "@/services/epargn.service";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

interface Callbacks {
  onErrorCallback?: (message: string) => void;
}

function useEpargnQuery(accountId?: string, callbacks?: Callbacks) {
  const { onErrorCallback } = callbacks || {};

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isFetching: isFetchingAccounts,
    refetch: refetchAccounts,
  } = useQuery({
    queryKey: ["fetchAccounts"],
    queryFn: async () => {
      const response: any = await fetchAccounts();
      if (response?.status !== HttpStatusCode.Ok) {
        onErrorCallback?.(
          response?.response?.data?.message ||
            "Erreur lors du chargement des comptes"
        );
      }
      return response?.data || [];
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: accountById,
    isLoading: isLoadingAccountById,
    isFetching: isFetchingAccountById,
    refetch: refetchAccountById,
  } = useQuery({
    queryKey: ["fetchAccountById", accountId],
    queryFn: async () => {
      const response: any = await fetchAccountById(accountId!);
      if (response?.status !== HttpStatusCode.Ok) {
        onErrorCallback?.(
          response?.response?.data?.message ||
            "Erreur lors du chargement du compte"
        );
      }
      return response?.data;
    },
    enabled: !!accountId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    accounts,
    isLoadingAccounts,
    isFetchingAccounts,
    refetchAccounts,
    accountById,
    isLoadingAccountById,
    isFetchingAccountById,
    refetchAccountById,
  };
}

export default useEpargnQuery;
