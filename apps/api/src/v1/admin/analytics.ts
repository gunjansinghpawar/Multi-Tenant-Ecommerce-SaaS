import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { successResponse } from '../../utils/response';
import { tenantMiddleware, authGuard } from '../../middlewares/core';
import { idempotencyMiddleware } from '../../middlewares/idempotency';
import { PaginationSchema, createSortSchema, IdempotencyHeaderSchema } from '../../utils/query-schemas';
import { HttpStatus } from '../../utils/http-status';

export type AppEnv = {
  Variables: {
    tenantId: string;
    userId: string;
    requestId: string;
  }
};

export const analyticsRouter = new OpenAPIHono<AppEnv>();

// Reusable standard response schemas
const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional()
});

const StandardResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.nullable(),
  meta: z.object({
    requestId: z.string()
  }).passthrough(),
  error: ErrorSchema.nullable()
});

// Analytics Models
const AnalyticsEventSchema = z.object({
  id: z.string(),
  eventType: z.string(),
  createdAt: z.string()
});

const getAnalyticsRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'List analytics events',
  description: 'Retrieve paginated analytics events for the current tenant.',
  request: {
    query: PaginationSchema.merge(createSortSchema(['createdAt', 'eventType'])).merge(
      z.object({
        // Safe allowlisted filters
        eventType: z.enum(['PAGE_VIEW', 'CLICK', 'PURCHASE', 'SIGNUP']).optional().openapi({
          description: 'Filter by event type',
        }),
        startDate: z.string().datetime().optional().openapi({
          description: 'Filter events after this date (ISO 8601)',
        }),
        endDate: z.string().datetime().optional().openapi({
          description: 'Filter events before this date (ISO 8601)',
        }),
      })
    )
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: StandardResponseSchema(z.array(AnalyticsEventSchema))
        }
      },
      description: 'Successful retrieval of analytics events'
    }
  }
});

const postAnalyticsRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create an analytics event (Idempotent)',
  description: 'Demonstrates idempotency. Repeated requests with the same Idempotency-Key return the cached response.',
  request: {
    headers: IdempotencyHeaderSchema,
    body: {
      content: {
        'application/json': {
          schema: z.object({
            eventType: z.string()
          })
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: StandardResponseSchema(AnalyticsEventSchema)
        }
      },
      description: 'Event created successfully'
    }
  }
});

// We can chain middlewares before the handler
analyticsRouter.use(authGuard);
analyticsRouter.use(tenantMiddleware);
analyticsRouter.use(idempotencyMiddleware);

analyticsRouter.openapi(getAnalyticsRoute, (c) => {
  const { pageSize, cursor, sortBy, sortOrder, eventType, startDate, endDate } = c.req.valid('query');
  const tenantId = c.get('tenantId');

  // Stub data
  const data = [
    { id: 'evt_1', eventType: eventType || 'PAGE_VIEW', createdAt: new Date().toISOString() }
  ];

  return successResponse(c, data, { 
    pagination: { pageSize, nextCursor: 'dummy_cursor' },
    sorting: { sortBy, sortOrder },
    filters: { eventType, startDate, endDate }
  }) as any;
});

analyticsRouter.openapi(postAnalyticsRoute, (c) => {
  const { eventType } = c.req.valid('json');
  
  const newEvent = {
    id: `evt_${Date.now()}`,
    eventType,
    createdAt: new Date().toISOString()
  };

  return successResponse(c, newEvent, {}, HttpStatus.CREATED) as any;
});
