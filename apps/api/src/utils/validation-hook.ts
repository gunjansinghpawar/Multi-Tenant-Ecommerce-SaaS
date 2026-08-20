import { Hook } from '@hono/zod-openapi';
import { errorResponse } from './response';
import { HttpStatus } from './http-status';

export const validationHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    const errorDetails = result.error.errors.map(err => ({
      path: err.path.join('.'),
      message: err.message
    }));
    
    return errorResponse(
      c,
      HttpStatus.BAD_REQUEST,
      'VALIDATION_ERROR',
      'The request payload is invalid.',
      errorDetails
    );
  }
};
