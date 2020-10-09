import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  Image,
  TouchableHighlight,
  Platform,
} from "react-native";
import {
  collect,
} from "../features/trashCollection";
import { readTrashCount } from "../persistence";
import TrashRegistrationSelection from "./TrashRegistrationSelection";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * Component for registering trash collected by user.
 */
export default function TrashRegister({ onTrashCountChanged = () => {} }) {
  const [trashCount, setTrashCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  async function fetchTrashCount() {
    const count = await readTrashCount();
    setTrashCount(count);
  }

  // Fetch initial trash count
  useEffect(() => {
    fetchTrashCount();
  }, []);

  // Propagate changed trash count whenever it changes
  useEffect(() => {
    onTrashCountChanged(trashCount);
  }, [trashCount]);

  async function onAddBag() {
    await collect("bag", 1);
    await fetchTrashCount();
  }

  async function onRemoveBag() {
    await collect("bag", -1); // TODO: Properly remove row
    await fetchTrashCount();
  }

  return (
    <>
      {Platform.OS !== "web" || modalVisible ? (
        //Collect Popup Window
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          testID={"collect-modal"}
        >
          <TrashRegistrationSelection
            onCancelled={() => setModalVisible(false)}
            onTrashCollected={() => {
              fetchTrashCount();
              setModalVisible(false);
            }}
          />
        </Modal>
      ) : null}
      <View style={styles.container}>
        <Image
          style={styles.garbageCanImage}
          source={require("../../assets/idleGif.gif")}
        />

        <TouchableHighlight
          style={styles.collectButton}
          onPress={() => {
            setModalVisible(true);
          }}
          testID={"collect-type-btn"}
        >
          <Text style={styles.collectButtonText}>Collect Type</Text>
        </TouchableHighlight>
        <View style={styles.addRemoveTrashContainer}>
          <TouchableHighlight
            style={styles.removeButton}
            onPress={() => {
              onRemoveBag();
            }}
            testID={"remove-bag-btn"}
          >
            <Icon name="minus" color={"white"} size={40} />
          </TouchableHighlight>

          <Text style={styles.collectionText}>
            {trashCount.toFixed(2)} Trash Bags
          </Text>

          <TouchableHighlight
            style={styles.addButton}
            onPress={() => {
              onAddBag();
            }}
            testID={"add-bag-btn"}
          >
            <Icon name="plus" color={"white"} size={40} />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
  },
  garbageCanImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  collectButton: {
    width: 120,
    height: 30,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
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
  collectButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  addRemoveTrashContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  collectionText: {
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 25,
  },
  addButton: {
    width: 60,
    height: 60,
    padding: 10,
    marginRight: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "pink",
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
  removeButton: {
    width: 60,
    height: 60,
    padding: 10,
    marginLeft: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "pink",
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
});
