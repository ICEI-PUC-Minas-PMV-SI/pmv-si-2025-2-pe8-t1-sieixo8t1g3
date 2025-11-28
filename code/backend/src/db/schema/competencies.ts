import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users.ts";

export const competencies = pgTable("competencies", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    active: boolean().notNull(),
    lastUpdatedBy: uuid()
        .references(() => users.id)
        .notNull(),
    lastUpdatedAt: timestamp().defaultNow().notNull(),
    createdBy: uuid()
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});
