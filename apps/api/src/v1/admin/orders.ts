import { Hono } from 'hono';

export const ordersRouter = new Hono();

ordersRouter.get('/', (c) => {
  return c.json({ message: 'List orders' });
});

ordersRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get orders ' + id });
});

ordersRouter.post('/', (c) => {
  return c.json({ message: 'Create orders' });
});

ordersRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update orders ' + id });
});

ordersRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete orders ' + id });
});
