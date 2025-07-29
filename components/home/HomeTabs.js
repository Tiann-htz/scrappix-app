// components/home/HomeTabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeTabs({ activeTab, onTabChange }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'scanned' && styles.activeTab
        ]}
        onPress={() => onTabChange('scanned')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'scanned' && styles.activeTabText
        ]}>
          Scanned Materials
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'repurposed' && styles.activeTab
        ]}
        onPress={() => onTabChange('repurposed')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'repurposed' && styles.activeTabText
        ]}>
          My Creations
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});