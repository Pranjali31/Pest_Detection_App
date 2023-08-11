import React from 'react';
import {  TouchableOpacity ,View, Button, StyleSheet, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  
  const handleLoadCaptureImages = () => {
    navigation.navigate('Capture');
  };

  const handleLoadPreviousResults = async() => {
    
      // Retrieve the saved image URI and ML results from AsyncStorage
     
  };


  return (
    <View style={styles.container}>
        <ImageBackground
            source={require('./assets/wp2.png')}
            style={styles.backgroundImage}
        >
            <TouchableOpacity style={styles.button} onPress={handleLoadCaptureImages}>
                <Text style={styles.buttonText}>Load or Capture Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLoadPreviousResults}>
                <Text style={styles.buttonText}>Load Previous Results</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 70,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,

  },
  Text: {
    width: 100,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative', 
    top: 20,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default HomePage;
