import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import TrashRegister from "../components/TrashRegister";
import UserLevel from "../components/UserLevel";

export default function Home({ navigation }) {
  const [trashCount, setTrashCount] = useState(0);

  return (
    <View style={styles.container}>
      <ScreenHeader style={styles.header}>
        <View style={{ width: 80 }}></View>
        <Image
          style={styles.appLogo}
          source={require("../../assets/pickit5.png")}
        />
        <UserLevel trashCount={trashCount} style={styles.userLevel} />
      </ScreenHeader>
      <View style={styles.contents}>
        <TrashRegister onTrashCountChanged={setTrashCount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  header: {
    // Override default padding and rounding of ScreenHeader
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    marginBottom: 5,
  },
  contents: {
    flex: 1,
  },
});
