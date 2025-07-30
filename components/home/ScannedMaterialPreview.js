// components/home/ScannedMaterialPreview.js
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
            <View style={styles.detailsCard}>
              <Text style={styles.cardTitle}>Material Details</Text>
              
              <View style={styles.detailItem}>
                <View style={styles.detailHeader}>
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                  <Text style={styles.detailLabel}>Status</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{material.status}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <View style={styles.detailHeader}>
                  <Ionicons name="person" size={18} color="#666" />
                  <Text style={styles.detailLabel}>Scanned by</Text>
                </View>
                <Text style={styles.detailValue}>{material.uploaderName}</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});