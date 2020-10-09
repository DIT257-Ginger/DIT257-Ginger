import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default ({ children }) => (
  <View style={styles.headerContainer}>
    <SafeAreaView>
      <View style={styles.headerRow}>{children}</View>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#31A896",
    zIndex: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android shadow
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
