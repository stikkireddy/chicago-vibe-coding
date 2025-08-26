import { config } from '../config/config';
import { DeviceRegistrationResponse } from '../types/api';

export class DeviceService {
  private static readonly API_BASE_URL = config.gatewayUrl;

  static async registerDevice(): Promise<DeviceRegistrationResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}api/v1/devices/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DeviceRegistrationResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Device registration failed:', error);
      throw error;
    }
  }
}