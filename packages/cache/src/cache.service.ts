import Redis, { RedisOptions } from 'ioredis';

const REDIS_URI = process.env.REDIS_URI || 'redis://localhost:6379';

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null, // Required by bullmq
};

export const redis = new Redis(REDIS_URI, redisOptions);

export interface CacheDefinition<T> {
  keyPrefix: string;
  version: string | number;
  ttlSeconds: number;
  fallback: () => Promise<T>;
  invalidationEvents?: string[];
}

export class CacheService {
  static async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  }

  static async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await redis.set(key, data, 'EX', ttlSeconds);
  }

  static async delete(key: string): Promise<void> {
    await redis.del(key);
  }

  /**
   * Retrieves data from cache or computes it via strict CacheDefinition
   */
  static async remember<T>(identifier: string, definition: CacheDefinition<T>): Promise<T> {
    const fullKey = `${definition.keyPrefix}:v${definition.version}:${identifier}`;
    
    const cached = await this.get<T>(fullKey);
    if (cached !== null) return cached;
    
    try {
      const computed = await definition.fallback();
      await this.set(fullKey, computed, definition.ttlSeconds);
      return computed;
    } catch (error) {
      console.error(`[CacheService] Fallback failed for ${fullKey}`, error);
      throw error;
    }
  }
}
