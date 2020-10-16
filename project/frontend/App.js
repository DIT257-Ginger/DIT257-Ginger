import "react-native-gesture-handler";
import "react-native-get-random-values"; // Needed for uuids
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./src/screens/Home";
import { Achievements } from "./src/screens/Achievements";
import Analytics from "./src/screens/Analytics";
import History from "./src/screens/History";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Iconn from "react-native-vector-icons/Entypo";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Localization from "expo-localization";
import moment from "moment";
import ProgressNotification from "./src/components/ProgressNotification";

// Setup locale for date and time formatting
moment.locale(Localization.locales);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
      <ProgressNotification />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "rgba(0,0,0,0.5)",
          inactiveTintColor: "white",
          style: {
            paddingTop: 5,
            paddingBottom: 8,
            height: 70,
            backgroundColor: "#31A896",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Collect",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={40} />
            ),
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={Achievements}
          options={{
            tabBarLabel: "Achievements",
            tabBarIcon: ({ color, size }) => (
              <IconFA5 name="medal" color={color} size={38} />
            ),
          }}
        />

        <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            tabBarLabel: "Analytics",
            tabBarIcon: ({ color, size }) => (
              <Iconn name="bar-graph" color={color} size={40} />
            ),
          }}
        />

        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" color={color} size={40} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
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
