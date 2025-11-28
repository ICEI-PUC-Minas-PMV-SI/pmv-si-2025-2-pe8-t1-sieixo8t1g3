import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users.ts";

export const proceduralStages = pgTable("procedural_stages", {
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
