export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogPayload {
  message: string;
  tenantId?: string | null;
  userId?: string | null;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface AuditLogPayload {
  action: string;
  actorId: string;
  actorEmail: string;
  tenantId?: string | null;
  resourceType: string;
  resourceId?: string | null;
  details?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export const logger = {
  info: (payload: LogPayload | string) => {
    const data = typeof payload === 'string' ? { message: payload } : payload;
    console.log(JSON.stringify({ level: 'info', timestamp: new Date().toISOString(), ...data }));
  },
  warn: (payload: LogPayload | string) => {
    const data = typeof payload === 'string' ? { message: payload } : payload;
    console.warn(JSON.stringify({ level: 'warn', timestamp: new Date().toISOString(), ...data }));
  },
  error: (payload: LogPayload | string, error?: Error | unknown) => {
    const data = typeof payload === 'string' ? { message: payload } : payload;
    const errDetails = error instanceof Error ? { stack: error.stack, name: error.name, errorMsg: error.message } : {};
    console.error(JSON.stringify({ level: 'error', timestamp: new Date().toISOString(), ...data, ...errDetails }));
  },
  debug: (payload: LogPayload | string) => {
    const data = typeof payload === 'string' ? { message: payload } : payload;
    console.debug(JSON.stringify({ level: 'debug', timestamp: new Date().toISOString(), ...data }));
  },
  audit: (payload: AuditLogPayload) => {
    console.log(JSON.stringify({ level: 'info', type: 'AUDIT', timestamp: new Date().toISOString(), ...payload }));
  },
};
