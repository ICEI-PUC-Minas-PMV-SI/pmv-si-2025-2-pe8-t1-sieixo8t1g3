import {
	char,
	date,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
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

export const addresses = pgTable("addresses", {
	id: uuid().defaultRandom().primaryKey(),
	client: uuid()
		.references(() => clients.id, { onDelete: "cascade" })
		.notNull(),
	zipCode: varchar({ length: 10 }).notNull(),
	state: char({ length: 2 }).notNull(),
	city: text().notNull(),
	neighborhood: text().notNull(),
	street: text().notNull(),
	number: text().notNull(),
	complement: text(),
});
