import { Hono } from 'hono';
import { db, cards } from '@vc/shared';
import { eq } from 'drizzle-orm';

export const cardsRouter = new Hono();

// Get all cards
cardsRouter.get('/', async (c) => {
  const allCards = await db.select().from(cards);
  return c.json(allCards);
});

// Get card by ID
cardsRouter.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const card = await db.select().from(cards).where(eq(cards.id, id)).get();
  
  if (!card) {
    return c.json({ error: 'Card not found' }, 404);
  }
  
  return c.json(card);
});

// Create card
cardsRouter.post('/', async (c) => {
  const body = await c.req.json();
  // In real implementation, you'd insert into DB
  return c.json({ id: Date.now(), ...body, createdAt: new Date(), updatedAt: new Date() }, 201);
});

// Update card
cardsRouter.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  // In real implementation, you'd update in DB
  return c.json({ id, ...body, updatedAt: new Date() });
});

// Delete card
cardsRouter.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  // In real implementation, you'd delete from DB
  return c.json({ message: `Card ${id} deleted` });
});
