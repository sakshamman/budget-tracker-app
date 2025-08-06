import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
});
