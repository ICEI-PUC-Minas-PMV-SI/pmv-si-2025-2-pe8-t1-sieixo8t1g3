import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users.ts";
import { courtTypes } from "./courtTypes.ts";

export const courts = pgTable("courts", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    courtType: uuid()
        .references(() => courtTypes.id)
        .notNull(),
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
