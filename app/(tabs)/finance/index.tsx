import FinancialForm from "@/app/components/form/FinancialForm";
import useFinancialTransactionQuery from "@/app/hooks/financialTransaction/useFinancialTransactionQuery";
import ModalScreen from "@/app/modal";
import MonthSelector from "@/components/MonthSelector";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { addTransaction } from "@/services/financialTransaction.service";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FinanceBoardScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [modalSeeAll, setModalSeeAll] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const { dataTransactionsFinancial, isLoadingTransactionsFinancial } =
    useFinancialTransactionQuery();

  // mutation pour ajouter
  const mutationAdd = useMutation({
    mutationFn: (postData: any) => addTransaction(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTransactions"] });
      setModalCreate(false);
    },
    onError: (err) => console.error(err),
  });

  const openEditModal = (transaction: any) => {
    setEditedTitle(transaction.title);
    setEditedAmount(transaction.amount.toString());
    setModalVisible(true);
  };

  const saveTransaction = () => {
    // ici tu pourrais créer une mutation update si tu veux sync avec serveur
    setModalVisible(false);
  };

  if (isLoadingTransactionsFinancial) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Text style={[styles.message, { color: Colors[colorScheme].text }]}>
          Chargement...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <MonthSelector
        onChangeMonth={(month) => console.log("Mois sélectionné :", month)}
      />
      <View style={styles.containerBtn}>
        <Pressable
          style={styles.actionBtn}
          onPress={() => setModalSeeAll(true)}
        >
          <Ionicons
            name="eye-outline"
            size={20}
            color={Colors[colorScheme].text}
            style={[
              styles.icon,
              {
                backgroundColor: Colors[colorScheme].border,
              },
            ]}
          />
          <Text style={{ color: Colors[colorScheme].text }}>Voir tout</Text>
        </Pressable>

        <Pressable
          style={styles.actionBtn}
          onPress={() => setModalCreate(true)}
        >
          <Ionicons
            name="add-outline"
            size={20}
            color={Colors[colorScheme].text}
            style={[
              styles.icon,
              {
                backgroundColor: Colors[colorScheme].border,
              },
            ]}
          />
          <Text style={{ color: Colors[colorScheme].text }}>Créer</Text>
        </Pressable>

        <Pressable
          style={styles.actionBtn}
          onPress={() => setModalDetail(true)}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={Colors[colorScheme].text}
            style={[
              styles.icon,
              {
                backgroundColor: Colors[colorScheme].border,
              },
            ]}
          />
          <Text style={{ color: Colors[colorScheme].text }}>Détails</Text>
        </Pressable>
      </View>
      {dataTransactionsFinancial.length === 0 ? (
        <Text style={[styles.message, { color: Colors[colorScheme].text }]}>
          Aucune transaction
        </Text>
      ) : (
        dataTransactionsFinancial.map((t: any) => (
          <Pressable key={t._id} onPress={() => openEditModal(t)}>
            <View
              style={[
                styles.transactionCard,
                { backgroundColor: Colors[colorScheme].card },
              ]}
            >
              <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
                {t.title}
              </Text>
              <Text
                style={[styles.detail, { color: Colors[colorScheme].text }]}
              >
                {t.amount > 0 ? "+" : "-"}
                {Math.abs(t.amount)} € — {t.category} —{" "}
                {new Date(t.date).toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
        ))
      )}

      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <ModalScreen text="Modifier la transaction">
          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              },
            ]}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Titre"
            placeholderTextColor={Colors[colorScheme].placeholder}
          />
          <TextInput
            style={[
              styles.input,
              {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              },
            ]}
            value={editedAmount}
            onChangeText={setEditedAmount}
            placeholder="Montant"
            placeholderTextColor={Colors[colorScheme].placeholder}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <Button title="Annuler" onPress={() => setModalVisible(false)} />
            <Button title="Enregistrer" onPress={saveTransaction} />
          </View>
        </ModalScreen>
      </Modal>
      <Modal
        visible={modalSeeAll}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalSeeAll(false)}
      >
        <ModalScreen text="Toutes les transactions">
          <Button title="Fermer" onPress={() => setModalSeeAll(false)} />
        </ModalScreen>
      </Modal>
      <Modal
        visible={modalCreate}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalCreate(false)}
      >
        <ModalScreen text="Créer une transaction">
          <FinancialForm onSubmit={mutationAdd.mutate} />
          <Button title="Fermer" onPress={() => setModalCreate(false)} />
        </ModalScreen>
      </Modal>
      <Modal
        visible={modalDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalDetail(false)}
      >
        <ModalScreen text="Détails">
          <Button title="Fermer" onPress={() => setModalDetail(false)} />
        </ModalScreen>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  message: { fontSize: 16, textAlign: "center", marginTop: 20 },
  transactionCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  detail: { fontSize: 14, marginTop: 4 },
  modalContent: {
    padding: 30,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  icon: {
    padding: 8,
    borderRadius: "100%",
  },
  actionBtn: {
    alignItems: "center",
    gap: 4,
  },
});
