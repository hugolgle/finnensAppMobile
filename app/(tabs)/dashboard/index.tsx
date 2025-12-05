import { AuthContext } from "@/app/context/AuthContext";
import useEpargnQuery from "@/app/hooks/epargn/useEpargnQuery";
import useFinancialTransactionQuery from "@/app/hooks/financialTransaction/useFinancialTransactionQuery";
import useInvestmentQuery from "@/app/hooks/investment/useInvestmentQuery";
import { useDataCalculations } from "@/app/hooks/utils/useDataCalculations";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const { user } = useContext(AuthContext);

  const { dataTransactionsFinancial } = useFinancialTransactionQuery();
  const { dataInvestments } = useInvestmentQuery();
  const { accounts: dataAccounts } = useEpargnQuery();

  const {
    amountIncomesMonth,
    amountExpensesMonth,
    amountInvest,
    amountIncomesLastMonth,
    amountExpensesLastMonth,
    amountEpargn,
  } = useDataCalculations({
    dataTransactionsFinancial,
    dataInvestments,
    dataAccounts,
  });

  const totalPatrimoine = amountInvest + amountEpargn;

  const cards = [
    {
      title: "Recettes mensuelles",
      icon: "trending-up",
      previous: amountIncomesLastMonth,
      current: amountIncomesMonth,
      colors: ["transparent", "#4ade80"],
    },
    {
      title: "Dépenses mensuelles",
      icon: "trending-down",
      previous: amountExpensesLastMonth,
      current: amountExpensesMonth,
      colors: ["transparent", "#f87171"],
    },
    {
      title: "Investissement",
      icon: "bar-chart",
      current: amountInvest,
      colors: ["transparent", "#60a5fa"],
    },
    {
      title: "Épargne",
      icon: "wallet",
      current: amountEpargn,
      colors: ["transparent", "#fbbf24"],
    },
    {
      title: "Patrimoine",
      icon: "home",
      current: totalPatrimoine,
      colors: ["transparent", "#a78bfa"],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.name}>{user?.name || "Utilisateur"}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const previous = card.previous ?? 0; // si undefined, on met 0
          const diff = card.previous != null ? card.current - previous : 0;
          const isUp = diff >= 0;

          return (
            <TouchableOpacity key={index}>
              <LinearGradient
                colors={card.colors as [string, string]}
                style={styles.card}
                start={[0, 0]}
                end={[1, 1]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Ionicons
                    name={
                      card.icon as
                        | "trending-up"
                        | "trending-down"
                        | "bar-chart"
                        | "wallet"
                        | "home"
                    }
                    size={16}
                    color="#fff"
                  />
                </View>
                <Text style={styles.cardSubtitle}>
                  Mois précédent :{" "}
                  {card.previous != null
                    ? previous.toLocaleString() + " €"
                    : "-"}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    { color: isUp ? "#4ade80" : "#f87171" },
                  ]}
                >
                  Ce mois : {card.current.toLocaleString()} €{" "}
                  {card.previous != null
                    ? `(${isUp ? "+" : ""}${diff.toLocaleString()})`
                    : ""}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    color: "#fff",
  },
  name: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "column",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
