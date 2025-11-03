import { char, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./clients.ts";

export const addresses = pgTable("addresses", {
  id: uuid().defaultRandom().primaryKey(),
  client: uuid()
    .references(() => clients.id)
    .notNull(),
  zipCode: varchar({ length: 10 }).notNull(),
  state: char({ length: 2 }).notNull(),
  city: text().notNull(),
  street: text().notNull(),
  number: text().notNull(),
  complement: text(),
});
