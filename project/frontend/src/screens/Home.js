import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  Dimensions,
} from "react-native";
import Achievements from "./Achievements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
//import { StatusBar } from "expo-status-bar";
import TrashRegister from "../components/TrashRegister";
import { shareImage, shareText } from "../sharing";
import { Asset } from "expo-asset";
import UserLevel from "../components/UserLevel";
import { getLevel } from "../features/leveling";

export default function Home({ navigation }) {
  const dimension = Dimensions.get("screen");
  const screenWidth = dimension.width / 2;
  const [leveling, levelUser] = useState(0);

  return (
    //safeareaview seer lite skumt ut med background color?
    <SafeAreaView
      style={{ flex: 1 }}
      backgroundColor="#31A896"
      edges={["right", "top", "left"]}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ width: 80 }}></View>
          <Image
            style={styles.appLogo}
            source={require("../../assets/pickit5.png")}
          />
          <UserLevel style={styles.userLevel} />
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
    justifyContent: "space-between",
    backgroundColor: "#31A896",
    height: 100,
    paddingHorizontal: 5,
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

  appLogo: {
    flexDirection: "row",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
