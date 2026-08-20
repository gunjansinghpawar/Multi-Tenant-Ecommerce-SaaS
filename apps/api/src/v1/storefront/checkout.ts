import { Hono } from 'hono';

export const checkoutRouter = new Hono();

checkoutRouter.get('/', (c) => {
  return c.json({ message: 'List checkout' });
});

checkoutRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get checkout ' + id });
});

checkoutRouter.post('/', (c) => {
  return c.json({ message: 'Create checkout' });
});

checkoutRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update checkout ' + id });
});

checkoutRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete checkout ' + id });
});
