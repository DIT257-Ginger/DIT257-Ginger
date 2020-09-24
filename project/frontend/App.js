import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import React from "react";
import Home from "./screens/Home";
import Achievements from "./screens/Achievements";
import Login from "./screens/Login";
import UserSettings from "./screens/UserSettings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#11402B",
        inactiveTintColor: "white",
        style: {
          height: 55,
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
            <Icon name="home" color={color} size={30} />
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
            <Icon name="podium" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon name="login" color={color} size={30} />
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
            <Icon name="account" color={color} size={30} />
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
      <MyTabs />
    </NavigationContainer>
  );
}
