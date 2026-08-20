import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Validates request body, query params, or params against a Zod schema.
 * If validation fails, returns a standard 422 API error response.
 */
export async function validateRequest<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T,
  source: 'body' | 'query' = 'body'
): Promise<{ data: z.infer<T> | null; error: NextResponse | null }> {
  try {
    let dataToValidate: any;

    if (source === 'body') {
      const clone = req.clone();
      dataToValidate = await clone.json().catch(() => ({}));
    } else if (source === 'query') {
      const url = new URL(req.url);
      dataToValidate = Object.fromEntries(url.searchParams.entries());
    }

    const validatedData = schema.parse(dataToValidate);
    
    return { data: validatedData, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: NextResponse.json(
          {
            success: false,
            data: null,
            meta: {
              requestId: req.headers.get('x-request-id') || undefined,
            },
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid request data',
              details: error.errors,
            },
          },
          { status: 422 }
        ),
      };
    }
    
    return {
      data: null,
      error: NextResponse.json(
        {
          success: false,
          data: null,
          meta: {
            requestId: req.headers.get('x-request-id') || undefined,
          },
          error: {
            code: 'BAD_REQUEST',
            message: 'Malformed request',
          },
        },
        { status: 400 }
      ),
    };
  }
}
