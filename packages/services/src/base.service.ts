import { BaseRepository } from '@commercex/repositories';

/**
 * Base Service pattern for standardized business logic layer.
 */
export abstract class BaseService {
  protected tenantId?: string;

  constructor(tenantId?: string) {
    this.tenantId = tenantId;
  }

  protected get isTenantScoped(): boolean {
    return !!this.tenantId;
  }
}
