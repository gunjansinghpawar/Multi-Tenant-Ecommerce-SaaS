import { NextRequest, NextResponse } from 'next/server';

export interface TenantContext {
  tenantId: string | null;
  slug: string | null;
  customDomain: string | null;
}

/**
 * Extracts tenant information from the request URL, headers, or cookies.
 * It identifies the tenant based on the subdomain or a custom domain.
 */
export async function getTenantContext(req: NextRequest): Promise<TenantContext> {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // ARCHITECTURE RULE: Never trust a tenant ID supplied by the browser.
  // We strictly resolve tenant context from verified domain/store context.
  // For authenticated admin actions, the API routes MUST derive and verify
  // the tenant context against the user's verified Memberships.

  // Common root domains to ignore
  const rootDomains = ['localhost:3000', process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, '') || 'commercex.local'];
  
  if (rootDomains.some(d => hostname.includes(d))) {
    // Check if it's a subdomain
    const domainParts = hostname.split('.');
    
    // Simplistic check for localhost
    if (hostname.includes('localhost') && domainParts.length > 1 && domainParts[0] !== 'localhost') {
       return { tenantId: null, slug: domainParts[0], customDomain: null };
    }
    
    // For prod root domain
    const rootDomainParts = rootDomains[1].split('.');
    if (domainParts.length > rootDomainParts.length) {
      const slug = domainParts[0];
      if (slug !== 'www' && slug !== 'app' && slug !== 'admin') {
         return { tenantId: null, slug, customDomain: null };
      }
    }
  } else {
    // Custom domain
    return { tenantId: null, slug: null, customDomain: hostname };
  }

  return { tenantId: null, slug: null, customDomain: null };
}

/**
 * Middleware to enforce tenant context on specific routes.
 */
export async function withTenantContext(req: NextRequest) {
  const context = await getTenantContext(req);
  
  if (!context.tenantId && !context.slug && !context.customDomain) {
    return NextResponse.json(
      { success: false, error: { code: 'TENANT_NOT_FOUND', message: 'Tenant context could not be resolved' } },
      { status: 404 }
    );
  }

  // We mutate headers to pass the context down to API route handlers
  const requestHeaders = new Headers(req.headers);
  if (context.tenantId) requestHeaders.set('x-tenant-id', context.tenantId);
  if (context.slug) requestHeaders.set('x-tenant-slug', context.slug);
  if (context.customDomain) requestHeaders.set('x-tenant-domain', context.customDomain);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
