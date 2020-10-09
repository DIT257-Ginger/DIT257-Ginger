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
          <View style={{ width: 80 }}></View>
          <Image
            style={styles.appLogo}
            source={require("../../assets/pickit5.png")}
          />
          <UserLevel style={styles.userLevel} />
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

  appLogo: {
    flexDirection: "row",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
