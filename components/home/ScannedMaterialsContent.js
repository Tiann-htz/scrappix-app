// components/home/ScannedMaterialsContent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function ScannedMaterialsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [scannedMaterials, setScannedMaterials] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For now, keep empty array until we implement actual data loading
      setScannedMaterials([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scanned Materials</Text>
        <Text style={styles.subtitle}>
          Your scanned materials will appear here
        </Text>
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
        <Text style={styles.title}>Scanned Materials</Text>
        <Text style={styles.subtitle}>
          Your scanned materials will appear here
        </Text>
        {scannedMaterials.length === 0 ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              No scanned materials yet. Use the camera button to scan your first material!
            </Text>
          </View>
        ) : (
          // Future: Display scanned materials list
          <View>
            {/* Materials will be displayed here */}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
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
});