import { Body, Controller, Example, Get, Path, Post, Response, Route } from "tsoa";
import { DEVICE_SERVICE } from "../configuration";
import {
  AlarmStatus,
  DataPoint,
  Device,
  DeviceConfiguration,
  DeviceCreationParams,
  DeviceType,
  ValidateErrorJSON,
} from "../types";

@Route("devices")
export class DevicesController extends Controller {
  /**
   * Retrieves the details of a registered device.
   * @param deviceId The identifier of the device.
   * @returns The details of the device if exists or throws an error otherwise.
   * @example deviceId "4796cc2e-1015-469d-87f1-f7a8a7c7a991"
   */
  @Example<Device>({
    series: "3000",
    modelName: "Ei3014 Heat Alarm",
    deviceConfiguration: {
      deviceType: DeviceType.HeatAlarm,
      temperatureLowThreshold: 16,
      temperatureHighThreshold: 31,
    },
    id: "4796cc2e-1015-469d-87f1-f7a8a7c7a991",
  })
  @Get("{deviceId}")
  public async getDeviceDetails(@Path() deviceId: string): Promise<Device> {
    this.setStatus(200);
    return await DEVICE_SERVICE.getDeviceDetails(deviceId);
  }

  /**
   * Lists all registered devices.
   * @returns The list of registered devices.
   */
  @Example<Device[]>([
    {
      series: "3000",
      modelName: "Ei3014 Heat Alarm",
      deviceConfiguration: {
        deviceType: DeviceType.HeatAlarm,
        temperatureLowThreshold: 16,
        temperatureHighThreshold: 31,
      },
      id: "4796cc2e-1015-469d-87f1-f7a8a7c7a991",
    },
    {
      series: "1000",
      modelName: "Ei1020 Environmental Sensor",
      deviceConfiguration: { deviceType: DeviceType.EnvironmentalSensor },
      id: "992a28d9-c78d-416c-95df-c65c2ead406c",
    },
    {
      series: "3000",
      modelName: "Ei3016 Optical Smoke Alarm",
      deviceConfiguration: { deviceType: DeviceType.SmokeAlarm, concentrationHighThreshold: 0.4 },
      id: "32b3e36c-2e86-4f03-9a09-0b6c676057b3",
    },
  ])
  @Get()
  public async listDevices(): Promise<Device[]> {
    this.setStatus(200);
    return await DEVICE_SERVICE.listAllDevices();
  }

  /**
   * Registers a new device.
   * @param deviceCreationParams The details of the new device.
   * @returns The device details or throws an error in case of a failure.
   * @example deviceCreationParams {
    "series": "1000",
    "modelName": "Ei1020 Environmental Sensor",
    "deviceConfiguration": { "deviceType": "ES" }
  }
   */
  @Example<Device>({
    series: "1000",
    modelName: "Ei1020 Environmental Sensor",
    deviceConfiguration: { deviceType: DeviceType.EnvironmentalSensor },
    id: "992a28d9-c78d-416c-95df-c65c2ead406c",
  })
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @Post()
  public async registerDevice(@Body() deviceCreationParams: DeviceCreationParams): Promise<Device> {
    this.setStatus(201);
    return await DEVICE_SERVICE.registerDevice(deviceCreationParams);
  }

  /**
   * Updates the configuration of the device.
   * @param deviceId The identifier of the device to update the configuration on.
   * @param deviceConfiguration The new configuration to update.
   * @returns The updated device configuration or throws an error in case of a failure.
   * @example deviceId "4796cc2e-1015-469d-87f1-f7a8a7c7a991"
   * @example deviceConfiguration {
    "deviceType": "HA",
    "temperatureLowThreshold": 16,
    "temperatureHighThreshold": 31
}
   */
  @Example<DeviceConfiguration>({
    deviceType: DeviceType.SmokeAlarm,
    concentrationHighThreshold: 0.4,
  })
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  @Post("{deviceId}/configuration")
  public async updateDeviceConfiguration(
    @Path() deviceId: string,
    @Body() deviceConfiguration: DeviceConfiguration
  ): Promise<DeviceConfiguration> {
    this.setStatus(201);
    return await DEVICE_SERVICE.updateDeviceConfiguration(deviceId, deviceConfiguration);
  }

  /**
   * Returns a data point (status) of a device.
   * @param deviceId The identifier of the device to query.
   * @returns A data point (status) of the device.
   * @example deviceId "4796cc2e-1015-469d-87f1-f7a8a7c7a991"
   */
  @Example<DataPoint>({
    alarmStatus: AlarmStatus.Normal,
    dataPointType: "T",
    id: "4796cc2e-1015-469d-87f1-f7a8a7c7a991",
    temperature: 18.510887776780095,
  })
  @Get("{deviceId}/datapoint")
  public async getDeviceDataPoint(@Path() deviceId: string): Promise<DataPoint> {
    this.setStatus(200);
    return await DEVICE_SERVICE.getDeviceDataPoint(deviceId);
  }

  /**
   * Unregisters a device.
   * @param deviceId The identifier of the device
   * @returns 'true' if successful or throws an error otherwise.
   * @example deviceId "4796cc2e-1015-469d-87f1-f7a8a7c7a991"
   */
  @Post("{deviceId}/delete")
  public async deleteDevice(@Path() deviceId: string): Promise<boolean> {
    this.setStatus(201);
    return await DEVICE_SERVICE.deleteDevice(deviceId);
  }
}
