import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import useFinancialTransactionQuery from "../hooks/financialTransaction/useFinancialTransactionQuery";


export default function FinanceScreen() {
  const { isLoadingTransactionsFinancial, dataTransactionsFinancial } = useFinancialTransactionQuery();

  if (isLoadingTransactionsFinancial) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!dataTransactionsFinancial || dataTransactionsFinancial.length === 0 ? (
        <Text style={styles.message}>Aucune transaction</Text>
      ) : (
        dataTransactionsFinancial.map((t: any) => (
          <View key={t._id} style={styles.transactionCard}>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.detail}>
              {t.amount} € — {t.category} —{" "}
              {new Date(t.date).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  transactionCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  detail: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
});
