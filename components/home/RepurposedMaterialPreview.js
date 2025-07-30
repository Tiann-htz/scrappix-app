// components/home/RepurposedMaterialPreview.js
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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import RepurposedMaterialEdit from './RepurposedMaterialEdit';

const { width, height } = Dimensions.get('window');

export default function RepurposedMaterialPreview({ visible, onClose, material, onDelete, onUpdate }) {
  const [showEditModal, setShowEditModal] = useState(false);

  if (!material) return null;

  const handleDelete = () => {
    Alert.alert(
      'Delete Creation',
      'Are you sure you want to delete this repurposed material?',
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
              await deleteDoc(doc(db, 'repurposedMaterials', material.id));
              onDelete(material.id);
              onClose();
              console.log('Repurposed material deleted successfully');
            } catch (error) {
              console.error('Error deleting repurposed material:', error);
              Alert.alert('Error', 'Failed to delete creation. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleEditSave = (updatedMaterial) => {
    onUpdate(updatedMaterial);
    setShowEditModal(false);
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
    <>
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
            <Text style={styles.title}>My Creation</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Ionicons name="create-outline" size={24} color="#FF9800" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Ionicons name="trash" size={24} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: material.imageUri }} style={styles.image} resizeMode="contain" />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.nameCard}>
                <Text style={styles.creationName}>{material.name}</Text>
              </View>

              <View style={styles.detailsCard}>
                <Text style={styles.cardTitle}>Creation Details</Text>
                
                <View style={styles.detailItem}>
                  <View style={styles.detailHeader}>
                    <Ionicons name="shapes" size={18} color="#FF9800" />
                    <Text style={styles.detailLabel}>Type</Text>
                  </View>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{material.type}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailHeader}>
                    <Ionicons name="brush" size={18} color="#9C27B0" />
                    <Text style={styles.detailLabel}>Design Style</Text>
                  </View>
                  <View style={styles.designBadge}>
                    <Text style={styles.designText}>{material.designStyle}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailHeader}>
                    <Ionicons name="person" size={18} color="#666" />
                    <Text style={styles.detailLabel}>Created by</Text>
                  </View>
                  <Text style={styles.detailValue}>{material.creatorName}</Text>
                </View>

                <View style={[styles.detailItem, styles.lastDetailItem]}>
                  <View style={styles.detailHeader}>
                    <Ionicons name="time" size={18} color="#666" />
                    <Text style={styles.detailLabel}>Date & Time</Text>
                  </View>
                  <Text style={styles.detailValue}>{formatDateTime(material.createdAt)}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <RepurposedMaterialEdit
        visible={showEditModal}
        onClose={handleEditClose}
        material={material}
        onSave={handleEditSave}
      />
    </>
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 4,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  nameCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  creationName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  lastDetailItem: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 15,
    color: '#212529',
    lineHeight: 20,
  },
  typeBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  typeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  designBadge: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  designText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});