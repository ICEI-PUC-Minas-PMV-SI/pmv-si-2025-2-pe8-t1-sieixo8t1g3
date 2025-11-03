import { date, decimal, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

import { clients } from "./clients.ts";
import { court } from "./court.ts";
import { competence } from "./competence.ts";
import { jurisdiction } from "./jurisdiction.ts";
import { status } from "./status.ts";
import { users } from "./users.ts";
import { proceduralStage } from "./proceduralStage.ts";

export const processes = pgTable("processes", {
  id: uuid().defaultRandom().primaryKey(),
  client: uuid("client")
    .references(() => clients.id)
    .notNull(),
  processNumber: text(),
  distributionDate: date(),
  lawyer: text(),
  proceduralHub: text(),
  opposingParty: text(),
  lawsuitType: text(),
  value: decimal(),
  object: text(),
  court: uuid()
    .references(() => court.id),
  courtType: uuid()
    .references(() => court.id),
  state: text(),
  district: text(),
  branch: text(),
  jurisdiction: uuid()
    .references(() => jurisdiction.id),
  competence: uuid()
    .references(() => competence.id),
  status: uuid()
    .references(() => status.id),
  proceduralStage: uuid()
    .references(() => proceduralStage.id),
  priority: text(),
  nextDeadline: timestamp(),
  processLink: text(),
  note: text(),
  feeAgreementNumber: text(),
  feeAgreementValue: decimal(),
  feeAgreementPercentage: decimal(),
  attorneyFees: decimal(),
  losingPartyLegalFees: decimal(),
  lastUpdatedBy: uuid()
    .references(() => users.id)
    .notNull(),
  lastUpdatedAt: timestamp().defaultNow().notNull(),
  createdBy: uuid()
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
