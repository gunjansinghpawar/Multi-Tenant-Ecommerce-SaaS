export interface IMasterEntity {
  id: string;
  tenantId: string | null; // null means GLOBAL MASTER
  code: string;
  name: string;
  slug: string;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  sortOrder: number;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MasterDependencyConfig {
  modelName: string;
  relationField: string;
  description: string;
}

export interface MasterFieldConfig {
  name: string;
  label: string;
}

export type MasterActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};


export interface MasterOption {
  label: string;
  value: string;
}

export interface MasterField {
  name: string;
  label: string;
  type?: MasterFieldType;

  required?: boolean;
  unique?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  virtual?: boolean;
  filterBy?: string;
  referenceModel?: string;

  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;

  placeholder?: string;
  description?: string;

  options?: MasterOption[];

  relation?: {
    entityName: string;
    valueField?: string;
    labelField?: string;
    endpoint?: string;
  };

  defaultValue?: unknown;

  hiddenInTable?: boolean;
  hiddenInCreate?: boolean;
  hiddenInEdit?: boolean;

  readOnly?: boolean;
}

export type MasterFieldType =
  | "text"
  | "textarea"
  | "number"
  | "decimal"
  | "boolean"
  | "reference"
  | "select"
  | "date"
  | "datetime"
  | "json";

export interface MasterField {
  name: string;
  label: string;
  type?: MasterFieldType;
  required?: boolean;
  unique?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  virtual?: boolean;
  referenceModel?: string;
  filterBy?: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  description?: string;
}

export interface MasterDependency {
  modelName: string;
  relationField: string;
  description?: string;
}

export interface MasterConfig {
  entityName: string;
  displayName: string;
  baseRoute: string;

  description?: string;

  dependencies?: MasterDependency[];

  fields: MasterField[];

  features?: {
    create?: boolean;
    edit?: boolean;
    delete?: boolean;
    search?: boolean;
    filter?: boolean;
    export?: boolean;
    import?: boolean;
    bulkDelete?: boolean;
    bulkUpdate?: boolean;
  };
}