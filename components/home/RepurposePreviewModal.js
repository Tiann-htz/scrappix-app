// components/home/RepurposePreviewModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function RepurposePreviewModal({ 
  visible, 
  onClose, 
  imageUri, 
  imageSource,
  onSubmit 
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Creation name is required';
    }
    if (!type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!designStyle.trim()) {
      newErrors.designStyle = 'Design style is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const repurposeData = {
        name: name.trim(),
        type: type.trim(),
        designStyle: designStyle.trim()
      };
      
      onSubmit(repurposeData);
      
      // Reset form
      setName('');
      setType('');
      setDesignStyle('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setName('');
    setType('');
    setDesignStyle('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Upload Creation</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Creation Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Creation Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={setName}
                placeholder="e.g., Plastic Bottle Planter"
                placeholderTextColor="#999"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type/Category *</Text>
              <TextInput
                style={[styles.input, errors.type && styles.inputError]}
                value={type}
                onChangeText={setType}
                placeholder="e.g., Storage, Toy, Decoration"
                placeholderTextColor="#999"
              />
              {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Design Style *</Text>
              <TextInput
                style={[styles.input, errors.designStyle && styles.inputError]}
                value={designStyle}
                onChangeText={setDesignStyle}
                placeholder="e.g., Minimalist, Modern, Rustic"
                placeholderTextColor="#999"
              />
              {errors.designStyle && <Text style={styles.errorText}>{errors.designStyle}</Text>}
            </View>

            <Text style={styles.messageText}>
              This creation will be added to your portfolio and can be shared in the marketplace.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Upload Creation</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: height * 0.3,
  },
  image: {
    width: width - 32,
    height: height * 0.3,
    borderRadius: 8,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF5252',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginTop: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF9800',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});