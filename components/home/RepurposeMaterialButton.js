// components/home/RepurposeMaterialButton.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RepurposeMaterialPopup from './RepurposeMaterialPopup';
import ImagePreviewModal from './ImagePreviewModal';

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

  const handleSubmit = () => {
    console.log('Repurposed material uploaded successfully!');
    // Future: Add to repurposed materials list
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

      <ImagePreviewModal
        visible={showPreview}
        onClose={handleClosePreview}
        imageUri={selectedImage?.uri}
        imageSource={imageSource}
        imageType="repurpose"
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