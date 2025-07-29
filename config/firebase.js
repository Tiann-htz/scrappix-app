// config/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0iGKmizU5qMiBl6qS9iOFKPp4Zj2cpgQ",
  authDomain: "scrappix-83050.firebaseapp.com",
  projectId: "scrappix-83050",
  storageBucket: "scrappix-83050.firebasestorage.app",
  messagingSenderId: "511190105962",
  appId: "1:511190105962:web:1929bf94a92dbcd4936f13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;