import { Hono } from 'hono';

export const customersRouter = new Hono();

customersRouter.get('/', (c) => {
  return c.json({ message: 'List customers' });
});

customersRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get customers ' + id });
});

customersRouter.post('/', (c) => {
  return c.json({ message: 'Create customers' });
});

customersRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update customers ' + id });
});

customersRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete customers ' + id });
});
