import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function ModalScreen({ children, text }: any) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 40,
          height: 5,
          backgroundColor: "#ccc",
          borderRadius: 3,
          alignSelf: "center",
          marginBottom: 12,
          position: "absolute",
          top: 16,
          marginHorizontal: "auto",
        }}
      />
      <Text style={styles.title}>{text}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.containerChildren}>{children}</View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerChildren: {
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
