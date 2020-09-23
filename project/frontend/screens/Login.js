import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';


export default function Login({navigaton}) {
  return (
      /*
    <View style={styles.container}>
      <Image source={require('./../assets/loginlogo.png')} style={{ width: 130, height: 120 }}/>
      <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                      <TextInput placeholder="Username:" style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Test" style={{justifyContent: 'flex-end',}} />
                    </View>
                </View>
      
      <Text>Username:</Text>
      <TextInput
        style={{
          height: 25,
          width: 120,
          color: 'gray',
          borderColor: 'gray',
          borderWidth: 1
        }}
      />

      <Text>Password:</Text>
      <TextInput
        style={{
          height: 25,
          width: 120,
          color: 'gray',
          borderColor: 'gray',
          borderWidth: 1
        }}
      />

      <Text>Login Button</Text>
      <Text>Sign Up Button</Text>
      <Text>Facebook Button</Text>
      <Text>Instagram Button</Text>
      
      <Button
        title="Press me"
        backgroundColor="#f194ff"
        borderColor='red'
        color='red'
        onPress={() => navigator.navigate}
      />

      <StatusBar style="auto" />
      
    </View>*/
<View style={styles.container}>

        
        <View style={{ paddingBottom: 40}}>
            <Image source={require('./../assets/loginlogo.png')} style={{ width: 130, height: 120 }}/>
        </View>
        
        
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

  
      </View>

  );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ADD8E6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:'white',
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white"
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:'green',
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    },
    loginLogo:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingBottom: '100'
    },
  });