import { CacheService, CacheDefinition } from './cache.service';

export class TenantCache {
  /**
   * Example of strict caching definition
   */
  async getTenant(id: string, fallbackFetcher: () => Promise<any>) {
    const definition: CacheDefinition<any> = {
      keyPrefix: 'tenant',
      version: 1,
      ttlSeconds: 3600, // 1 hour
      fallback: fallbackFetcher,
      invalidationEvents: ['TENANT_UPDATED', 'TENANT_DELETED']
    };
    return CacheService.remember(id, definition);
  }

  async invalidate(id: string) {
    const fullKey = `tenant:v1:${id}`;
    return CacheService.delete(fullKey);
  }
}
