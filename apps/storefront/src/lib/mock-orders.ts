export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  date: string;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: OrderStatus;
  items: OrderItem[];
  timeline: OrderTimelineEvent[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  trackingLink?: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-100234',
    date: '2026-07-28T10:30:00Z',
    total: 323.99,
    subtotal: 299.99,
    shipping: 0,
    tax: 24.00,
    status: 'Delivered',
    trackingNumber: 'TRK123456789',
    trackingLink: '#',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Tech Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    items: [
      {
        id: 'i1',
        productId: 'p1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      }
    ],
    timeline: [
      { status: 'Pending', date: '2026-07-28T10:30:00Z', description: 'Order placed successfully.' },
      { status: 'Processing', date: '2026-07-28T14:15:00Z', description: 'Order is being packed.' },
      { status: 'Shipped', date: '2026-07-29T09:00:00Z', description: 'Package handed over to carrier.' },
      { status: 'Delivered', date: '2026-07-31T12:00:00Z', description: 'Package delivered to recipient.' },
    ]
  },
  {
    id: 'ORD-100235',
    date: '2026-07-30T15:45:00Z',
    total: 215.99,
    subtotal: 199.99,
    shipping: 0,
    tax: 16.00,
    status: 'Processing',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Tech Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    items: [
      {
        id: 'i2',
        productId: 'p2',
        name: 'Minimalist Smartwatch',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
      }
    ],
    timeline: [
      { status: 'Pending', date: '2026-07-30T15:45:00Z', description: 'Order placed successfully.' },
      { status: 'Processing', date: '2026-07-30T18:00:00Z', description: 'Order is being packed.' },
    ]
  },
  {
    id: 'ORD-100180',
    date: '2026-06-15T09:20:00Z',
    total: 450.00,
    subtotal: 450.00,
    shipping: 0,
    tax: 0,
    status: 'Returned',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Tech Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    items: [
      {
        id: 'i3',
        productId: 'p3',
        name: 'Ergonomic Office Chair',
        price: 450.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop',
      }
    ],
    timeline: [
      { status: 'Pending', date: '2026-06-15T09:20:00Z', description: 'Order placed successfully.' },
      { status: 'Delivered', date: '2026-06-20T14:00:00Z', description: 'Package delivered.' },
      { status: 'Returned', date: '2026-06-25T10:00:00Z', description: 'Item returned and refunded.' },
    ]
  }
];

export const getMockOrderById = (id: string) => {
  return MOCK_ORDERS.find(o => o.id === id);
};
