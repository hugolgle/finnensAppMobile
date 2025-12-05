import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MonthSelector({
  onChangeMonth,
}: {
  onChangeMonth?: (month: Date) => void;
}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date(2025, 11)); // Décembre 2025

  const changeMonth = (delta: number) => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() + delta);
    setSelectedMonth(newMonth);
    onChangeMonth?.(newMonth);
  };

  const monthName = selectedMonth.toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.selectorBox}>
      <Pressable onPress={() => changeMonth(-1)} style={styles.arrowBtn}>
        <Ionicons name="chevron-back-circle-outline" size={20} color="#fff" />
      </Pressable>

      <Text style={styles.monthText}>{monthName}</Text>

      <Pressable onPress={() => changeMonth(1)} style={styles.arrowBtn}>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={20}
          color="#fff"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 16,
    marginBottom: 25,
  },
  monthText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowBtn: {
    padding: 5,
  },
});
