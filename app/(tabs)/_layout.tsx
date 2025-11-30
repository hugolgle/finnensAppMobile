import { View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function TabLayout() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    }
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => {
          const avatarUrl = !user?.googleId
            ? `http://localhost:8000${user?.img}`
            : user?.img;

          return (
            <View style={styles.headerTab} darkColor="rgba(255,255,255,0)">
              <Link href="/profile">
                {user?.img ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    style={{ width: 35, height: 35, borderRadius: 50 }}
                  />
                ) : (
                  <FontAwesome name="user-circle" size={35} color="#fff" />
                )}
              </Link>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: "Tableau de bord",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="finance/index"
        options={{
          title: "Finance",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="finance" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTab: {
    paddingLeft: 12,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
