import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "budgets"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {auth.currentUser.email}</Text>
      <Button title="Add Entry" onPress={() => navigation.navigate("Add")} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={{ color: item.type === "income" ? "green" : "red" }}>
              ₹ {item.amount}
            </Text>
            <Text>{item.type.toUpperCase()}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcome: { fontSize: 18, marginBottom: 10 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
});
