/**
 * Enums
 */
export enum DeviceType {
  EnvironmentalSensor = "ES",
  HeatAlarm = "HA",
  SmokeAlarm = "SA",
}

export enum OperationalStatus {
  Faulty = "F",
  Operational = "O",
}

export enum AlarmStatus {
  Normal = "N",
  Alarming = "A",
}

/**
 * Types
 */

export interface ThermalDataPoint {
  id: string;
  dataPointType: "T";
  temperature: number;
  alarmStatus: AlarmStatus;
}

export interface EnvironmentalDataPoint {
  id: string;
  dataPointType: "E";
  temperature: number;
  humidity: number;
}

export interface SmokeDataPoint {
  id: string;
  dataPointType: "S";
  concentration: number;
  alarmStatus: AlarmStatus;
}

export type DataPoint = ThermalDataPoint | EnvironmentalDataPoint | SmokeDataPoint;

export interface ThermalDeviceConfiguration {
  deviceType: DeviceType.HeatAlarm;
  temperatureLowThreshold: number;
  temperatureHighThreshold: number;
}

export interface EnvironmentalDeviceConfiguration {
  deviceType: DeviceType.EnvironmentalSensor;
}

export interface SmokeDeviceConfiguration {
  deviceType: DeviceType.SmokeAlarm;
  concentrationHighThreshold: number;
}

export type DeviceConfiguration =
  | ThermalDeviceConfiguration
  | EnvironmentalDeviceConfiguration
  | SmokeDeviceConfiguration;

export interface DeviceCreationParams {
  /**
   * @minLength 3 Series information must not be shorter than 3 characters!
   */
  series: string;
  /**
   * @minLength 3 Model name must not be shorter than 3 characters!
   */
  modelName: string;
  deviceConfiguration:
    | ThermalDeviceConfiguration
    | EnvironmentalDeviceConfiguration
    | SmokeDeviceConfiguration;
}

export interface Device extends DeviceCreationParams {
  id: string;
}

export interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}
