import { Hono } from 'hono';

export const cartRouter = new Hono();

cartRouter.get('/', (c) => {
  return c.json({ message: 'List cart' });
});

cartRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get cart ' + id });
});

cartRouter.post('/', (c) => {
  return c.json({ message: 'Create cart' });
});

cartRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update cart ' + id });
});

cartRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete cart ' + id });
});
