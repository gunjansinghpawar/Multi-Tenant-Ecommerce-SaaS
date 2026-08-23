import { OpenAPIHono } from '@hono/zod-openapi';

// --- Shared Routers (Mounted across namespaces or at root if necessary) ---
import { authRouter } from './auth';
import { paymentsRouter } from './payments';
import { shippingRouter } from './shipping';

// --- Storefront Routers ---
import { cartRouter } from './storefront/cart';
import { checkoutRouter } from './storefront/checkout';
import { pagesRouter } from './storefront/pages';
import { productsRouter as storefrontProductsRouter } from './storefront/products';

// --- Admin Routers ---
import { adminProductsRouter } from './admin/products';
import { categoriesRouter } from './admin/categories';
import { ordersRouter } from './admin/orders';
import { customersRouter } from './admin/customers';
import { themesRouter } from './admin/themes';
import { analyticsRouter } from './admin/analytics';
import { notificationsApi } from './admin/notifications';

// --- Platform / Super Admin Routers ---
import { tenantsRouter } from './platform/tenants';

// --- Public / Marketing Routers ---
import { webhooksRouter } from './public/webhooks';

const apiV1 = new OpenAPIHono();

// --- 1. STOREFRONT API (/api/v1/storefront) ---
const storefront = new OpenAPIHono();
storefront.route('/cart', cartRouter);
storefront.route('/checkout', checkoutRouter);
storefront.route('/pages', pagesRouter);
storefront.route('/products', storefrontProductsRouter);
apiV1.route('/storefront', storefront);

// --- 2. ADMIN API (/api/v1/admin) ---
const admin = new OpenAPIHono();
admin.route('/products', adminProductsRouter);
admin.route('/categories', categoriesRouter);
admin.route('/orders', ordersRouter);
admin.route('/customers', customersRouter);
admin.route('/themes', themesRouter);
admin.route('/analytics', analyticsRouter);
admin.route('/notifications', notificationsApi);
apiV1.route('/admin', admin);

// --- 3. SUPER ADMIN API (/api/v1/platform) ---
const platform = new OpenAPIHono();
platform.route('/tenants', tenantsRouter);
apiV1.route('/platform', platform);

// --- 4. MARKETING API (/api/v1/public) ---
const publicApi = new OpenAPIHono();
publicApi.route('/webhooks', webhooksRouter);
apiV1.route('/public', publicApi);

// --- Shared (Pending Domain specific splitting) ---
apiV1.route('/auth', authRouter);
apiV1.route('/payments', paymentsRouter);
apiV1.route('/shipping', shippingRouter);

export { apiV1 };
