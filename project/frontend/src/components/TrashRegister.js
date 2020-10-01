import { DarkTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Modal, Image, TouchableHighlight, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getTrashTypes } from "../features/trashCollection";
import { writeTrashCount, readTrashCount } from "../persistence";
import TrashRegistrationSelection from "./TrashRegistrationSelection";
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Component for registering trash collected by user.
 */
export default function TrashRegister() {
  const [trashCount, setTrashCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(true);

  async function fetchTrashCount() {
    const count = await readTrashCount();
    setTrashCount(count);
    setLoading(false);
  }

  // Fetch initial trash count
  useEffect(() => {
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
    <>
      {Platform.OS !== "web" || modalVisible ? (
        //Collect Popup Window
        <Modal style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TrashRegistrationSelection setModalVisible={setModalVisible} onTrashCollected={() => fetchTrashCount()} />
        </Modal>
      ) : null}
      <View style={styles.container}>
        <Image
          style={styles.garbageCanImage}
          source={require("../../assets/idleGif.gif")}
        />
        <Text style={styles.collectionText}>Trash collected: {trashCount.toFixed(2)}</Text>
        <TouchableHighlight
          style={styles.collectButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon name="plus" color={"white"} size={40} />
        </TouchableHighlight>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  garbageCanImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain"
  },
  collectionText: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 25
  },
  collectButton: {
    width: 60,
    height: 60,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'pink',
    borderRadius: 30,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 5,
  },
  modalContainer: {
    width: "100%",
    height: "100%",
  }
});
