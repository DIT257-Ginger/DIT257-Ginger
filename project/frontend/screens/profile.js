
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Dimensions, Image, Button } from "react-native";
import Home from '../screens/home'
//const screenWidth = Math.round(Dimensions.get('window').width);
//const screenHeight = Math.round(Dimensions.get('window').height);
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons';

export default function Profile() {
    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View style={{ padding: 50 }}>
                    <Text style={{ fontSize: 30 }}>Anon</Text>
                    <Text style={{ fontSize: 20 }}>Lv. 8</Text>
                </View>
            </View>
            <View style={styles.middle}>
                <Text style={{ textAlign: "center" }}>Profile screen</Text>

            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgray",
        //alignItems: "center",
        //justifyContent: "center",

    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 150,
        borderBottomLeftRadius: 140,
        borderBottomRightRadius: 140,
    },
    middle: {
        flexDirection: 'column',
        //flex: 1,
        padding: 24,
        backgroundColor: 'lightgrey',

    },
    fillGarbage: {
        //flexDirection: 'row',
        alignSelf: "center",
        width: 250,
        height: 330
    },

    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        //bottom: -(screenHeight / 2.9),
        //height: 80,
        padding: 20,
        backgroundColor: 'lightblue'
    }
});
