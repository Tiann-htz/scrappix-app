// components/home/RepurposedMaterialCard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import RepurposedMaterialPreview from './RepurposedMaterialPreview';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with margins

export default function RepurposedMaterialCard({ material, onDelete, onUpdate }) {
  const [showPreview, setShowPreview] = useState(false);

  const handleCardPress = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <Image source={{ uri: material.imageUri }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.nameText} numberOfLines={2}>{material.name}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{material.type}</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(material.createdAt)}</Text>
        </View>
      </TouchableOpacity>

      <RepurposedMaterialPreview
        visible={showPreview}
        onClose={handleClosePreview}
        material={material}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    minHeight: 34, // Ensures consistent height for 2 lines
  },
  typeBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});