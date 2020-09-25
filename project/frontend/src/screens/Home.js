import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import Achievements from "./Achievements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
//import { StatusBar } from "expo-status-bar";
import TrashRegister from "../components/TrashRegister";
import { shareImage, shareText } from "../sharing";
import { Asset } from "expo-asset";

export default function Home({ navigation }) {
  return (
    //safeareaview seer lite skumt ut med background color?

    <SafeAreaView
      style={{ flex: 1 }}
      backgroundColor="#31A896"
      edges={["right", "top", "left"]}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Anon</Text>
            <Text style={{ fontSize: 20 }}>Lv. 8</Text>
          </View>
        </View>
        <View style={styles.middle}>
          <Image
            style={styles.fillGarbage}
            source={require("../../assets/idleGif.gif")}
          />
        </View>
        <View style={styles.bottom}>
          <TrashRegister />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title="Brag with image!"
              onPress={() =>
                shareImage(
                  Asset.fromModule(require("../../assets/idleGif.gif")).uri,
                  "Share your trash!"
                )
              }
            />
            <Button
              style={styles.button}
              title="Brag with text!"
              onPress={() =>
                shareText("I have collected so much trash, look at it!")
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#8EE1FF",
  },
  top: {
    flexDirection: "row",
    backgroundColor: "#31A896",
    height: "15%",
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  middle: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  fillGarbage: {
    flexGrow: 1,
    alignSelf: "center",
    width: "45%",
    height: "55%",
  },
  bottom: {
    flexShrink: 1,
    //justifyContent: "flex-end",
    //flexDirection: "column",
  },
  buttonContainer: {
    flexDirection: "row",
    //marginBottom: 10,
    //},
    //button: {
    // margin: 10,
  },
});
