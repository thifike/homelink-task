import { DataSource } from "../datasource/DataSource";
import { DataPoint, Device, DeviceConfiguration, DeviceCreationParams } from "../types";
import { simulateDataPoint } from "./dataPointSimulator";

export class DeviceService {
  private deviceDataSource: DataSource<string, Device>;

  constructor(options: { deviceDataSource: DataSource<string, Device> }) {
    const { deviceDataSource } = options;

    this.deviceDataSource = deviceDataSource;
  }

  public async registerDevice(deviceCreationParams: DeviceCreationParams): Promise<Device> {
    return await this.deviceDataSource.create({ ...deviceCreationParams, id: "" });
  }

  public async listAllDevices(): Promise<Device[]> {
    return await this.deviceDataSource.list();
  }

  public async getDeviceDetails(deviceId: string): Promise<Device> {
    return await this.deviceDataSource.read(deviceId);
  }

  public async updateDeviceConfiguration(
    deviceId: string,
    configuration: DeviceConfiguration
  ): Promise<DeviceConfiguration> {
    const device: Device = await this.deviceDataSource.read(deviceId);
    device.deviceConfiguration = configuration;

    await this.deviceDataSource.update(device);

    return configuration;
  }

  public async getDeviceDataPoint(deviceId: string): Promise<DataPoint> {
    const device: Device = await this.deviceDataSource.read(deviceId);
    return simulateDataPoint(device.id, device.deviceConfiguration);
  }

  public async deleteDevice(deviceId: string): Promise<boolean> {
    return await this.deviceDataSource.delete(deviceId);
  }
}
