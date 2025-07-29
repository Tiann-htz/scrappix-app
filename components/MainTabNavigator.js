// components/MainTabNavigator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import SideDrawer from './SideDrawer';
import DropdownMenu from './DropdownMenu';

export default function MainTabNavigator({ children }) {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: '🏠' },
    { name: 'Marketplace', icon: '🛒' },
    { name: 'Chat', icon: '💬' },
    { name: 'Tutorials', icon: '📚' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowSideDrawer(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={styles.userButton}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.userIcon}>👤</Text>
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
            <Text style={[
              styles.tabIcon,
              activeTab === tab.name && styles.activeTabIcon
            ]}>
              {tab.icon}
            </Text>
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
    paddingBottom: 15,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 20,
    color: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    color: 'white',
    marginRight: 8,
    maxWidth: 80,
  },
  userIcon: {
    fontSize: 20,
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
    paddingBottom: 55, // Add more padding at bottom to lift it up
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
    fontSize: 20,
    marginBottom: 5,
  },
  activeTabIcon: {
    // You can add color changes here if needed
  },
  tabText: {
    fontSize: 12,
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