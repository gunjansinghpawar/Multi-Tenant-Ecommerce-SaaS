import { Hono } from 'hono';

export const shippingRouter = new Hono();

shippingRouter.get('/', (c) => {
  return c.json({ message: 'List shipping' });
});

shippingRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get shipping ' + id });
});

shippingRouter.post('/', (c) => {
  return c.json({ message: 'Create shipping' });
});

shippingRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update shipping ' + id });
});

shippingRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete shipping ' + id });
});
