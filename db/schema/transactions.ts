import { decimal, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { transaction_categories } from "./transactions_categories";
import { transactionStatusEnum, transactionTypeEnum } from "./enums";
import { users } from "./users";


export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),

  account_id: integer("account_id")
    .notNull()
    .references(() => accounts.id),

  category_id: integer("category_id")
    .references(() => transaction_categories.id),

  type: transactionTypeEnum("type").notNull(),

  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),

  description: text("description"),

  reference_number: varchar("reference_number", { length: 100 }),

  transaction_date: timestamp("transaction_date").notNull(),

  created_by: integer("created_by")
    .references(() => users.id),

  status: transactionStatusEnum("status").default("completed"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at")
  
})