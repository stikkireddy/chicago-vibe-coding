import { StyleSheet, View, ActivityIndicator, Pressable } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import GyroscopeDisplay from '@/components/GyroscopeDisplay';
import { DeviceService } from '@/services/deviceService';
import { DeviceRegistrationResponse } from '@/types/api';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [deviceRegistration, setDeviceRegistration] = useState<DeviceRegistrationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegisterDevice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const registration = await DeviceService.registerDevice();
      setDeviceRegistration(registration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Device registration failed');
      console.error('Device registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <ThemedText style={styles.logoText}>databricks</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>Vibe Coding Workshop</ThemedText>
      </View>
      
      <ThemedView style={styles.deviceContainer}>
        {!deviceRegistration && !isLoading && !error ? (
          <View style={styles.registrationContainer}>
            <ThemedText style={styles.registrationPrompt}>
              Ready to start tracking device data
            </ThemedText>
            <Pressable
              style={styles.registerButton}
              onPress={handleRegisterDevice}
            >
              <ThemedText style={styles.registerButtonText}>
                Register Device
              </ThemedText>
            </Pressable>
          </View>
        ) : isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF3621" />
            <ThemedText style={styles.deviceText}>Registering device...</ThemedText>
          </View>
        ) : error ? (
          <View>
            <ThemedText style={[styles.deviceText, styles.errorText]}>
              Registration Error: {error}
            </ThemedText>
            <Pressable
              style={[styles.registerButton, styles.retryButton]}
              onPress={handleRegisterDevice}
            >
              <ThemedText style={styles.registerButtonText}>
                Try Again
              </ThemedText>
            </Pressable>
          </View>
        ) : deviceRegistration ? (
          <View>
            <ThemedText style={[styles.deviceText, styles.successText]}>
              ✓ Device Registered Successfully
            </ThemedText>
            <ThemedText style={styles.deviceText}>
              Device ID: {deviceRegistration.device_id}
            </ThemedText>
            <ThemedText style={styles.deviceSubText}>
              Status: {deviceRegistration.status}
            </ThemedText>
            <ThemedText style={styles.deviceSubText}>
              Registered: {new Date(deviceRegistration.timestamp).toLocaleString()}
            </ThemedText>
          </View>
        ) : null}
      </ThemedView>
      
      {deviceRegistration && !isLoading && !error && (
        <GyroscopeDisplay />
      )}
      
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="subtitle" style={styles.welcomeText}>
          Welcome to the Chicago Vibe Coding Workshop
        </ThemedText>
        <ThemedText style={styles.description}>
          This mobile app connects to an ingestion service and demonstrates 
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
    marginTop: 10,
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
  deviceSubText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#1B3139',
    opacity: 0.7,
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  errorText: {
    color: '#FF3621',
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  registrationContainer: {
    alignItems: 'center',
    gap: 15,
  },
  registrationPrompt: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#FF3621',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    marginTop: 10,
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
