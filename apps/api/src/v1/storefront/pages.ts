import { Hono } from 'hono';

export const pagesRouter = new Hono();

pagesRouter.get('/', (c) => {
  return c.json({ message: 'List pages' });
});

pagesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Get pages ' + id });
});

pagesRouter.post('/', (c) => {
  return c.json({ message: 'Create pages' });
});

pagesRouter.put('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Update pages ' + id });
});

pagesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ message: 'Delete pages ' + id });
});
