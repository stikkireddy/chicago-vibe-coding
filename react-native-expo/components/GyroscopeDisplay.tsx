import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

export default function GyroscopeDisplay() {
  const [data, setData] = useState<GyroscopeData>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    checkGyroscopeAvailability();
    
    let latestData: GyroscopeData = { x: 0, y: 0, z: 0 };
    
    const subscription = Gyroscope.addListener(gyroscopeData => {
      latestData = gyroscopeData;
    });

    Gyroscope.setUpdateInterval(100);

    const updateInterval = setInterval(() => {
      setData({ ...latestData });
    }, 1000);

    return () => {
      subscription && subscription.remove();
      clearInterval(updateInterval);
    };
  }, []);

  const checkGyroscopeAvailability = async () => {
    try {
      const available = await Gyroscope.isAvailableAsync();
      setIsAvailable(available);
      if (!available) {
        Alert.alert('Gyroscope not available', 'This device does not have a gyroscope sensor.');
      }
    } catch (error) {
      console.error('Error checking gyroscope availability:', error);
      setIsAvailable(false);
    }
  };

  const formatValue = (value: number): string => {
    return value.toFixed(3);
  };

  const getRotationDescription = (x: number, y: number, z: number): string => {
    const threshold = 0.5;
    let description = '';
    
    if (Math.abs(x) > threshold) {
      description += x > 0 ? 'Tilting Forward ' : 'Tilting Backward ';
    }
    if (Math.abs(y) > threshold) {
      description += y > 0 ? 'Rolling Right ' : 'Rolling Left ';
    }
    if (Math.abs(z) > threshold) {
      description += z > 0 ? 'Turning Right' : 'Turning Left';
    }
    
    return description.trim() || 'Device Stable';
  };

  if (!isAvailable) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Gyroscope Data</ThemedText>
        <ThemedText style={styles.unavailable}>
          Gyroscope not available on this device
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Gyroscope Data</ThemedText>
      <ThemedText style={styles.updateInfo}>Updates every second</ThemedText>
      
      <ThemedView style={styles.dataContainer}>
        <ThemedView style={styles.axisContainer}>
          <ThemedText type="defaultSemiBold">X-Axis (Roll): </ThemedText>
          <ThemedText style={styles.value}>{formatValue(data.x)} rad/s</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.axisContainer}>
          <ThemedText type="defaultSemiBold">Y-Axis (Pitch): </ThemedText>
          <ThemedText style={styles.value}>{formatValue(data.y)} rad/s</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.axisContainer}>
          <ThemedText type="defaultSemiBold">Z-Axis (Yaw): </ThemedText>
          <ThemedText style={styles.value}>{formatValue(data.z)} rad/s</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText type="defaultSemiBold">Movement: </ThemedText>
        <ThemedText style={styles.description}>
          {getRotationDescription(data.x, data.y, data.z)}
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.info}>
          Values represent angular velocity in radians per second
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    marginBottom: 8,
  },
  updateInfo: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
  },
  dataContainer: {
    gap: 8,
    marginBottom: 16,
  },
  axisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#007AFF',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  description: {
    color: '#FF6B35',
    fontStyle: 'italic',
  },
  infoContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  info: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  unavailable: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.7,
  },
});