// components/DropdownMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';

export default function DropdownMenu({ visible, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', 'Failed to logout');
            }
            onClose();
          }
        }
      ]
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.dropdown}>
        <View style={styles.userInfo}>
          <View style={styles.userHeader}>
            <Ionicons name="person-circle" size={40} color="#28a745" />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.fullName}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            // Handle profile settings navigation later
            onClose();
          }}
        >
          <Ionicons name="settings" size={18} color="#666" style={styles.menuIcon} />
          <Text style={styles.menuText}>Profile Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={18} color="#666" style={styles.menuIcon} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 20,
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 220,
  },
  userInfo: {
    padding: 10,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
});