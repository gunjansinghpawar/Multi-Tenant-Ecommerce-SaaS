import { Hono } from 'hono';

export const categoriesRouter = new Hono();

categoriesRouter.get('/', (c) => {
  return c.json({ message: 'List categories' });
});

categoriesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get categories ' + id });
});

categoriesRouter.post('/', (c) => {
  return c.json({ message: 'Create categories' });
});

categoriesRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update categories ' + id });
});

categoriesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete categories ' + id });
});
