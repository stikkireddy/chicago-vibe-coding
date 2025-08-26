import { DeviceDataRecord } from '../types/api';
import { IngestService } from '../services/ingestService';

export class DataBuffer {
  private buffer: DeviceDataRecord[] = [];
  private deviceId: string;
  private intervalId: NodeJS.Timeout | null = null;
  private isSubmitting = false;

  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  /**
   * Add a data record to the buffer
   */
  addRecord(x_axis: number, y_axis: number, z_axis: number, movement: string): void {
    const record: DeviceDataRecord = {
      device_id: this.deviceId,
      x_axis,
      y_axis,
      z_axis,
      movement,
      timestamp: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
    };

    this.buffer.push(record);
  }

  /**
   * Start the 5-second interval timer for data submission
   */
  startBuffering(): void {
    if (this.intervalId) {
      return; // Already started
    }

    this.intervalId = setInterval(async () => {
      await this.submitBuffer();
    }, 5000); // 5 seconds

    console.log('Data buffering started - submitting every 5 seconds');
  }

  /**
   * Stop the buffering timer
   */
  stopBuffering(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Data buffering stopped');
    }
  }

  /**
   * Submit buffered data to the ingest service
   */
  private async submitBuffer(): Promise<void> {
    if (this.buffer.length === 0 || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const recordsToSubmit = [...this.buffer]; // Copy the buffer
    this.buffer = []; // Clear the buffer

    try {
      const response = await IngestService.ingestDeviceData(recordsToSubmit);
      console.log(
        `Successfully submitted ${response.records_processed} records to ${response.table_name}`
      );
    } catch (error) {
      console.error('Failed to submit buffered data:', error);
      // On error, add the records back to the buffer for retry
      this.buffer.unshift(...recordsToSubmit);
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Force submit any remaining buffered data
   */
  async flushBuffer(): Promise<void> {
    if (this.buffer.length > 0) {
      await this.submitBuffer();
    }
  }

  /**
   * Get current buffer status
   */
  getBufferStatus(): { count: number; isSubmitting: boolean } {
    return {
      count: this.buffer.length,
      isSubmitting: this.isSubmitting,
    };
  }
}