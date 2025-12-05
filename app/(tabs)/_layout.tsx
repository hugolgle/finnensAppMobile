import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function TabLayout() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light"; // valeur par défaut si null

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    }
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: true,
        headerLeft: () => {
          const avatarUrl = !user?.googleId
            ? `http://192.168.0.102:8000${user?.img}`
            : user?.img;

          return (
            <View style={styles.headerTab}>
              <Link href="/profile">
                {user?.img ? (
                  <Image
                    source={{ uri: avatarUrl }}
                    style={{ width: 24, height: 24, borderRadius: 50 }}
                  />
                ) : (
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    color={Colors[colorScheme].tabIconDefault}
                  />
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={16}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="finance/index"
        options={{
          title: "Finance",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={16}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTab: {
    paddingHorizontal: 12,
    paddingBottom: 4,
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
});
