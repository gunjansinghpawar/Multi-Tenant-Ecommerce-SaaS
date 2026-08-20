import { Hono } from 'hono';

export const productsRouter = new Hono();

productsRouter.get('/', (c) => {
  return c.json({ message: 'List products (Public)' });
});

productsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get products (Public) ' + id });
});
