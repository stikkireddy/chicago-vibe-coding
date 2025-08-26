import { config } from '../config/config';
import { IngestRequest, IngestResponse, DeviceDataRecord } from '../types/api';

export class IngestService {
  private static readonly API_BASE_URL = config.gatewayUrl;

  static async ingestDeviceData(records: DeviceDataRecord[]): Promise<IngestResponse> {
    try {
      const request: IngestRequest = { records };

      const response = await fetch(`${this.API_BASE_URL}api/v1/ingest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IngestResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Data ingestion failed:', error);
      throw error;
    }
  }

  static async checkIngestHealth(): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE_URL}api/v1/ingest/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ingest health check failed:', error);
      throw error;
    }
  }
}