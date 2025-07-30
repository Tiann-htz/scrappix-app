// components/MainTabNavigator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import SideDrawer from './SideDrawer';
import DropdownMenu from './DropdownMenu';

export default function MainTabNavigator({ children }) {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Tutorials', icon: 'library' },
    { name: 'Marketplace', icon: 'storefront' },
    { name: 'Chat', icon: 'chatbubbles' },
    { name: 'Disposal', icon: 'trash-bin' },
    
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowSideDrawer(true)}
        >
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.userButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{user?.fullName}</Text>
            <View style={styles.userIconContainer}>
              <Ionicons name="person-circle" size={28} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabItem,
              activeTab === tab.name && styles.activeTabItem
            ]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.name ? '#28a745' : '#666'} 
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.name && styles.activeTabText
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Side Drawer */}
      {showSideDrawer && (
        <View style={styles.drawerOverlay}>
          <TouchableOpacity 
            style={styles.drawerBackdrop}
            onPress={() => setShowSideDrawer(false)}
          />
          <View style={styles.drawerContainer}>
            <SideDrawer onClose={() => setShowSideDrawer(false)} />
          </View>
        </View>
      )}

      {/* Dropdown Menu */}
      <DropdownMenu 
        visible={showDropdown}
        onClose={() => setShowDropdown(false)}
      />
    </View>
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
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 5,
  },
  userButton: {
    padding: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    color: 'white',
    marginRight: 8,
    maxWidth: 80,
    fontWeight: '500',
  },
  userIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    paddingBottom: 55,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTabItem: {
    // Active tab styling
  },
  tabIcon: {
    marginBottom: 5,
  },
  tabText: {
    fontSize: 11,
    color: '#666',
  },
  activeTabText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
  },
});