// components/home/ScannedMaterialPreview.js
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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

export default function ScannedMaterialPreview({ visible, onClose, material, onDelete }) {
  if (!material) return null;

  const handleDelete = () => {
    Alert.alert(
      'Delete Material',
      'Are you sure you want to delete this scanned material?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'scannedMaterials', material.id));
              onDelete(material.id);
              onClose();
              console.log('Material deleted successfully');
            } catch (error) {
              console.error('Error deleting material:', error);
              Alert.alert('Error', 'Failed to delete material. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'Unknown date and time';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <Text style={styles.title}>Scanned Material</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: material.imageUri }} style={styles.image} resizeMode="contain" />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{material.status}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Scanned by:</Text>
              <Text style={styles.value}>{material.uploaderName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Date & Time:</Text>
              <Text style={styles.value}>{formatDateTime(material.createdAt)}</Text>
            </View>
          </View>
        </ScrollView>
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
  deleteButton: {
    padding: 4,
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
    minHeight: height * 0.4,
  },
  image: {
    width: width - 32,
    height: height * 0.4,
    borderRadius: 8,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 12,
    minWidth: 80,
  },
  value: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});