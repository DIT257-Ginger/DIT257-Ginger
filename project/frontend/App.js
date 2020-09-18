import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import TrashRegister from "./src/components/TrashRegister";
import { shareImage, shareText } from "./src/sharing";
import { Asset } from "expo-asset";

export default function App() {
  return (
    <View style={styles.container}>
      <TrashRegister />
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Brag with image!"
          onPress={() =>
            shareImage(
              Asset.fromModule(require("./assets/trash.png")).uri,
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    margin: 10,
  },
});
