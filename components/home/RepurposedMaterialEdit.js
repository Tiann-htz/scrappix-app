// components/home/RepurposedMaterialEdit.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function RepurposedMaterialEdit({ visible, onClose, material, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (material && visible) {
      setName(material.name || '');
      setType(material.type || '');
      setDesignStyle(material.designStyle || '');
      setErrors({});
    }
  }, [material, visible]);

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

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const updatedData = {
        name: name.trim(),
        type: type.trim(),
        designStyle: designStyle.trim(),
      };

      await updateDoc(doc(db, 'repurposedMaterials', material.id), updatedData);
      
      // Create updated material object for local state update
      const updatedMaterial = {
        ...material,
        ...updatedData
      };
      
      onSave(updatedMaterial);
      console.log('Repurposed material updated successfully');
    } catch (error) {
      console.error('Error updating repurposed material:', error);
      Alert.alert('Error', 'Failed to update creation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      // Reset form when closing
      setName('');
      setType('');
      setDesignStyle('');
      setErrors({});
      onClose();
    }
  };

  if (!material) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleClose}
            disabled={isLoading}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Creation</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Edit Creation Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Creation Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={setName}
                placeholder="e.g., Plastic Bottle Planter"
                placeholderTextColor="#999"
                editable={!isLoading}
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
                editable={!isLoading}
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
                editable={!isLoading}
              />
              {errors.designStyle && <Text style={styles.errorText}>{errors.designStyle}</Text>}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={handleClose}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Text>
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
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF9800',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#FFB74D',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});