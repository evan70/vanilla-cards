import { Hono, type Context } from 'hono';
import { db, boards } from '@vc/shared';
import { eq } from 'drizzle-orm';

export const boardsRouter = new Hono();

// Get all boards
boardsRouter.get('/', async (c: Context) => {
  const allBoards = await db.select().from(boards);
  return c.json(allBoards);
});

// Get board by ID
boardsRouter.get('/:id', async (c: Context) => {
  const idStr = c.req.param('id');
  if (!idStr) {
    return c.json({ error: 'Missing ID' }, 400);
  }
  const id = parseInt(idStr);
  const board = await db.select().from(boards).where(eq(boards.id, id)).get();
  
  if (!board) {
    return c.json({ error: 'Board not found' }, 404);
  }
  
  return c.json(board);
});

// Create board
boardsRouter.post('/', async (c: Context) => {
  const body = await c.req.json();
  // In real implementation, you'd insert into DB
  return c.json({ id: Date.now(), ...body, createdAt: new Date() }, 201);
});

// Delete board
boardsRouter.delete('/:id', async (c: Context) => {
  const idStr = c.req.param('id');
  if (!idStr) {
    return c.json({ error: 'Missing ID' }, 400);
  }
  const id = parseInt(idStr);
  // In real implementation, you'd delete from DB
  return c.json({ message: `Board ${id} deleted` });
});
