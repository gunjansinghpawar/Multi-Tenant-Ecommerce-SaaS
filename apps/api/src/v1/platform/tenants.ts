import { Hono } from 'hono';

export const tenantsRouter = new Hono();

tenantsRouter.get('/', (c) => {
  return c.json({ message: 'List tenants' });
});

tenantsRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get tenants ' + id });
});

tenantsRouter.post('/', (c) => {
  return c.json({ message: 'Create tenants' });
});

tenantsRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update tenants ' + id });
});

tenantsRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete tenants ' + id });
});
