import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { writeTrashCount, readTrashCount } from "../persistence";
import UserLevel from "./UserLevel";

/**
 * Component for registering trash collected by user.
 */
export default function TrashRegister() {
  const [trashCount, setTrashCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial trash count
  useEffect(() => {
    async function fetchTrashCount() {
      const count = await readTrashCount();
      setTrashCount(count);
      setLoading(false);
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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <UserLevel />
          <Text style={styles.collectionText}>
            You have collected {trashCount} bag(s) of trash!
          </Text>
          <Button
            testID="increment-btn"
            style={styles.button}
            title="Press to collect another bag!"
            onPress={onCollect}
            color="#f194ff"
          />
          <Button
            testID="clear-btn"
            style={styles.button}
            title="Press to clear your collection!"
            onPress={onClear}
            color="#f194ff"
          />
        </>
      )}
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
    margin: 10,
  },
  collectionText: {
    fontSize: 30,
  },
});
