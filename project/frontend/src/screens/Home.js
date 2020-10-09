import React, { useState } from "react";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashRegister from "../components/TrashRegister";
import UserLevel from "../components/UserLevel";

export default function Home({ navigation }) {
  const [trashCount, setTrashCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <View style={{ width: 80 }}></View>
            <Image
              style={styles.appLogo}
              source={require("../../assets/pickit5.png")}
            />
            <UserLevel trashCount={trashCount} style={styles.userLevel} />
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.contents}>
        <TrashRegister onTrashCountChanged={setTrashCount} />
      </View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  top: {
    backgroundColor: "#31A896",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  appLogo: {
    //flexDirection: "row",
    //alignContent: "center",
    //width: "40%",
    height: "100%",

    resizeMode: "contain",
  },
  userLevel: {
    marginRight: 5,
    marginBottom: 5
  },
  contents: {
    flex: 1,
  },
});
