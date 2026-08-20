import { Hono } from 'hono';

export const paymentsRouter = new Hono();

paymentsRouter.get('/', (c) => {
  return c.json({ message: 'List payments' });
});

paymentsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get payments ' + id });
});

paymentsRouter.post('/', (c) => {
  return c.json({ message: 'Create payments' });
});

paymentsRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update payments ' + id });
});

paymentsRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete payments ' + id });
});
