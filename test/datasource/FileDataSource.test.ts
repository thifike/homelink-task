const mockReadFile = jest.fn();
const mockWriteFile = jest.fn();
const mockExistsSync = jest.fn();

jest.mock("fs/promises", () => ({
  ...jest.requireActual("fs/promises"),
  readFile: (_path: string, _options: { encoding: string }) => mockReadFile(),
  writeFile: (_path: string, data: string) => mockWriteFile(data),
}));

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  existsSync: (_path: string) => mockExistsSync(),
}));

import { readFileSync } from "fs";
import { IdGeneratorFunction } from "../../src/datasource/DataSource";
import { FileDataSource } from "../../src/datasource/FileDataSource";
import { Device, DeviceType } from "../../src/types";

const DEFAULT_DATABASE: string = readFileSync("./test/datasource/default-database.json").toString();

describe("FileDataSource creation tests", () => {
  it("Creation with an id generator function is successful", () => {
    const fds: FileDataSource<string, Device> = new FileDataSource<string, Device>({
      filePath: "somefile.json",
      idGenerator: () => "the_id",
    });
    expect(fds).toBeDefined();
  });

  it("Creation without an id generator function throws", () => {
    expect(
      () =>
        new FileDataSource<string, Device>({
          filePath: "somefile.json",
          idGenerator: "something_that_is_not_a_function" as any as IdGeneratorFunction<string>,
        })
    ).toThrow("The idGenerator must be a function!");
  });
});

describe("FileDataSource CRUD tests", () => {
  let dataSource: FileDataSource<string, Device> = new FileDataSource<string, Device>({
    filePath: "somefile.json",
    idGenerator: () => "the_id",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    mockExistsSync.mockReturnValue(true);
  });

  it("When called with an non-existing file, the database is created as empty first", async () => {
    mockExistsSync.mockReturnValue(false);
    mockReadFile.mockResolvedValue("[]");

    await dataSource.create({
      id: "",
      series: "the-series",
      modelName: "the-model",
      deviceConfiguration: {
        deviceType: DeviceType.EnvironmentalSensor,
      },
    });

    expect(mockExistsSync).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenNthCalledWith(1, "[]");
    expect(mockWriteFile).toHaveBeenCalledTimes(2);
    expect(mockReadFile).toHaveBeenCalledTimes(1);
  });

  it("When called with an existing file, the database is read properly", async () => {
    mockReadFile.mockResolvedValue("[]");

    await dataSource.create({
      id: "",
      series: "the-series",
      modelName: "the-model",
      deviceConfiguration: {
        deviceType: DeviceType.EnvironmentalSensor,
      },
    });

    expect(mockExistsSync).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile.mock.calls[0][0]).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
  });

  it("Create adds the item to the array", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const device = await dataSource.create({
      id: "",
      series: "the-series",
      modelName: "the-model",
      deviceConfiguration: {
        deviceType: DeviceType.EnvironmentalSensor,
      },
    });

    expect(device).toMatchSnapshot();
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile.mock.calls[0][0]).toMatchSnapshot();
  });

  it("Read returns a device successfully", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const device = await dataSource.read("32b3e36c-2e86-4f03-9a09-0b6c676057b3");

    expect(device).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("Read throws an error when the device doesn't exists", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    await expect(dataSource.read("some-random-string")).rejects.toThrow(
      "Item with id 'some-random-string' not found!"
    );
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("List returns the list of all items", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const result = await dataSource.list((_item) => true);

    expect(result).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("List returns the list of all items without supplying a predicate", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const result = await dataSource.list();

    expect(result).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("List returns the list of filtered items", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const result = await dataSource.list(
      (item) => item.id !== "992a28d9-c78d-416c-95df-c65c2ead406c"
    );

    expect(result).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("Update updates a device successfully", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const result = await dataSource.update({
      deviceConfiguration: {
        concentrationHighThreshold: 0.5,
        deviceType: DeviceType.SmokeAlarm,
      },
      id: "32b3e36c-2e86-4f03-9a09-0b6c676057b3",
      modelName: "new_name",
      series: "new_series",
    });

    expect(result).toMatchSnapshot();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile.mock.calls[0][0]).toMatchSnapshot();
  });

  it("Update throws if a device doesn't exist", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    await expect(
      dataSource.update({
        deviceConfiguration: {
          concentrationHighThreshold: 0.5,
          deviceType: DeviceType.SmokeAlarm,
        },
        id: "non-existing-id",
        modelName: "new_name",
        series: "new_series",
      })
    ).rejects.toThrow("Item with id 'non-existing-id' not found!");

    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });

  it("Delete deletes a device successfully", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    const result = await dataSource.delete("32b3e36c-2e86-4f03-9a09-0b6c676057b3");

    expect(result).toBeTruthy();
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile.mock.calls[0][0]).toMatchSnapshot();
  });

  it("Delete throws an error if device doesn't exist", async () => {
    mockReadFile.mockResolvedValue(DEFAULT_DATABASE);

    await expect(dataSource.delete("non-existing-id2")).rejects.toThrow(
      "Item with id 'non-existing-id2' not found!"
    );

    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).not.toHaveBeenCalled();
  });
});
