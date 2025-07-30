// components/home/RepurposedMaterialsContent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { db } from '../../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../../config/firebase';
import RepurposedMaterialCard from './RepurposedMaterialCard';

export default function RepurposedMaterialsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [repurposedMaterials, setRepurposedMaterials] = useState([]);

  useEffect(() => {
  const timer = setTimeout(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'repurposedMaterials'),
        where('userId', '==', auth.currentUser?.uid)
      ),
      (snapshot) => {
        const materials = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort in memory by creation date (newest first)
        const sortedMaterials = materials.sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0;
          return bTime - aTime;
        });
        
        setRepurposedMaterials(sortedMaterials);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching repurposed materials:', error);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, 1500);

  return () => clearTimeout(timer);
}, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Your repurposed material creations
        </Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9800" />
          <Text style={styles.loadingText}>Loading your creations...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Your repurposed material creations
        </Text>
        {repurposedMaterials.length === 0 ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              No repurposed materials yet. Use the camera button to add your first creation!
            </Text>
          </View>
        ) : (
          // Future: Display repurposed materials list
          <View>
            {repurposedMaterials.length === 0 ? (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>
      No repurposed materials yet. Use the camera button to add your first creation!
    </Text>
  </View>
) : (
  <View style={styles.materialsGrid}>
    {repurposedMaterials.map((material) => (
      <RepurposedMaterialCard
        key={material.id}
        material={material}
        onDelete={(materialId) => {
          setRepurposedMaterials(prev => prev.filter(m => m.id !== materialId));
        }}
        onUpdate={(updatedMaterial) => {
          setRepurposedMaterials(prev => 
            prev.map(m => m.id === updatedMaterial.id ? updatedMaterial : m)
          );
        }}
      />
    ))}
  </View>
)}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  materialsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingVertical: 10,
},
});