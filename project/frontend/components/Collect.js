import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Collect({navigaton}) { //Homepage
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 100, backgroundColor: "#ADD8E6"}}>
        <Button
          title="Collect"
          onPress={() => navigation.navigate('Collect')}
        />
        <Button
          title="Achievements"
          onPress={() => navigation.navigate('Achievements')}
        />
        <Button
          title="UserSettings"
          onPress={() => navigation.navigate('UserSettings')}
        />
      </View>

      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

