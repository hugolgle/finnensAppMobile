import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  type: yup.string().required("Le type est requis"),
  title: yup.string().required("Titre requis"),
  category: yup.string().required("Catégorie requise"),
  date: yup.date().required(),
  detail: yup.string().max(250),
  amount: yup.number().required("Montant requis").positive("Doit être positif"),
});

export default function FinancialForm({ onSubmit }: any) {
  const colorScheme = useColorScheme() ?? "light";

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const formik = useFormik({
    initialValues: {
      type: "",
      title: "",
      category: "",
      date: new Date(),
      detail: "",
      amount: "",
    },
    validationSchema,
    validateOnChange: false, // <-- ne valide pas à chaque changement
    validateOnBlur: false, // <-- ne valide pas à la sortie du champ
    onSubmit: (values) => {
      onSubmit({ ...values, tags });
    },
  });


  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.length >= 3) return;

    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      {/* TYPE */}

      <View style={styles.row}>
        {["income", "expense"].map((t) => (
          <Pressable
            key={t}
            style={[
              styles.typeBtn,
              {
                backgroundColor:
                  formik.values.type === t
                    ? Colors[colorScheme].tint
                    : Colors[colorScheme].background,
                borderColor: Colors[colorScheme].tint,
              },
            ]}
            onPress={() => formik.setFieldValue("type", t)}
          >
            <Text
              style={{
                color:
                  formik.values.type === t
                    ? Colors[colorScheme].background
                    : Colors[colorScheme].text,
              }}
            >
              {t === "income" ? "Revenu" : "Dépense"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TITRE */}
      <View>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].tint,
            },
          ]}
          placeholder="Titre"
          placeholderTextColor="#888"
          value={formik.values.title}
          onChangeText={(v) => formik.setFieldValue("title", v)}
        />
        {formik.errors.title && (
          <Text style={styles.error}>{formik.errors.title}</Text>
        )}
      </View>
      {/* CATÉGORIE */}
      <View>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].tint,
            },
          ]}
          placeholder="Catégorie"
          placeholderTextColor="#888"
          value={formik.values.category}
          onChangeText={(v) => formik.setFieldValue("category", v)}
        />
        {formik.errors.category && (
          <Text style={styles.error}>{formik.errors.category}</Text>
        )}
      </View>
      {/* DATE */}
      <DateTimePicker
        mode="date"
        value={formik.values.date}
        onChange={(e, d) => {
          if (d) formik.setFieldValue("date", d);
        }}
      />

      {/* DETAIL */}
      <View>
        <TextInput
          style={[
            styles.textarea,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].tint,
            },
          ]}
          multiline
          value={formik.values.detail}
          onChangeText={(v) => formik.setFieldValue("detail", v)}
        />
        {formik.errors.detail && (
          <Text style={styles.error}>{formik.errors.detail}</Text>
        )}
      </View>

      {/* MONTANT */}
      <View>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].tint,
            },
          ]}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#888"
          value={formik.values.amount}
          onChangeText={(v) => formik.setFieldValue("amount", v)}
        />
        {formik.errors.amount && (
          <Text style={styles.error}>{formik.errors.amount}</Text>
        )}
      </View>

      {/* TAGS */}
      <View style={styles.tagContainer}>
        {tags.map((tag, i) => (
          <Pressable key={i} style={styles.tag} onPress={() => removeTag(i)}>
            <Text style={{ color: Colors[colorScheme].text }}>{tag} ❌</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            {
              flex: 1,
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].tint,
            },
          ]}
          placeholder="Ajouter tag"
          placeholderTextColor="#888"
          value={tagInput}
          onChangeText={setTagInput}
        />
        <Pressable style={styles.addTagBtn} onPress={addTag}>
          <Text style={{ color: Colors[colorScheme].background }}>+</Text>
        </Pressable>
      </View>

      {/* SUBMIT */}
      <Pressable style={styles.submitBtn} onPress={() => formik.handleSubmit()}>
        <Text style={{ color: "#fff" }}>Valider</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 80,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  typeBtn: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  addTagBtn: {
    backgroundColor: "#4C8EF7",
    padding: 12,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: "#4C8EF7",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
});
