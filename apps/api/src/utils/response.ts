import { Context } from 'hono';
import { HttpStatus, HttpStatusCode } from './http-status';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  meta: {
    requestId: string;
    [key: string]: any;
  };
  error: {
    code: string;
    message: string;
    details?: any;
  } | null;
}

export function successResponse<T>(c: Context, data: T, metaData: Record<string, any> = {}, statusCode: HttpStatusCode = HttpStatus.OK) {
  const requestId = c.get('requestId') || 'req_' + Date.now();
  
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      requestId,
      ...metaData
    },
    error: null
  };
  
  return c.json(response, statusCode as any);
}

export function errorResponse(c: Context, statusCode: HttpStatusCode, code: string, message: string, details?: any) {
  const requestId = c.get('requestId') || 'req_' + Date.now();
  
  const response: ApiResponse = {
    success: false,
    data: null,
    meta: {
      requestId
    },
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  };
  
  return c.json(response, statusCode as any);
}
