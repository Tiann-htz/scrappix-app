// components/home/RepurposeMaterialButton.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RepurposeMaterialPopup from './RepurposeMaterialPopup';
import ImagePreviewModal from './ImagePreviewModal';
import RepurposePreviewModal from './RepurposePreviewModal';

export default function RepurposeMaterialButton() {
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

  const handleSubmit = async (repurposeData) => {
  try {
    const { db, auth } = require('../../config/firebase');
    const { collection, addDoc, serverTimestamp } = require('firebase/firestore');
    
    const repurposedMaterialData = {
      imageUri: selectedImage.uri,
      createdAt: serverTimestamp(),
      creatorName: auth.currentUser?.displayName || auth.currentUser?.email || 'Unknown User',
      userId: auth.currentUser?.uid,
      name: repurposeData.name,
      type: repurposeData.type,
      designStyle: repurposeData.designStyle
    };

    await addDoc(collection(db, 'repurposedMaterials'), repurposedMaterialData);
    console.log('Repurposed material saved to database successfully!');
  } catch (error) {
    console.error('Error saving repurposed material:', error);
  }
};

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      
      <RepurposeMaterialPopup 
        visible={showPopup} 
        onClose={handleClosePopup}
        onImageSelected={handleImageSelected}
      />

      <RepurposePreviewModal
  visible={showPreview}
  onClose={handleClosePreview}
  imageUri={selectedImage?.uri}
  imageSource={imageSource}
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
    backgroundColor: '#FF9800',
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