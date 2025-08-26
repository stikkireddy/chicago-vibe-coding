import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import GyroscopeDisplay from '@/components/GyroscopeDisplay';

export default function HomeScreen() {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const generateDeviceId = () => {
      const id = Constants.installationId || 
        `device-${Math.random().toString(36).substr(2, 8)}-${Date.now().toString(36)}`;
      setDeviceId(id);
    };
    
    generateDeviceId();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <ThemedText style={styles.logoText}>databricks</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>Vibe Coding Workshop</ThemedText>
      </View>
      
      <ThemedView style={styles.deviceContainer}>
        <ThemedText style={styles.deviceText}>
          Device ID: {deviceId}
        </ThemedText>
      </ThemedView>
      
      <GyroscopeDisplay />
      
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle" style={styles.welcomeText}>
          Welcome to the Chicago Vibe Coding Workshop
        </ThemedText>
        <ThemedText style={styles.description}>
          This mobile app connects to your Databricks workspace and demonstrates 
          real-time device tracking with gyroscope data.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoContainer: {
    backgroundColor: '#FF3621', // Databricks orange
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 15,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  title: {
    textAlign: 'center',
    color: '#1B3139', // Databricks dark blue
  },
  deviceContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 54, 33, 0.1)', // Light Databricks orange
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 54, 33, 0.2)',
  },
  deviceText: {
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#1B3139',
    fontWeight: '600',
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(27, 49, 57, 0.05)', // Light Databricks blue
    borderRadius: 12,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#1B3139',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
});
