import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const { user, logout } = useContext(AuthContext);

  const sections = [
    { title: "Mes finances", subtitle: "Voir toutes mes transactions" },
    { title: "Mes investissements", subtitle: "Voir mes investissements" },
    { title: "Statistiques", subtitle: "Vos performances récentes" },
    { title: "Paramètres", subtitle: "Gérer votre compte" },
  ];

  // Exemple de stats
  const stats = [
    { label: "Investissements", value: 70, color: "#4caf50" },
    { label: "Revenus", value: 50, color: "#2196f3" },
    { label: "Dépenses", value: 30, color: "#f44336" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.name}>{user?.name || "Utilisateur"}</Text>
      </View>

      <View style={styles.cardsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardSubtitle}>{section.subtitle}</Text>
          </TouchableOpacity>
        ))}
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
    fontWeight: "400",
  },
  name: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    color: "#ccc",
    fontSize: 13,
  },
  statsCard: {
    width: "100%",
  },
  statRow: {
    marginVertical: 5,
  },
  statLabel: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 3,
  },
  statBarBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 5,
  },
  statBarFill: {
    height: 10,
    borderRadius: 5,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#ff6b6b",
    alignItems: "center",
  },
});
