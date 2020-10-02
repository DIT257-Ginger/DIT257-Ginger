import React from "react";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashRegister from "../components/TrashRegister";

export default function Home({ navigation }) {
  return (
      <View style={styles.container}>
        <View style={styles.top}>
          <SafeAreaView>
            <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Anon</Text>
              <Text style={{ fontSize: 20 }}>Lv. 8</Text>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.contents}>
          <TrashRegister />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  top: {
    flexDirection: "row",
    backgroundColor: "#31A896",
    height: "15%",
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  contents: {
    flex: 1,
  },
});
