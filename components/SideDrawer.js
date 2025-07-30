// components/SideDrawer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../auth/AuthContext';

export default function SideDrawer({ onClose }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#28a745', '#20c997', '#17a2b8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoIcon}>
              <Ionicons name="leaf" size={32} color="#28a745" />
              <View style={styles.recycleOverlay}>
                <Ionicons name="refresh" size={16} color="white" />
              </View>
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>SCRAPPIX</Text>
              <View style={styles.logoBorder} />
            </View>
          </View>
        </View>
        
        <Text style={styles.headerSubtitle}>Your Smart Repurposing Household Material Companion</Text>
        
        {/* Decorative Elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.decorativeCircle, styles.circle1]} />
          <View style={[styles.decorativeCircle, styles.circle2]} />
          <View style={[styles.decorativeCircle, styles.circle3]} />
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={[styles.menuItem, styles.firstMenuItem]}
          onPress={() => {
            // Handle Help & Support navigation later
            onClose();
          }}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="help-circle" size={24} color="#28a745" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.menuSubtext}>Get assistance and FAQ</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            // Handle About navigation later
            onClose();
          }}
        >
          <View style={styles.menuIconContainer}>
            <Ionicons name="information-circle" size={24} color="#17a2b8" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>About</Text>
            <Text style={styles.menuSubtext}>Learn more about Scrappix</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerLogo}>
            <Ionicons name="leaf" size={20} color="#28a745" />
            <Text style={styles.footerBrand}>Scrappix</Text>
          </View>
          <Text style={styles.footerText}>© 2025 All rights reserved</Text>
          <Text style={styles.footerSubtext}>Version 1.0.0</Text>
        </View>
        
        {/* Footer decoration */}
        <View style={styles.footerDecoration}>
          <View style={styles.footerLine} />
        </View>
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  recycleOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#28a745',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  logoTextContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  logoBorder: {
    width: 60,
    height: 3,
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 2,
    opacity: 0.8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
  },
  circle1: {
    width: 100,
    height: 100,
    top: -20,
    right: -30,
  },
  circle2: {
    width: 60,
    height: 60,
    top: 40,
    left: -20,
  },
  circle3: {
    width: 40,
    height: 40,
    bottom: 10,
    right: 20,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: 'white',
  },
  firstMenuItem: {
    marginTop: 10,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtext: {
    fontSize: 13,
    color: '#666',
    opacity: 0.8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginLeft: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  footerDecoration: {
    alignItems: 'center',
    marginTop: 15,
  },
  footerLine: {
    width: 50,
    height: 3,
    backgroundColor: '#28a745',
    borderRadius: 2,
    opacity: 0.3,
  },
});