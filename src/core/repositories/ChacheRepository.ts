export default interface CacheRepository {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
}
