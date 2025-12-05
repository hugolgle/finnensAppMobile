import {
  addDividend,
  addInvestment,
  addTransactionInvestment,
  deleteDividend,
  deleteTransactionInvestment,
  editDividend,
  editInvestments,
  editInvestmentsTransaction,
} from "@/services/investment.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Callbacks {
  onSuccessCallback?: (message: string) => void;
  onErrorCallback?: (message: string) => void;
}

function useInvestmentMutation(
  investmentId?: string,
  investmentTransactionId?: string,
  callbacks?: Callbacks
) {
  const queryClient = useQueryClient();
  const { onSuccessCallback, onErrorCallback } = callbacks || {};

  const updateInvestmentMutation = useMutation({
    mutationFn: async (values: any) => {
      const editData = {
        id: investmentId,
        type: values.type,
        name: values.name,
        symbol: values.symbol,
        isin: values.isin,
      };
      return await editInvestments(editData);
    },
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Investissement modifié");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors de la modification"
      );
    },
  });

  const createInvestmentMutation = useMutation({
    mutationFn: async (postData: any) => addInvestment(postData),
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Investissement créé");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors de la création"
      );
    },
  });

  const createTransactionInvestmentMutation = useMutation({
    mutationFn: async (postData: any) =>
      addTransactionInvestment(investmentId, postData),
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Transaction ajoutée");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message ||
          "Erreur lors de l'ajout de transaction"
      );
    },
  });

  const createDividendInvestmentMutation = useMutation({
    mutationFn: async (postData: any) => addDividend(investmentId, postData),
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Dividende ajouté");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message || "Erreur lors de l'ajout de dividende"
      );
    },
  });

  const updateDividendInvestmentMutation = useMutation({
    mutationFn: async (values: any) => {
      const editData = {
        id: investmentTransactionId,
        date: values.date.toLocaleDateString("fr-CA"),
        amount: Math.abs(values.amount),
      };
      return await editDividend(editData, investmentTransactionId);
    },
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Dividende modifié");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message ||
          "Erreur lors de la modification du dividende"
      );
    },
  });

  const updateTransactionInvestmentMutation = useMutation({
    mutationFn: async (values: any) => {
      const editData = {
        id: investmentTransactionId,
        date: values.date.toLocaleDateString("fr-CA"),
        amount: Math.abs(values.amount),
      };
      return await editInvestmentsTransaction(
        editData,
        investmentTransactionId
      );
    },
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Transaction modifiée");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message ||
          "Erreur lors de la modification de la transaction"
      );
    },
  });

  const deleteInvestmentMutation = useMutation({
    mutationFn: async (ids: any) => deleteTransactionInvestment(ids),
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Transaction supprimée");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message ||
          "Erreur lors de la suppression de la transaction"
      );
    },
  });

  const deleteDividendMutation = useMutation({
    mutationFn: async (ids: any) => deleteDividend(ids),
    onSuccess: (response) => {
      onSuccessCallback?.(response?.data?.message || "Dividende supprimé");
      queryClient.invalidateQueries({ queryKey: ["fetchInvestmentById"] });
      queryClient.refetchQueries({ queryKey: ["fetchInvestments"] });
    },
    onError: (error: any) => {
      onErrorCallback?.(
        error?.response?.data?.message ||
          "Erreur lors de la suppression du dividende"
      );
    },
  });

  return {
    updateInvestmentMutation,
    createInvestmentMutation,
    deleteInvestmentMutation,
    createTransactionInvestmentMutation,
    createDividendInvestmentMutation,
    updateDividendInvestmentMutation,
    updateTransactionInvestmentMutation,
    deleteDividendMutation,
  };
}

export default useInvestmentMutation;
