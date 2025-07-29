// components/home/ImagePreviewModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ImagePreviewModal({ 
  visible, 
  onClose, 
  imageUri, 
  imageSource,
  imageType, // 'scan' or 'repurpose'
  onSubmit 
}) {
  const handleSubmit = () => {
    console.log(`${imageType === 'scan' ? 'Scanning' : 'Uploading repurposed'} image:`, imageUri);
    console.log('Image source:', imageSource); // 'camera' or 'gallery'
    onSubmit();
    onClose();
  };

  const getModalTitle = () => {
    if (imageType === 'scan') {
      return 'Preview - Scan Material';
    } else {
      return 'Preview - Upload Creation';
    }
  };

  const getSubmitButtonText = () => {
    if (imageType === 'scan') {
      return 'Scan Material';
    } else {
      return 'Upload Creation';
    }
  };

  const getMessageText = () => {
    if (imageType === 'scan') {
      return 'This image will be analyzed to identify the material and provide recycling recommendations.';
    } else {
      return 'This creation will be added to your portfolio and can be shared in the marketplace.';
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>{getModalTitle()}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{getMessageText()}</Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              imageType === 'scan' ? styles.scanButton : styles.uploadButton
            ]} 
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>{getSubmitButtonText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: height * 0.5,
  },
  image: {
    width: width - 32,
    height: height * 0.5,
    borderRadius: 8,
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#4CAF50',
  },
  uploadButton: {
    backgroundColor: '#FF9800',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});