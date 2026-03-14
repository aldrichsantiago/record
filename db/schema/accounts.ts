import { pgTable, timestamp, varchar, serial, integer, decimal } from 'drizzle-orm/pg-core';
import { users } from './users';
import { accountStatusEnum, accountTypeEnum } from './enums';
import { currencies } from './currencies';

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),

  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),

  name: varchar("name", { length: 255 }).notNull(),

  account_number: varchar("account_number", { length: 100 }),

  type: accountTypeEnum("type").notNull(),

  currency_id: integer("currency_id")
    .references(() => currencies.id),

  balance: decimal("balance", { precision: 15, scale: 2 })
    .default("0"),

  status: accountStatusEnum("status").default("active"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at")
})