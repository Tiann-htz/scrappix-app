// components/home/RepurposedMaterialsContent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function RepurposedMaterialsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [repurposedMaterials, setRepurposedMaterials] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For now, keep empty array until we implement actual data loading
      setRepurposedMaterials([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Creations</Text>
        <Text style={styles.subtitle}>
          Your repurposed materials and creations
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
        <Text style={styles.title}>My Creations</Text>
        <Text style={styles.subtitle}>
          Your repurposed materials and creations
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