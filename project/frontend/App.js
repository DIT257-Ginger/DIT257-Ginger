import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';
import Collect from './components/Collect';
import Achievements from './components/Achievements';
import UserSettings from './components/UserSettings';
import Login from './components/Login';

//import * as React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';

const RootStack = createStackNavigator()

/*export default function App() {
  return (
    <NavigationContainer>{-- Rest of your app code --}</NavigationContainer>
  );
}*/

export default function App() {
  return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Collect" component={Collect} />
          <RootStack.Screen name="UserSettings" component={UserSettings} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Achievements" component={Achievements} />
        </RootStack.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});
