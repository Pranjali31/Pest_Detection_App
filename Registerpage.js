import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const registerUser = async (userData) =>{
    
    // Make a POST request to the registration endpoint of Django REST API

    const csrfToken = await getCSRFToken()
    try{
      const response = await axios.post(`${API_BASE_URL}user/registration/`, userData, {
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
        },
      })
      return response.data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }

};

const RegisterPage = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const isValidEmail = (email) => {
    // Regular expression pattern to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    // Validate the form data
    if (email && firstName && lastName && password && password === confirmPassword) {
     
        // Check email structure
        if (!isValidEmail(email)) {
        console.log('Invalid email format');
        return;}

        // Check password length
        if (password.length < 6) {
        console.log('Password must be at least 6 characters long');
        return;}
    }
    
    else {
        console.log('Invalid form data');
    }

    // Create an object with the user registration data
    try {
      const userData = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      const response = await registerUser(userData);
      console.log(response);
      Alert.alert('You have successfully registered :)');

      // Navigate back to the login page
      navigation.navigate('Login');
    }
    catch(error){
      Alert.alert('Registration Failed :(',' Try again');
    }  
  }
 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/wp2.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.heading}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: 'black',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterPage;