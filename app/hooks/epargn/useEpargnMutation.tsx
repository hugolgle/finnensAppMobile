import {
  addAccount,
  transferAccount,
  deleteAccountEpargn,
  interestAccount,
  withdrawAccount,
  depositAccount,
} from "@/services/epargn.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Callbacks {
  onSuccessCallback?: (message: string) => void;
  onErrorCallback?: (message: string) => void;
}

function useEpargnMutation(callbacks?: Callbacks) {
  const queryClient = useQueryClient();
  const { onSuccessCallback, onErrorCallback } = callbacks || {};

  const createMutation = useMutation({
    mutationFn: async (postData: any) => addAccount(postData),
    onSuccess: (response: any) => {
      onSuccessCallback?.(
        response?.data?.message || "Compte ajouté avec succès"
      );
      queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors de l'ajout"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (itemId: string) => deleteAccountEpargn(itemId),
    onSuccess: (response: any) => {
      onSuccessCallback?.(response?.data?.message || "Compte supprimé");
      queryClient.invalidateQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors de la suppression"
      );
    },
  });

  const createTransferMutation = useMutation({
    mutationFn: async (postdata: any) => transferAccount(postdata),
    onSuccess: (response: any) => {
      onSuccessCallback?.(response?.message || "Transfert effectué");
      queryClient.refetchQueries({ queryKey: ["fetchAccountById"] });
      queryClient.refetchQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors du transfert"
      );
    },
  });

  const createWithdrawMutation = useMutation({
    mutationFn: async (postdata: any) => withdrawAccount(postdata),
    onSuccess: (response: any) => {
      onSuccessCallback?.(response?.message || "Retrait effectué");
      queryClient.refetchQueries({ queryKey: ["fetchAccountById"] });
      queryClient.refetchQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors du retrait"
      );
    },
  });

  const createInterestMutation = useMutation({
    mutationFn: async (postdata: any) => interestAccount(postdata),
    onSuccess: (response: any) => {
      onSuccessCallback?.(response?.message || "Intérêt appliqué");
      queryClient.refetchQueries({ queryKey: ["fetchAccountById"] });
      queryClient.refetchQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors du calcul des intérêts"
      );
    },
  });

  const createDepositMutation = useMutation({
    mutationFn: async (postdata: any) => depositAccount(postdata),
    onSuccess: (response: any) => {
      onSuccessCallback?.(response?.message || "Dépôt effectué");
      queryClient.refetchQueries({ queryKey: ["fetchAccountById"] });
      queryClient.refetchQueries({ queryKey: ["fetchAccounts"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors du dépôt"
      );
    },
  });

  return {
    createMutation,
    deleteMutation,
    createTransferMutation,
    createWithdrawMutation,
    createInterestMutation,
    createDepositMutation,
  };
}

export default useEpargnMutation;
