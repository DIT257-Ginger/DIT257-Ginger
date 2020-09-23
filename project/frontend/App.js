import 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Button, SafeAreaView } from "react-native";
import React from "react";
import Home from './screens/Home';
import Achievements from './screens/Achievements';
import Login from './screens/Login';
import UserSettings from './screens/UserSettings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'brown',
        style: {
          height: 55,
          backgroundColor: 'lightblue'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Achievements"
        component={Achievements}
        options={{
          tabBarLabel: 'Achievements',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          tabBarLabel: 'UserSettings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="share-variant" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//const Stack = createStackNavigator();



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

