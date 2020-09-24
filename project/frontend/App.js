import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {AppRegistry, StyleSheet, View, Button } from "react-native";
import React, {Component}  from "react";
import Home from "./src/screens/Home";
import Achievements from "./src/screens/Achievements";
import Login from "./src/screens/Login";
import UserSettings from "./src/screens/UserSettings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";



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
    <SafeAreaProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



