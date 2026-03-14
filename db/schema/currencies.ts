import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";


export const currencies = pgTable("currencies", {
    id: serial("id").primaryKey(),

    code: varchar("code", { length: 10 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    symbol: varchar("symbol", { length: 10 }).notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
    deleted_at: timestamp("deleted_at")
})