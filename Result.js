/*import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://192.168.2.27:8000/api/'

const ResultScreen = ({ route }) => {
  const { imageUri } = route.params;
  const navigation = useNavigation();

  console.log('hello');
  if (imageUri) {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri.uri,
      type: 'image/jpeg', 
      name: 'photo.jpg', // Provide a name for the image.
    });
    axios.post(`${API_BASE_URL}predict`, formData)                   
    .then(response => {
      console.log('Photo Uploaded',response.data.result);
    })
    .catch(error => {
      console.error('Upload Error', error);
    })
  }

  
  const handleGoBack = () => {
    navigation.navigate('Homepage');
  };

  const handleSave = () => {
    // Implement the save functionality here
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imageAspectRatio = windowWidth / windowHeight;

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { aspectRatio: imageAspectRatio }]}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      // Space for ML model results 
      <View style={styles.resultsContainer}>
        // Add your ML model results here 
        <Text style={styles.resultsText}>ML Model Results</Text>
      </View>
      

      // Bottom buttons 
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 30,
    resizeMode: 'contain',
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsText: {
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResultScreen;


import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ResultScreen = ({ route }) => {
    const { imageUri, serverResponse } = route.params;

    return (
        <View style={styles.container}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
    
          <Text style={styles.resultText}>{serverResponse}</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f2f2f2',
    },
    previewImage: {
      width: 300,
      height: 400,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
  });
export default ResultScreen;

*/