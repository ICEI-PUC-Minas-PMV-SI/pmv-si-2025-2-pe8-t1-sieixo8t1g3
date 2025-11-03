import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	identifier: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
