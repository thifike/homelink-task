import {
  AlarmStatus,
  DeviceConfiguration,
  DeviceType,
  EnvironmentalDataPoint,
  EnvironmentalDeviceConfiguration,
  SmokeDataPoint,
  SmokeDeviceConfiguration,
  ThermalDataPoint,
  ThermalDeviceConfiguration,
} from "../types";

export function simulateDataPoint(deviceId: string, deviceConfiguration: DeviceConfiguration) {
  switch (deviceConfiguration.deviceType) {
    case DeviceType.EnvironmentalSensor:
      return simulateEnvironmentalSensorDataPoint(deviceId, deviceConfiguration);
    case DeviceType.HeatAlarm:
      return simulateHeatAlarmDataPoint(deviceId, deviceConfiguration);
    case DeviceType.SmokeAlarm:
      return simulateSmokeAlarmDataPoint(deviceId, deviceConfiguration);
  }
}

function randomTemperature(): number {
  return Math.random() * 60 - 20; // random temperature between -20 and 40 degrees
}

function simulateEnvironmentalSensorDataPoint(
  deviceId: string,
  _configuration: EnvironmentalDeviceConfiguration
): EnvironmentalDataPoint {
  return {
    dataPointType: "E",
    humidity: Math.random(),
    id: deviceId,
    temperature: randomTemperature(),
  };
}

function simulateHeatAlarmDataPoint(
  deviceId: string,
  configuration: ThermalDeviceConfiguration
): ThermalDataPoint {
  const temperature = randomTemperature();

  return {
    alarmStatus:
      temperature < configuration.temperatureLowThreshold ||
      temperature > configuration.temperatureHighThreshold
        ? AlarmStatus.Alarming
        : AlarmStatus.Normal,
    dataPointType: "T",
    id: deviceId,
    temperature,
  };
}

function simulateSmokeAlarmDataPoint(
  deviceId: string,
  configuration: SmokeDeviceConfiguration
): SmokeDataPoint {
  const concentration = Math.random();

  return {
    alarmStatus:
      concentration > configuration.concentrationHighThreshold
        ? AlarmStatus.Alarming
        : AlarmStatus.Normal,
    concentration,
    dataPointType: "S",
    id: deviceId,
  };
}
