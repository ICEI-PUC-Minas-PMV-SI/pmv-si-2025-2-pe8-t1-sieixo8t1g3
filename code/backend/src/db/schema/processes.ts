import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { clients } from "./clients.ts";
import { competencies } from "./competencies.ts";
import { courts } from "./courts.ts";
import { courtTypes } from "./courtTypes.ts";
import { jurisdictions } from "./jurisdictions.ts";
import { proceduralStages } from "./proceduralStages.ts";
import { status } from "./status.ts";
import { users } from "./users.ts";

export const processes = pgTable("processes", {
	id: uuid().defaultRandom().primaryKey(),
	client: uuid("client")
		.references(() => clients.id)
		.notNull(),
	processNumber: text(),
	distributionDate: date(),
	responsibleAttorney: text(),
	proceduralHub: text(),
	opposingParty: text(),
	actionType: text(),
	actionObject: text(),
	claimValue: text(),
	proceduralStage: uuid().references(() => proceduralStages.id),
	courtType: uuid().references(() => courtTypes.id),
	court: uuid().references(() => courts.id),
	state: text(),

	district: text(),
	branch: text(),
	jurisdiction: uuid().references(() => jurisdictions.id),
	competence: uuid().references(() => competencies.id),

	status: uuid().references(() => status.id),
	priority: text(),
	nextDeadline: date(),
	processLink: text(),
	note: text(),
	lastUpdatedBy: uuid()
		.references(() => users.id)
		.notNull(),
	lastUpdatedAt: timestamp().defaultNow().notNull(),
	createdBy: uuid()
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

export const expenses = pgTable("expenses", {
	id: uuid().defaultRandom().primaryKey(),
	process: uuid("process")
		.references(() => processes.id)
		.notNull(),
	amount: text(),
	purpose: text(),
	lastUpdatedBy: uuid()
		.references(() => users.id)
		.notNull(),
	lastUpdatedAt: timestamp().defaultNow().notNull(),
	createdBy: uuid()
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey(),
	process: uuid("process")
		.references(() => processes.id)
		.notNull(),

	type: text(),
	sentAt: timestamp({ mode: "string", withTimezone: true }),
	receivedAt: timestamp({ mode: "string", withTimezone: true }),
	notes: text(),

	lastUpdatedBy: uuid()
		.references(() => users.id)
		.notNull(),
	lastUpdatedAt: timestamp().defaultNow().notNull(),
	createdBy: uuid()
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

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
