import { NextRequest, NextResponse } from 'next/server';
import { TenantService } from '@commercex/services';
import { validateRequest } from '@commercex/middleware';
import { createTenantSchema } from '@commercex/validation';

export async function GET(req: NextRequest) {
  try {
    // Note: We need to verify Super Admin session here
    // const session = await verifySuperAdmin(req);
    
    const tenantService = new TenantService();
    const tenants = await tenantService.getTenants();
    
    return NextResponse.json({
      success: true,
      data: tenants,
      meta: {
        requestId: req.headers.get('x-request-id') || undefined,
        totalCount: await tenantService.getTenantCount(),
      },
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        meta: { requestId: req.headers.get('x-request-id') || undefined },
        error: { code: 'INTERNAL_ERROR', message: error.message },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Note: We need to verify Super Admin session here
    
    const { data: validatedData, error: validationError } = await validateRequest(req, createTenantSchema, 'body');
    if (validationError) return validationError;
    
    if (!validatedData) {
      throw new Error("Validation data missing");
    }

    const tenantService = new TenantService();
    const newTenant = await tenantService.createTenant({
      name: validatedData.name,
      slug: validatedData.slug,
      customDomain: validatedData.customDomain,
      ownerId: "system", // Should map to actual owner user ID after invite/creation
    });
    
    return NextResponse.json({
      success: true,
      data: newTenant,
      meta: { requestId: req.headers.get('x-request-id') || undefined },
      error: null,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        meta: { requestId: req.headers.get('x-request-id') || undefined },
        error: { code: 'INTERNAL_ERROR', message: error.message },
      },
      { status: 500 }
    );
  }
}
