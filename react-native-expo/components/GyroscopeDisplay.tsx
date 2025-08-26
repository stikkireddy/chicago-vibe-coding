import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { DataBuffer } from '@/utils/dataBuffer';
import { getMovementDescription } from '@/utils/motionUtils';

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

interface GyroscopeDisplayProps {
  deviceId?: string;
}

export default function GyroscopeDisplay({ deviceId }: GyroscopeDisplayProps) {
  const [data, setData] = useState<GyroscopeData>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [bufferStatus, setBufferStatus] = useState({ count: 0, isSubmitting: false });
  const dataBuffer = useRef<DataBuffer | null>(null);

  useEffect(() => {
    checkGyroscopeAvailability();
    
    // Initialize data buffer if deviceId is provided
    if (deviceId) {
      dataBuffer.current = new DataBuffer(deviceId);
      dataBuffer.current.startBuffering();
    }
    
    let latestData: GyroscopeData = { x: 0, y: 0, z: 0 };
    
    const subscription = Gyroscope.addListener(gyroscopeData => {
      latestData = gyroscopeData;
    });

    Gyroscope.setUpdateInterval(100);

    const updateInterval = setInterval(() => {
      setData({ ...latestData });
      
      // Add data to buffer only once per second (instead of 10 times per second)
      if (dataBuffer.current) {
        const movement = getMovementDescription(latestData.x, latestData.y, latestData.z);
        dataBuffer.current.addRecord(latestData.x, latestData.y, latestData.z, movement);
      }
      
      // Update buffer status
      if (dataBuffer.current) {
        setBufferStatus(dataBuffer.current.getBufferStatus());
      }
    }, 1000);

    return () => {
      subscription && subscription.remove();
      clearInterval(updateInterval);
      
      // Clean up data buffer
      if (dataBuffer.current) {
        dataBuffer.current.stopBuffering();
        dataBuffer.current.flushBuffer(); // Send any remaining data
      }
    };
  }, [deviceId]);

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
      
      {deviceId && (
        <ThemedView style={styles.bufferContainer}>
          <ThemedText style={styles.bufferTitle}>Data Streaming</ThemedText>
          <ThemedText style={styles.bufferInfo}>
            Buffered records: {bufferStatus.count}
          </ThemedText>
          <ThemedText style={styles.bufferInfo}>
            Status: {bufferStatus.isSubmitting ? 'Submitting...' : 'Collecting'}
          </ThemedText>
          <ThemedText style={styles.bufferInfo}>
            Submission interval: Every 5 seconds
          </ThemedText>
        </ThemedView>
      )}
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
  bufferContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  bufferTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  bufferInfo: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});