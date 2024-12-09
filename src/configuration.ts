import { randomUUID } from "crypto";
import { FileDataSource } from "./datasource/FileDataSource";
import { DeviceService } from "./devices/DeviceService";
import { Device } from "./types";

export const DEVICE_SERVICE: DeviceService = new DeviceService({
  deviceDataSource: new FileDataSource<string, Device>({
    filePath: "database/database.json",
    idGenerator: () => randomUUID(),
  }),
});
