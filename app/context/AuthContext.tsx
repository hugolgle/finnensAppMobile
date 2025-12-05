// app/context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  googleId?: string;
  img?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const savedToken = await AsyncStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } else {
        router.replace("/(auth)/login");
      }
    })();
  }, []);

  const login = async (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("token", tokenData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");

    setUser(null);
    setToken(null);

    // ❗ Nettoyage complet des données de l'app
    queryClient.clear();

    // Navigation propre
    router.dismissAll();
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
