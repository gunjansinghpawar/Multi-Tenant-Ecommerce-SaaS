export class TenantCache {
  async getTenant(id: string) {
    // return redis.get('tenant:' + id);
    return null;
  }

  async setTenant(id: string, data: any) {
    // return redis.set('tenant:' + id, JSON.stringify(data), 'EX', 3600);
  }

  async invalidate(id: string) {
    // return redis.del('tenant:' + id);
  }
}
