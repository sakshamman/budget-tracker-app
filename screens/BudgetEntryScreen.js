import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const BudgetEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income"); // 'income' or 'expense'

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "budgets"), {
        userId: auth.currentUser.uid,
        title,
        amount: parseFloat(amount),
        type,
        date: Timestamp.now(),
      });
      Alert.alert("Success", "Entry added");
      setTitle("");
      setAmount("");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Entry</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonGroup}>
        <Button
          title="Income"
          color={type === "income" ? "green" : "gray"}
          onPress={() => setType("income")}
        />
        <Button
          title="Expense"
          color={type === "expense" ? "red" : "gray"}
          onPress={() => setType("expense")}
        />
      </View>
      <Button title="Save Entry" onPress={handleAdd} />
    </View>
  );
};

export default BudgetEntryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
