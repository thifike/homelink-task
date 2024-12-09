export type IdGeneratorFunction<TId> = () => TId;

export interface IdType<T> {
  id: T;
}

export abstract class DataSource<TId, T = { id: TId }> {
  public abstract create(input: T): Promise<T>;
  public abstract read(id: TId): Promise<T>;
  public abstract list(predicate?: (item: T, index: number, array: T[]) => boolean): Promise<T[]>;
  public abstract update(item: T): Promise<T>;
  public abstract delete(id: TId): Promise<boolean>;
}
