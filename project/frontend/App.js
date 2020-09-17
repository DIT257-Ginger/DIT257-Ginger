import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Sharing from "expo-sharing";
import TrashRegister from "./src/components/TrashRegister";
import { Asset } from "expo-asset";

export default function App() {
  return (
    <View style={styles.container}>
      <TrashRegister />
      <StatusBar style="auto" />
      <Image source={require("./assets/trash.png")} />
      <Button onPress={trashShare} title="Brag!" />
    </View>
  );
}

const trashShare = async () => {
  console.log(Asset.fromModule(require("./assets/trash.png")).uri);

  if (!(await Sharing.isAvailableAsync())) {
    alert("Uh oh, sharing isn't available on your platform");
    return;
  }

  try {
    await Sharing.shareAsync(
      /* Asset.fromModule(require("./assets/trash.png")).uri */
      "data:image/png;base64,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"
    );
  } catch (error) {
    alert(error.message);
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
