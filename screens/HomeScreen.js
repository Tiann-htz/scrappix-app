// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainTabNavigator from '../components/MainTabNavigator';
import HomeTabs from '../components/home/HomeTabs';
import ScannedMaterialsContent from '../components/home/ScannedMaterialsContent';
import RepurposedMaterialsContent from '../components/home/RepurposedMaterialsContent';
import ScanMaterialButton from '../components/home/ScanMaterialButton';
import RepurposeMaterialButton from '../components/home/RepurposeMaterialButton';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('scanned');

  const renderContent = () => {
    switch (activeTab) {
      case 'scanned':
        return <ScannedMaterialsContent />;
      case 'repurposed':
        return <RepurposedMaterialsContent />;
      default:
        return <ScannedMaterialsContent />;
    }
  };

  const renderCameraButton = () => {
    if (activeTab === 'scanned') {
      return <ScanMaterialButton />;
    } else {
      return <RepurposeMaterialButton />;
    }
  };

  return (
    <MainTabNavigator>
      <View style={styles.container}>
        <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <View style={styles.content}>
          {renderContent()}
        </View>
        <View style={styles.cameraButtonContainer}>
          {renderCameraButton()}
        </View>
      </View>
    </MainTabNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
});