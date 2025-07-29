// components/SideDrawer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function SideDrawer({ onClose }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Highlighted Scrappix Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoHighlight}>
            <Text style={styles.logo}>♻️</Text>
            <Text style={styles.logoText}>SCRAPPIX</Text>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>Your Smart Recycling Companion</Text>
      </View>

      <View style={styles.menuContainer}>
        {/* Help & Support Section */}
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            // Handle Help & Support navigation later
            onClose();
          }}
        >
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            // Handle About navigation later
            onClose();
          }}
        >
          <Text style={styles.menuIcon}>ℹ️</Text>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Scrappix © 2025</Text>
        <Text style={styles.footerSubtext}>All rights reserved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 20,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    fontSize: 28,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 60,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
});