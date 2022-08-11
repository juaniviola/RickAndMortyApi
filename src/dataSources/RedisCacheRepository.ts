import * as redis from 'redis';
import CacheRepository from '../core/repositories/ChacheRepository';

class RedisCacheRepository implements CacheRepository {
  private redisClient: any;

  async connect(): Promise<void> {
    const redisClient = redis.createClient();

    // tslint:disable-next-line:no-console
    redisClient.on('error', (error: any) => console.error(`Redis error: ${error}`));

    await redisClient.connect();
    this.redisClient = redisClient;
  }

  async close(): Promise<void> {
    await this.redisClient.quit();
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await this.redisClient.set(key, JSON.stringify(value), { EX: 60000, NX: true });
    } catch (error) {
      return null;
    }
  }

  async get(key: string): Promise<any> {
    try {
      const response = await this.redisClient.get(key);
      if (!response) return null;

      return JSON.parse(response);
    } catch (error) {
      return null;
    }
  }
}

export default new RedisCacheRepository();
