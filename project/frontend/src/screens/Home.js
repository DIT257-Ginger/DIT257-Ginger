import React from "react";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashRegister from "../components/TrashRegister";
import UserLevel from "../components/UserLevel";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SafeAreaView>
          <View style={styles.topBar}>
            <Image
              style={styles.appLogo}
              source={require("../../assets/pickit5.png")}
            />
            <UserLevel style={styles.userLevel} />
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
    justifyContent: "space-between",
    backgroundColor: "#31A896",
    height: 100,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  contents: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
  },
  userLevel: {
    //alignContent: "center",
    //width: 100,
  },

  appLogo: {
    //flexDirection: "row",
    //alignContent: "center",
    //width: "40%",
    height: "100%",

    resizeMode: "contain",
  },
});
