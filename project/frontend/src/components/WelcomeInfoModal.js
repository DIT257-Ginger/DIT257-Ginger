import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function WelcomeInfoModal({ closeModal = () => {} }) {
  const [page, setPage] = useState(0);

  const PAGES = [
    <>
      <Image style={styles.logo} source={require("../../assets/pickit5.png")} />
      <Text style={styles.titleText}>Welcome to Pick It!</Text>
      <Text style={styles.titleText}>Nice to see you here</Text>
      <View style={styles.infoBox}>
        <Text style={styles.paragraph}>
          Pick It contributes to cleaner environment. You are
          able to collect the trash, register number of collected bags, keep the
          track of your performance and at the end receive different type of
          rewards.
        </Text>
      </View>
    </>,
    <>
      <Image
        style={styles.logo}
        source={require("../../assets/trashAchievementImages/rubbishrecycler.png")}
      />
      <View style={styles.infoBox}>
        <Text style={styles.titleText}>Recycler</Text>
        <Text style={styles.paragraph}>
          Let’s take country recycling revolution one step further and turn
          trash into the new products. You will contribute to a zero waste
          sociality. Plastic bottles and aluminium cans are separated from the
          trash and recycled in nearest recycling station.
        </Text>
      </View>
    </>,
  ];

  function onNextPressed() {
    if (page === PAGES.length - 1) {
      closeModal();
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <View style={styles.modalBackground}>
      <View style={styles.pageContainer}>{PAGES[page]}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navBtn} onPress={onNextPressed}>
          <Text style={styles.btnText}>
            <Icon name="navigate-next" color={"white"} size={40} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  titleText: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  infoBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,

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
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 20,
    justifyContent: "flex-end",
  },
  navBtn: {
    padding: 10,
    aspectRatio: 1,
    justifyContent: "center",
    backgroundColor: "#2196F3",
    borderRadius: 1000,
    elevation: 2,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
