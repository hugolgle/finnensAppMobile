import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login"); // supprime l'historique
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.info}>{user?.email}</Text>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#1c1c1e",
  },
  title: { fontSize: 30, color: "#fff", marginBottom: 20 },
  info: { fontSize: 18, color: "#aaa", marginBottom: 10 },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
