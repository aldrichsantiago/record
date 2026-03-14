import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { transactions } from "./transactions";

export const transaction_attachments = pgTable("transaction_attachments", {
    id: serial("id").primaryKey(),

    transaction_id: integer("transaction_id")
        .notNull()
        .references(() => transactions.id),

    file_path: varchar("file_path", { length: 255 }).notNull(),

    file_name: varchar("file_name", { length: 255 }),

    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
    deleted_at: timestamp("deleted_at")
})