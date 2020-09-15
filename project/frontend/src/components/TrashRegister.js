import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { writeTrashCount, readTrashCount } from "../persistence";

export default function TrashRegister() {
  const [trashCount, setTrashCount] = useState(0);

  useEffect(() => {
    async function fetchTrashCount() {
      const count = await readTrashCount();
      setTrashCount(count);
    }
    fetchTrashCount();
  }, []);

  async function onCollect() {
    setTrashCount((prevTrash) => prevTrash + 1);
    await writeTrashCount(trashCount + 1);
  }

  async function onClear() {
    setTrashCount(0);
    await writeTrashCount(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.collectionText}>
        You have collected {trashCount} bag(s) of trash!
      </Text>
      <Button
        style={styles.button}
        title="Press to collect another bag!"
        onPress={onCollect}
        color="#f194ff"
      />
      <Button
        style={styles.button}
        title="Press to clear your collection!"
        onPress={onClear}
        color="#f194ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 70,
    alignItems: "center",
  },
  collectionText: {
    fontSize: 50,
  },
});
