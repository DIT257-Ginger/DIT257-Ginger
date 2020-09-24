import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {AppRegistry, StyleSheet, View, Button } from "react-native";
import React, {Component}  from "react";
import Home from "./screens/Home";
import Achievements from "./screens/Achievements";
import Login from "./screens/Login";
import UserSettings from "./screens/UserSettings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import TrashRegister from "./src/components/TrashRegister";
import { shareImage, shareText } from "./src/sharing";
import { Asset } from "expo-asset";


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#11402B",
        inactiveTintColor: "white",
        style: {
          paddingTop: "2%",
          paddingBottom: "5%",
          height: "12%",
          backgroundColor: "#31A896",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={40} />
            //30 eller size
          ),
        }}
      />

      <Tab.Screen
        name="Achievements"
        component={Achievements}
        options={{
          tabBarLabel: "Achievements",
          tabBarIcon: ({ color, size }) => (
            <Icon name="podium" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon name="login" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="UserSettings"
        //Profile eller Usere settings
        component={UserSettings}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={40} />
            //account-cog account-circle
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <TrashRegister />
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Brag with image!"
          onPress={() =>
            shareImage(
              Asset.fromModule(require("./assets/trash.png")).uri,
              "Share your trash!"
            )
          }
        />
        <Button
          style={styles.button}
          title="Brag with text!"
          onPress={() =>
            shareText("I have collected so much trash, look at it!")
          }
        />
      </View>
    </View>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    margin: 10,
  },
});
