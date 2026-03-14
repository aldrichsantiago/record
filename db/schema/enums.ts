import { pgEnum } from "drizzle-orm/pg-core"

export const accountTypeEnum = pgEnum("account_type", [
  "bank",
  "wallet",
  "cash",
  "credit"
])

export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "closed"
])

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
  "transfer"
])

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "completed",
  "failed"
])

export const categoryTypeEnum = pgEnum("category_type", [
  "income",
  "expense"
])