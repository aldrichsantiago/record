import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";


export const audit_logs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),

  user_id: integer("user_id")
    .references(() => users.id),

  action: varchar("action", { length: 255 }).notNull(),

  model_type: varchar("model_type", { length: 100 }),

  model_id: integer("model_id"),

  old_values: text("old_values"),

  new_nalues: text("new_values"),

  ip_address: varchar("ip_address", { length: 50 }),

  created_at: timestamp("created_at").defaultNow()
})