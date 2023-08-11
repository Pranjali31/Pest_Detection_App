import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomePage from './Homepage';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://192.168.2.27:8000/api/'

// Function to get the CSRF token from Django backend
const getCSRFToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}csrf/`);
    return response.data.csrfToken;
  } 
  catch (error) {
     console.error('Axios Error:', error);
     throw error;
  }
};

const loginUser = async (userData) =>{
 
// Make a POST request to the registration endpoint of Django REST API

const csrfToken = await getCSRFToken()
   try{
     const response = await axios.post(`${API_BASE_URL}user/login/`, userData, {
       headers: {
       'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
       },
     })
     return response;
   }
   catch (error) {
     console.error(error);
     throw error;
   }
};

const LoginPage = () => {
  const navigation = useNavigation() // Access the navigation object

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')  
  
  const isValidEmail = (email) => {
    // Regular expression pattern to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  const handleLogin = async() => {
    if (email && password) {

      // Check email structure
      if (!isValidEmail(email)) {
        console.log('Invalid email format');
        return;
      }
        // Check password length
        if (password.length < 6) {
        console.log('Password must be at least 6 characters long');
        return;
        }
    } 
    else {
      console.log('Invalid credentials');
    }
  
    try{
      const userData = {
        email: email,
        password: password,
      }
       
      const response = await loginUser(userData);
      if (response.status === 200) {
        
        // Handle the successful login...
        Alert.alert('Login Successful!');
        console.log('Login successful');

        // Save the JWT tokens in AsyncStorage or Redux store
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const token = response.data.csrfToken;
        
        // Save the tokens in AsyncStorage or Redux store
        AsyncStorage.setItem('accessToken', accessToken);
        AsyncStorage.setItem('refreshToken', refreshToken);
        AsyncStorage.setItem('token', token);
       
        navigation.navigate('Homepage');
      }
    }
    catch(error) {
      //Handle any errors
      console.error('Login failed:', error);
    }
  };

  const handleRegister = () => {
    // Custom logic for handling registration
    // Example: Call an API to register the user

    // Navigate to the register page
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/wp2.png')}
        style={styles.backgroundImage}
      >
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add background color with transparency
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 45,
  },
  buttonText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
