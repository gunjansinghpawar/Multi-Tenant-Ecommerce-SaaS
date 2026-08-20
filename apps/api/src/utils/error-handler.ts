import { ErrorHandler } from 'hono';
import { errorResponse } from './response';
import { HttpStatus } from './http-status';

export const globalErrorHandler: ErrorHandler = (err, c) => {
  // Never leak internal stack traces in production
  const isProd = process.env.NODE_ENV === 'production';
  
  if (!isProd) {
    console.error('[API Error]:', err);
  }

  // Handle standard HTTP errors thrown by Hono (e.g. HTTPException)
  if (err instanceof Error) {
    // Basic mapping, can be extended for Prisma, etc.
    if (err.name === 'PrismaClientKnownRequestError') {
      return errorResponse(c, HttpStatus.CONFLICT, 'DATABASE_CONFLICT', 'A resource conflict occurred.');
    }
    
    // Default 500
    return errorResponse(
      c, 
      HttpStatus.INTERNAL_SERVER_ERROR, 
      'INTERNAL_SERVER_ERROR', 
      isProd ? 'An unexpected error occurred.' : err.message
    );
  }

  // Fallback
  return errorResponse(c, HttpStatus.INTERNAL_SERVER_ERROR, 'UNKNOWN_ERROR', 'An unknown error occurred.');
};
