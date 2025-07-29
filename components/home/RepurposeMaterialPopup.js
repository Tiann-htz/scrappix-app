// components/home/RepurposeMaterialPopup.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  TouchableWithoutFeedback,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function RepurposeMaterialPopup({ visible, onClose, onImageSelected }) {
  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return {
      camera: cameraPermission.status === 'granted',
      gallery: galleryPermission.status === 'granted'
    };
  };

  const handleTakePhoto = async () => {
    try {
      const permissions = await requestPermissions();
      
      if (!permissions.camera) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        console.log('Photo taken for repurposed material:', result.assets[0].uri);
        onImageSelected(result.assets[0], 'camera');
        onClose();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      const permissions = await requestPermissions();
      
      if (!permissions.gallery) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        console.log('Image selected from gallery for repurposed material:', result.assets[0].uri);
        onImageSelected(result.assets[0], 'gallery');
        onClose();
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <Text style={styles.title}>Add Repurposed Material</Text>
              
              <TouchableOpacity 
                style={styles.option} 
                onPress={handleTakePhoto}
              >
                <Ionicons name="camera" size={24} color="#FF9800" />
                <Text style={styles.optionText}>Take Photo of Creation</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.option} 
                onPress={handleChooseFromGallery}
              >
                <Ionicons name="images" size={24} color="#FF9800" />
                <Text style={styles.optionText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});