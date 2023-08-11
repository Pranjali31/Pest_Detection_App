/*import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.2.27:8000/api/'

const PreviewScreen = ({ route }) => {
  const { imageUri } = route.params;
  const navigation = useNavigation();

  const handleConfirm = () => {
    
    if (imageUri) {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri.uri,
        type: 'image/jpeg', 
        name: 'photo.jpg', // Provide a name for the image.
      });
      axios.post(`${API_BASE_URL}predict/`, formData)                   
      .then(response => {
        console.log('Photo Uploaded',response.data.result);
      })
      .catch(error => {
        console.error('Upload Error', error);
      })
    }

   // navigation.navigate('Result',{result:imageUri.uri});
  };

  const handleRetake = () => {
    // Navigate back to the camera screen.
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      // Bottom buttons 
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
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
    marginBottom: 10,
  },
  image: {
      width: 500,
      height: 800,
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
    marginBottom: 70,
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

export default PreviewScreen;


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useNavigation, useState} from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.2.27:8000/api/'

const PreviewScreen = ({ route, navigation}) => {
  const { imageUri } = route.params;
  const [serverResponse, setServerResponse] = useState();


  const handleConfirm = (imageUri) => {
    if(imageUri){
      const formData = new FormData();
      formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    axios
      .post(`${API_BASE_URL}predict/`, formData)
      .then(response => {
        console.log('Photo Uploaded', response.data.result);
        setServerResponse(response.data.result);
        navigation.navigate('Result', { imageUri: imageUri, serverResponse: response.data.result });
      })

      .catch(error => {
        console.error('Upload Error', error);
      });
    }
  };
  

  const handleRetake = () => {
    navigation.goBack();
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imageAspectRatio = windowWidth / windowHeight;

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { aspectRatio: imageAspectRatio }]}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleConfirm(imageUri)}>
          <Text style={styles.buttonText}>Confirm</Text>
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

export default PreviewScreen;
*/

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const PreviewScreen = ({ route }) => {
  const { imageUri, mlModelResults} = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Homepage');
  };

  const handleSave = async() => {
    
    try {
      // Save the image URI and ML results to AsyncStorage
      await AsyncStorage.setItem('savedImageUri', imageUri);
      await AsyncStorage.setItem('savedMLResults', JSON.stringify(mlModelResults));

      // Show a confirmation message
      alert('Image and ML result saved within the app!');
    } 
    catch (error) {
      console.error('Error while saving within the app:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imageAspectRatio = windowWidth / windowHeight;

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { aspectRatio: imageAspectRatio }]}>
        <Image source={{ uri: imageUri }} style={styles.image}  resizeMode="contain"/>
      </View>

      {/*  */}
      <View style={styles.resultsContainer}>
        {/* */}
        <Text style={styles.resultsText}>Detected Pest:</Text>
        <Text style={styles.resultsText}>{mlModelResults ? (mlModelResults) : "corn borer"}</Text>
      </View>

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
    marginTop: 20,
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
    fontSize: 25,
    bottom: 35
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 120,
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

export default PreviewScreen;