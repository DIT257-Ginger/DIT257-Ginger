import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import Achievements from "./Achievements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  return (
    //safeareaview seer lite skumt ut med background color?
    
    <SafeAreaView style={{flex: 1}} backgroundColor="#fff" edges={['right', 'top', 'left']}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ paddingTop: 12, paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Anon</Text>
            <Text style={{ fontSize: 20 }}>Lv. 8</Text>
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={{ textAlign: "center" }}>Home screen</Text>
          <Image
            style={styles.fillGarbage}
            source={require("../assets/idleGif.gif")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#8EE1FF",
  },
  top: {
    flexDirection: "row",
    backgroundColor: "#31A896",
    height: 100,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  middle: {
    //flexDirection: "column",
    alignItems: "stretch",
  },
  fillGarbage: {
    alignSelf: "center",
    width: 200,
    height: 460,
  },
});
