import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as trashCollection from "../features/trashCollection";
import { readCollectedTrash } from "../persistence";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const trashTypesById = trashCollection
  .getTrashTypes()
  .reduce((trashValObj, type) => {
    trashValObj[type.id] = type;
    return trashValObj;
  }, {});

export default function TrashHistoryList({ ...props }) {
  const [collectedTrash, setCollectedTrash] = useState([]);

  useEffect(() => {
    loadCollectedTrash();
  }, []);

  async function loadCollectedTrash() {
    const trash = await readCollectedTrash();
    setCollectedTrash(trash);
  }

  async function deleteTrash(id) {
    console.log(id);
    await trashCollection.undoCollect(id);
    await loadCollectedTrash();
  }

  const displayedTrash = collectedTrash.map((entry) => ({
    id: entry.id,
    name: trashTypesById[entry.type].name,
    amount: entry.amount,
    time: new Date(entry.time),
    icon: trashTypesById[entry.type].image,
  }));

  return (
    <FlatList
      {...props}
      data={displayedTrash}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrashRow
          name={item.name}
          amount={item.amount}
          time={item.time}
          icon={item.icon}
          onDeletePressed={() => deleteTrash(item.id)}
        />
      )}
    />
  );
}

const TrashRow = ({ name, amount, time, icon, onDeletePressed }) => (
  <View style={styles.trashRow}>
    <View style={styles.trashIconContainer}>
      <Image source={icon} style={styles.trashIcon} />
    </View>
    <View style={styles.trashInfoContainer}>
      <View style={styles.trashInfoTopRow}>
        <Text style={styles.trashAmount}>{amount}</Text>
        <Text style={styles.trashName}>{name}</Text>
      </View>
      <Text style={styles.trashTime}>{moment(time).calendar()}</Text>
    </View>
    <TouchableOpacity style={styles.undoButton} onPress={onDeletePressed}>
      <Icon name={"delete"} color={"white"} size={20} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  trashRow: {
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
    marginVertical: 3,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: "#31A896",
    borderRadius: 40,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android shadow
    elevation: 4,
  },
  trashIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
  },
  trashIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  trashInfoContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 2,
  },
  trashInfoTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  trashAmount: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
  trashName: {
    marginLeft: 5,
    fontSize: 20,
    lineHeight: 20,
    color: "white",
  },
  trashTime: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 10,
    color: "rgba(0,0,0,0.75)",
  },
  undoButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 1000,
  },
});
