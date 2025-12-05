import { AuthContext } from "@/app/context/AuthContext";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { loginUser } from "@/services/users.service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      login(res.user, res.accessToken);
      router.replace("/(tabs)/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Connexion échouée"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        Colors[colorScheme].gradientFrom,
        Colors[colorScheme].gradientTo,
      ]}
      style={styles.gradient}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
                Bienvenue
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { color: Colors[colorScheme].textSecondary },
                ]}
              >
                Connectez-vous à votre compte
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text
                  style={[styles.label, { color: Colors[colorScheme].text }]}
                >
                  Email
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: Colors[colorScheme].text,
                      borderColor: Colors[colorScheme].border,
                      backgroundColor: Colors[colorScheme].card,
                    },
                  ]}
                  placeholder="votre@email.com"
                  placeholderTextColor={Colors[colorScheme].placeholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text
                  style={[styles.label, { color: Colors[colorScheme].text }]}
                >
                  Mot de passe
                </Text>
                <View
                  style={[
                    styles.passwordContainer,
                    {
                      borderColor: Colors[colorScheme].border,
                      backgroundColor: Colors[colorScheme].card,
                    },
                  ]}
                >
                  <TextInput
                    style={[
                      styles.passwordInput,
                      { color: Colors[colorScheme].text },
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={Colors[colorScheme].placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={Colors[colorScheme].text}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text
                  style={[
                    styles.forgotPasswordText,
                    { color: Colors[colorScheme].tint },
                  ]}
                >
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: Colors[colorScheme].foreground },
                ]}
                onPress={handleLogin}
              >
                <Text
                  style={[
                    styles.loginButtonText,
                    { color: Colors[colorScheme].textForeground },
                  ]}
                >
                  Se connecter
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: Colors[colorScheme].border },
                  ]}
                />
                <Text
                  style={[
                    styles.dividerText,
                    { color: Colors[colorScheme].textSecondary },
                  ]}
                >
                  ou continuer avec
                </Text>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: Colors[colorScheme].border },
                  ]}
                />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    {
                      borderColor: Colors[colorScheme].border,
                      backgroundColor: Colors[colorScheme].card,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-apple"
                    size={24}
                    color={Colors[colorScheme].text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    {
                      borderColor: Colors[colorScheme].border,
                      backgroundColor: Colors[colorScheme].card,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-google"
                    size={24}
                    color={Colors[colorScheme].text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: Colors[colorScheme].textSecondary },
                ]}
              >
                Pas encore de compte ?{" "}
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.signUpText,
                    { color: Colors[colorScheme].tint },
                  ]}
                >
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
  header: { marginBottom: 40, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16 },
  form: { marginBottom: 24 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeButton: { paddingHorizontal: 16, justifyContent: "center" },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPasswordText: { fontSize: 14, fontWeight: "600" },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: { fontSize: 16, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 16, fontSize: 14 },
  socialButtons: { flexDirection: "row", justifyContent: "center", gap: 12 },
  socialButton: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: { fontSize: 14 },
  signUpText: { fontSize: 14, fontWeight: "600" },
});
