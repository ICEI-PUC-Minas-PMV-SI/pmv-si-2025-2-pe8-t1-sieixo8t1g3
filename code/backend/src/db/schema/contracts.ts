import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { processes } from "./processes.ts";
import { users } from "./users.ts";

export const contracts = pgTable("contracts", {
	id: uuid().defaultRandom().primaryKey(),
	process: uuid("process")
		.references(() => processes.id)
		.notNull(),

	contractNumber: text(),
	contractValue: text(), // valorContrato
	contractPercentage: text(), // percentualContrato
	attorneyFees: text(), // honorariosAdvocaticios
	sucumbencyFees: text(), // honorariosSucumbencia

	amountToReceive: text(), // valorReceber
	dueDate: date(), // dataVencimento
	paymentMethod: text(), // formaPagamento
	financialStatus: text(), // statusFinanceiro
	installmentsNumber: text(), // numeroParcelas
	paymentDate: date(), // dataPagamento

	contractTemplate: text(),

	lastUpdatedBy: uuid()
		.references(() => users.id)
		.notNull(),
	lastUpdatedAt: timestamp().defaultNow().notNull(),
	createdBy: uuid()
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
