import { NextRequest, NextResponse } from 'next/server';
import { getTenantContext } from '@commercex/middleware';
import { OrderService, InventoryService, resolveTenantFromContext } from '@commercex/services';
import { z } from 'zod';

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().positive(),
  })).min(1),
  customerId: z.string().optional(),
  shippingAddress: z.any().optional(), // Expand later
});

export async function POST(req: NextRequest) {
  try {
    const context = await getTenantContext(req);
    const tenantId = await resolveTenantFromContext(context);
    
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid checkout payload' } }, { status: 400 });
    }
    
    const data = parsed.data;
    
    const inventoryService = new InventoryService(tenantId);
    const orderService = new OrderService(tenantId);
    
    // 1. Verify inventory
    for (const item of data.items) {
      if (item.variantId) {
        const isAvailable = await inventoryService.checkAvailability(item.variantId, item.quantity);
        if (!isAvailable) {
          return NextResponse.json({ success: false, error: { code: 'OUT_OF_STOCK', message: `Product variant out of stock` } }, { status: 409 });
        }
      }
    }
    
    // 2. Create Order
    const order = await orderService.createOrder({
      customerId: data.customerId,
      items: data.items,
    });
    
    // 3. Initiate payment via PaymentProvider (Mock)
    const paymentIntent = {
      id: "pi_12345",
      clientSecret: "pi_12345_secret_67890",
      status: "requires_payment_method"
    };

    return NextResponse.json({
      success: true,
      data: {
        order,
        paymentIntent
      }
    }, { status: 201 });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
