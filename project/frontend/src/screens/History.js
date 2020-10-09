import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import TrashHistoryList from "../components/TrashHistoryList";

export default function History({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <ScreenHeader>
        <Text style={styles.headerTitle}>History</Text>
      </ScreenHeader>
      <TrashHistoryList style={{ overflow: "visible" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
