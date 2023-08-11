

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.2.27:8000/api/'

const CaptureScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [mlModelResults, setMlModelResults] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: photo.uri,
          type: 'image/jpeg', // Adjust the type based on the image format
          name: 'image.jpg', // Replace 'image.jpg' with a suitable name
        });

        // Replace 'YOUR_ML_MODEL_API_ENDPOINT' with the actual ML model API endpoint
        const response = await axios.post(`${API_BASE_URL}predict/`, formData);
        const mlModelResults = response.data.pest_detected

        // Store the ML model results in state
        setMlModelResults(mlModelResults);
        setCapturedImage(photo);
        navigation.navigate('Preview', { imageUri: photo.uri, mlModelResults });
      }
      catch (error) {
        console.error('Error while sending API request:', error);
        // Handle error (e.g., display an error message)
      }
      
    }
  };

  const sendImageToMLModel = async (photo) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: photo.assets[0].uri,
        type: 'image/jpeg', // Adjust the type based on the image format
        name: 'image.jpg', // Replace 'image.jpg' with a suitable name
      });

      // Replace 'YOUR_ML_MODEL_API_ENDPOINT' with the actual ML model API endpoint
      const response = await axios.post(`${API_BASE_URL}predict/`, formData);

      // Extract the ML model result from the response data
      const mlModelResults = response.data.pest_detected;

      // Store the ML model results in state
      setMlModelResults(mlModelResults);
    } catch (error) {
      console.error('Error while sending API request:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleLoadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      sendImageToMLModel(result);
      setCapturedImage(result);
      navigation.navigate('Preview', { imageUri: result.uri, mlModelResults});
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Homepage');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const cameraRatio = (windowHeight*0.70) / windowWidth;

  return (
    <View style={styles.container}>
      <Camera style={{flex : 1, aspectRatio:1}} type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)} ratio={'1:1'}/>

      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLoadFromGallery}>
          <Text style={styles.buttonText}>Load from Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const PreviewScreen = ({ route }) => {
  const { imageUri } = route.params;

  return (
    <View style={styles.previewContainer}>
      <Image source={{ uri: imageUri }} style={styles.previewImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  camera: {
    flex:1,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export { CaptureScreen, PreviewScreen };
export default CaptureScreen;
