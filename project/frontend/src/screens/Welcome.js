import React from "react";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";

const welcome = [
  {
    title: "",
    description: "Collect 10 bags of trash",
    icon: require("../../assets/idleGif.gif")
  },
  {

    title: "Recycler",
    description: "Let’s take country recycling revolution one step further",
    description: "and turn trash into the new products.",
    description: "You will contribute to a zero waste sociality.",
    description: "Plastic bottles and aluminium cans are separated from the",
    description: "trash and recycled in nearest supermarket",
    icon: require("../../assets/leaflogo_1.png")
  },
];

export default function Welcome({ navigaton }) {


  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>kalleanka</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ width: 80 }}></View>
      <Image
        style={styles.appLogo}
        source={require("../../assets/pickit5.png")}
      />
      <View style={styles.contents}>
        <Text style={styles.headerTitle}>Welcome to Keep Clean World</Text>
        <Text style={styles.headerTitle}>Nice to see you here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EE1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  appLogo: {
    flexDirection: "row",
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  description: {
    backgroundColor: "#8EE1FF",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  }
});
