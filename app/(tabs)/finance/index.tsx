import { fetchTransactions } from "@/services/financialTransaction.service";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FinanceBoardScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const totalRevenus = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDepenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const solde = totalRevenus - totalDepenses;

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await fetchTransactions(null, null, null);
        setTransactions(res.data || []);
      } catch (error) {
        console.error("Erreur lors du fetch des transactions", error);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Résumé global */}
      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Revenus :</Text>
          <Text style={[styles.value, { color: "#4caf50" }]}>
            +{totalRevenus.toFixed(2)} €
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Dépenses :</Text>
          <Text style={[styles.value, { color: "#f44336" }]}>
            -{totalDepenses.toFixed(2)} €
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Solde :</Text>
          <Text
            style={[
              styles.value,
              { color: solde >= 0 ? "#4caf50" : "#f44336" },
            ]}
          >
            {solde.toFixed(2)} €
          </Text>
        </View>
      </View>

      {/* Liste */}
      {transactions.length === 0 ? (
        <Text style={styles.message}>Aucune transaction</Text>
      ) : (
        transactions.map((t) => (
          <View key={t._id} style={styles.transactionCard}>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.detail}>
              {t.amount > 0 ? "+" : "-"}
              {Math.abs(t.amount)} € — {t.category} —{" "}
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

  summaryBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#ccc",
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },

  transactionCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
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
