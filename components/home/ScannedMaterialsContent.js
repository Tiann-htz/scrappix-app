// components/home/ScannedMaterialsContent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { db } from '../../config/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../../config/firebase';
import ScannedMaterialCard from './ScannedMaterialCard';

export default function ScannedMaterialsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [scannedMaterials, setScannedMaterials] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'scannedMaterials'),
          where('userId', '==', auth.currentUser?.uid)
        ),
        (snapshot) => {
          const materials = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          const sortedMaterials = materials.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0;
            return bTime - aTime;
          });
          
          setScannedMaterials(sortedMaterials);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error fetching scanned materials:', error);
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading your scanned materials...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {scannedMaterials.length === 0 ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              No scanned materials yet. Use the camera button to scan your first material!
            </Text>
          </View>
        ) : (
          <View style={styles.materialsGrid}>
            {scannedMaterials.map((material) => (
              <ScannedMaterialCard
                key={material.id}
                material={material}
                onDelete={(materialId) => {
                  setScannedMaterials(prev => prev.filter(m => m.id !== materialId));
                }}
              />
            ))}
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