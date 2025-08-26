export interface DeviceRegistrationResponse {
  device_id: string;
  timestamp: string;
  status: string;
}

export interface DeviceDataRecord {
  device_id: string;
  x_axis: number;
  y_axis: number;
  z_axis: number;
  movement: string;
  timestamp: number;
}

export interface IngestRequest {
  records: DeviceDataRecord[];
}

export interface IngestResponse {
  success: boolean;
  message: string;
  records_processed: number;
  table_name: string;
}