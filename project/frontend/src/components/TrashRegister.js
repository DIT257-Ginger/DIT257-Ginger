import { DarkTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Modal, Image, TouchableHighlight, Platform } from "react-native";
import { getTrashTypes } from "../features/trashCollection";
import { writeTrashCount, readTrashCount } from "../persistence";
import TrashRegistrationSelection from "./TrashRegistrationSelection";

/**
 * Component for registering trash collected by user.
 */
export default function TrashRegister() {
  const [trashCount, setTrashCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(true);

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
  /*TODO
  - fetch the input value of the collect popup.
  - Multiply the value of the trash object and the amount of input value.
  - Add the result to the trashbag count.
  */
  return (
    <>
      {Platform.OS !== "web" || modalVisible ? (
        <Modal style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TrashRegistrationSelection setModalVisible={setModalVisible} />
        </Modal>
      ) : null}
      <View style={styles.container}>
        <Image
          style={styles.garbageCanImage}
          source={require("../../assets/idleGif.gif")}
        />

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Add Trash</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  garbageCanImage: {
    flexGrow: 1,
    alignSelf: "center",
    width: "45%",
    height: "55%",
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "stretch",
    alignSelf: "center",
    justifyContent: "space-between",
  }
});
