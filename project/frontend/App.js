import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import TrashRegister from "./src/components/TrashRegister";

export default function App() {
  return (
    <View style={styles.container}>
      <TrashRegister />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
