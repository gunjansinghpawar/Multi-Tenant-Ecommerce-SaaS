import { Hono } from 'hono';

export const adminProductsRouter = new Hono();

adminProductsRouter.get('/', (c) => {
  return c.json({ message: 'List products (Admin)' });
});

adminProductsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get products (Admin) ' + id });
});

adminProductsRouter.post('/', (c) => {
  return c.json({ message: 'Create products' });
});

adminProductsRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update products ' + id });
});

adminProductsRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete products ' + id });
});
