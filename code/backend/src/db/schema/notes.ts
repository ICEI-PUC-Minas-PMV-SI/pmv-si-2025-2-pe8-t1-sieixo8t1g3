import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.ts";
import { processes } from "./processes.ts";

export const notes = pgTable("notes", {
  id: uuid().defaultRandom().primaryKey(),
  process: uuid()
    .references(() => processes.id)
    .notNull(),
  content: text().notNull(),
  createdBy: uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
