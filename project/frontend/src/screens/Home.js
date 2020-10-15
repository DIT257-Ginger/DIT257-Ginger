import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashRegister from "../components/TrashRegister";
import UserLevel from "../components/UserLevel";
import WelcomeInfoModal from "../components/WelcomeInfoModal";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation }) {
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
  const [trashCount, setTrashCount] = useState(0);

  return (
    <>
      {Platform.OS !== "web" || welcomeModalVisible ? (
        //Collect Popup Window
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={welcomeModalVisible}
          testID={"collect-modal"}
        >
          <WelcomeInfoModal closeModal={() => setWelcomeModalVisible(false)} />
        </Modal>
      ) : null}
      <View style={styles.container}>
        <View style={styles.top}>
          <SafeAreaView>
            <View style={styles.headerRow}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={styles.infoBtn}
                  onPress={() => setWelcomeModalVisible(true)}
                >
                  <Icon name="info" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
              <Image
                style={styles.appLogo}
                source={require("../../assets/pickit5.png")}
              />
              <UserLevel trashCount={trashCount} style={styles.userLevel} />
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.contents}>
          <TrashRegister onTrashCountChanged={setTrashCount} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  top: {
    backgroundColor: "#31A896",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  infoBtn: {
    marginLeft: 5,
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
