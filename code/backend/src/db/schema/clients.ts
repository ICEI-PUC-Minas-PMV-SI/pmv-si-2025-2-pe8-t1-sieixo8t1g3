import {
  date,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

import { users } from "./users.ts";

export const clients = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  type: varchar({ length: 4 }).notNull(),
  document: varchar({ length: 14 }),
  name: text().notNull(),

  // Person fields
  birthDate: date(),
  maritalStatus: text(),
  nationality: text(),
  occupation: text(),

  // Enterprise fields
  fantasyName: text(),
  representativeName: text(),

  // Contact fields
  email: text().notNull(),
  phones: jsonb(),

  // System fields
  lastUpdatedBy: uuid()
    .references(() => users.id)
    .notNull(),
  lastUpdatedAt: timestamp().defaultNow().notNull(),
  createdBy: uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
