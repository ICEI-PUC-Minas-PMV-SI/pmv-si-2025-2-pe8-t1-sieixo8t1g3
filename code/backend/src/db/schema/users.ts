import { char, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { roles } from "./roles.ts";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	cpf: char({ length: 14 }).notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: uuid()
		.references(() => roles.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
