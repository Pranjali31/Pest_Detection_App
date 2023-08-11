/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect} from 'react';
import axios from "axios";
import image from './assets/Signin.png'; // Update the import path if needed
import image1 from './assets/Rectangle 6.png';

export default function App() {
  const [users, setUsers] = useState([])
  useEffect(() =>{
    async function getAllUsers(){
      try {
        const users = await axios.get('http://127.0.0.1:8000/Pest_Detection/User/')
        console.log(users.data)
        setUsers(users.data)
      }
      catch (error){

      }
    }
    getAllUser()
  },[] )
  return (
    <View style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>
      <Image style={{ width: 393, height: 855, left: 0, top: 0, bottom:0, position: 'absolute' }} source={image} />
      <Text style={{ color: 'black', fontSize: 35,top:100,fontWeight: '800', textAlign: 'center', lineHeight: 15 }}>{`\n\n\nPEST DETECTION\n\n\n`}</Text>
      <Image style={{ width: 244, height: 369, position: 'relative', left:75, top:200 }} source={image1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: '#fcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet } from 'react-native';
import LoginPage from './Loginpage';
import HomePage from './Homepage';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './Registerpage';
import CaptureScreen from './Capture';
import PreviewScreen from './Preview';
//import ResultScreen from "./Result";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Capture"
          component={CaptureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 60000 milliseconds = 1 minute

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/homepage.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 390,
    height: 800,
  },
});







