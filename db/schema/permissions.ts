import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const permissions = pgTable('permissions', {
  id: integer('id').primaryKey(),
  key: text('key').notNull().unique(), // wallet.read
  description: text('description'),
});