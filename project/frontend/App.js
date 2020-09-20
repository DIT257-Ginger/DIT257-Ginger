import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import TrashRegister from "./src/components/TrashRegister";
//import Share from "react-native-share";

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
