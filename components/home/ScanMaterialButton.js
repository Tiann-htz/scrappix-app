// components/home/ScanMaterialButton.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScanMaterialPopup from './ScanMaterialPopup';
import ImagePreviewModal from './ImagePreviewModal';

export default function ScanMaterialButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSource, setImageSource] = useState(null);

  const handlePress = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleImageSelected = (imageAsset, source) => {
    setSelectedImage(imageAsset);
    setImageSource(source);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedImage(null);
    setImageSource(null);
  };

  const handleSubmit = async () => {
  try {
    // Save to Firebase database
    const { db, auth } = require('../../config/firebase');
    const { collection, addDoc, serverTimestamp } = require('firebase/firestore');
    
    const scannedMaterialData = {
      imageUri: selectedImage.uri,
      createdAt: serverTimestamp(),
      uploaderName: auth.currentUser?.displayName || auth.currentUser?.email || 'Unknown User',
      status: 'scanned',
      userId: auth.currentUser?.uid
    };

    await addDoc(collection(db, 'scannedMaterials'), scannedMaterialData);
    console.log('Scan material saved to database successfully!');
  } catch (error) {
    console.error('Error saving scanned material:', error);
  }
};

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="camera" size={24} color="#fff" />
      </TouchableOpacity>
      
      <ScanMaterialPopup 
        visible={showPopup} 
        onClose={handleClosePopup}
        onImageSelected={handleImageSelected}
      />

      <ImagePreviewModal
        visible={showPreview}
        onClose={handleClosePreview}
        imageUri={selectedImage?.uri}
        imageSource={imageSource}
        imageType="scan"
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});