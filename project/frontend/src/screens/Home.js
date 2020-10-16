import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
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
import TrashRegister from "../components/TrashRegister";
import UserLevel from "../components/UserLevel";
import WelcomeInfoModal from "../components/WelcomeInfoModal";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation }) {
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
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
        <ScreenHeader style={styles.header}>
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
        </ScreenHeader>
        <View style={styles.contents}>
          <TrashRegister onTrashCountChanged={setTrashCount} navigation = {navigation} />
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
  header: {
    // Override default padding and rounding of ScreenHeader
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
