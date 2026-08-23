import { z } from '@hono/zod-openapi';

/**
 * Standard Pagination Schema (Cursor-based)
 * Enforces maximum page size server-side to prevent memory/performance issues.
 */
export const PaginationSchema = z.object({
  pageSize: z.coerce
    .number()
    .int()
    .positive()
    .max(100, { message: 'Maximum page size is 100' })
    .default(25),
  cursor: z.string().optional().openapi({
    description: 'Cursor for the next page of results',
    example: 'eyJpZCI6MTIzfQ==',
  }),
});

/**
 * Creates a standard sorting schema enforcing allowlisted fields
 * and preventing direct SQL interpolation.
 * 
 * @param allowedFields - Array of field names allowed for sorting
 */
export const createSortSchema = (allowedFields: [string, ...string[]]) => {
  return z.object({
    sortBy: z.enum(allowedFields).optional().openapi({
      description: 'Field to sort by',
      example: allowedFields[0],
    }),
    sortOrder: z.enum(['asc', 'desc']).openapi({
      description: 'Sort direction (asc or desc)',
      example: 'desc',
      default: 'desc',
    }).default('desc'),
  });
};

/**
 * Standard Header Schema for Idempotency
 * Enforces the presence of an Idempotency-Key header on mutating endpoints.
 */
export const IdempotencyHeaderSchema = z.object({
  'idempotency-key': z.string().min(1, { message: 'Idempotency key cannot be empty' }).openapi({
    description: 'A unique key to guarantee idempotency for safe retries.',
    example: 'req_12345abcde',
  }),
});
