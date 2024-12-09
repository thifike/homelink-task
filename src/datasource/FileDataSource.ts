import { existsSync } from "fs";
import { DataSource, IdGeneratorFunction, IdType } from "./DataSource";
import { readFile, writeFile } from "fs/promises";

export class FileDataSource<TId, T extends IdType<TId>> extends DataSource<TId, T> {
  private filePath: string;
  private idGenerator: IdGeneratorFunction<TId>;

  constructor(options: { filePath: string; idGenerator: IdGeneratorFunction<TId> }) {
    super();

    const { filePath, idGenerator } = options;

    this.filePath = filePath;
    if (typeof idGenerator !== "function") {
      throw new Error("The idGenerator must be a function!");
    }
    this.idGenerator = idGenerator;
  }

  private async readDatabase(): Promise<T[]> {
    if (!existsSync(this.filePath)) {
      await this.writeDatabase([]);
    }

    return JSON.parse(await readFile(this.filePath, { encoding: "utf-8" }));
  }

  private async writeDatabase(data: T[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(data));
  }

  public async create(input: T): Promise<T> {
    const id: TId = this.idGenerator();

    const data = await this.readDatabase();

    const item: T = { ...input, id };
    data.push(item);

    await this.writeDatabase(data);

    return item;
  }

  public async read(id: TId): Promise<T> {
    const data = await this.readDatabase();

    const item: T | undefined = data.find((item) => item.id === id);
    if (!item) {
      throw new Error(`Item with id '${id}' not found!`);
    }

    return item;
  }

  public async list(
    predicate?: ((item: T, index: number, array: T[]) => boolean) | undefined
  ): Promise<T[]> {
    const data = await this.readDatabase();

    return data.filter(predicate ?? ((_item) => true));
  }

  public async update(item: T): Promise<T> {
    const data = await this.readDatabase();
    const updateIndex: number = data.findIndex((value) => value.id === item.id);

    if (updateIndex === -1) {
      throw new Error(`Item with id '${item.id}' not found!`);
    }

    data[updateIndex] = item;

    await this.writeDatabase(data);

    return item;
  }

  public async delete(id: TId): Promise<boolean> {
    const data = await this.readDatabase();
    const deleteIndex: number = data.findIndex((value) => value.id === id);

    if (deleteIndex === -1) {
      throw new Error(`Item with id '${id}' not found!`);
    }

    data.splice(deleteIndex, 1);

    await this.writeDatabase(data);

    return true;
  }
}
