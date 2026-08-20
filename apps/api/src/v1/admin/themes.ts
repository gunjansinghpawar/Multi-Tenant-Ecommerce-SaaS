import { Hono } from 'hono';

export const themesRouter = new Hono();

themesRouter.get('/', (c) => {
  return c.json({ message: 'List themes' });
});

themesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get themes ' + id });
});

themesRouter.post('/', (c) => {
  return c.json({ message: 'Create themes' });
});

themesRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update themes ' + id });
});

themesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete themes ' + id });
});
