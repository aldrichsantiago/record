import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { categoryTypeEnum } from "./enums";

export const transaction_categories = pgTable("transaction_categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  type: categoryTypeEnum("type").notNull(),

  icon: varchar("icon", { length: 100 }),

  color: varchar("color", { length: 50 }),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
  deleted_at: timestamp("deleted_at")
})