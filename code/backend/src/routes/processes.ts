import { asc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const processDTO = z.object({
	client: z.uuid(),

	processNumber: z.string().nullable().optional(),
	distributionDate: z.string().nullable().optional(),
	responsibleAttorney: z.string().nullable().optional(),
	proceduralHub: z.string().nullable().optional(),
	opposingParty: z.string().nullable().optional(),
	actionType: z.string().nullable().optional(),
	actionObject: z.string().nullable().optional(),
	claimValue: z.string().nullable().optional(),

	proceduralStage: z.uuid().nullable().optional(),
	courtType: z.uuid().nullable().optional(),
	court: z.uuid().nullable().optional(),
	state: z.string().nullable().optional(),

	district: z.string().nullable().optional(),
	branch: z.string().nullable().optional(),
	jurisdiction: z.uuid().nullable().optional(),
	competence: z.uuid().nullable().optional(),

	status: z.uuid().nullable().optional(),
	priority: z.string().nullable().optional(),
	nextDeadline: z.string().nullable().optional(),
	processLink: z.string().nullable().optional(),
	note: z.string().nullable().optional(),
});

export const expenseDTO = z.object({
	id: z.uuid().nullable(),
	amount: z.string(), // valor
	purpose: z.string(), // finalidade
});

export const notificationDTO = z.object({
	id: z.uuid().nullable(),
	type: z.string(),
	sentAt: z.iso.datetime(), // dataEnvio
	receivedAt: z.iso.datetime(), // dataRecebimento
	notes: z.string().optional(),
});

export const processesRoutes: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/processes",
		{ preHandler: [app.authenticate] },
		async (_req, reply) => {
			const createdBy = alias(schema.users, "created_by");
			const updatedBy = alias(schema.users, "updated_by");

			const result = await db
				.select({
					process: schema.processes,
					client: schema.clients,
					status: schema.status,
					court: schema.courts,
					courtType: schema.courtTypes,
					competence: schema.competencies,
					jurisdiction: schema.jurisdictions,
					proceduralStage: schema.proceduralStages,
					createdBy: createdBy,
					lastUpdatedBy: updatedBy,
				})
				.from(schema.processes)
				.leftJoin(
					schema.clients,
					eq(schema.processes.client, schema.clients.id),
				)
				.leftJoin(schema.status, eq(schema.processes.status, schema.status.id))
				.leftJoin(schema.courts, eq(schema.processes.court, schema.courts.id))
				.leftJoin(
					schema.courtTypes,
					eq(schema.processes.courtType, schema.courtTypes.id),
				)
				.leftJoin(
					schema.competencies,
					eq(schema.processes.competence, schema.competencies.id),
				)
				.leftJoin(
					schema.jurisdictions,
					eq(schema.processes.jurisdiction, schema.jurisdictions.id),
				)
				.leftJoin(
					schema.proceduralStages,
					eq(schema.processes.proceduralStage, schema.proceduralStages.id),
				)
				.leftJoin(createdBy, eq(schema.processes.createdBy, createdBy.id))
				.leftJoin(updatedBy, eq(schema.processes.lastUpdatedBy, updatedBy.id));

			const processes = result.map((row) => ({
				...row.process,
				client: row.client ?? null,
				status: row.status
					? { id: row.status.id, name: row.status.name }
					: null,
				court: row.court ? { id: row.court.id, name: row.court.name } : null,
				courtType: row.courtType
					? { id: row.courtType.id, name: row.courtType.name }
					: null,
				competence: row.competence
					? { id: row.competence.id, name: row.competence.name }
					: null,
				jurisdiction: row.jurisdiction
					? { id: row.jurisdiction.id, name: row.jurisdiction.name }
					: null,
				proceduralStage: row.proceduralStage
					? { id: row.proceduralStage.id, name: row.proceduralStage.name }
					: null,
				createdBy: row.createdBy
					? { id: row.createdBy.id, name: row.createdBy.name }
					: null,
				lastUpdatedBy: row.lastUpdatedBy
					? { id: row.lastUpdatedBy.id, name: row.lastUpdatedBy.name }
					: null,
			}));

			reply.send(processes);
		},
	);

	app.get(
		"/processes/:id",
		{
			preHandler: [app.authenticate],
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { id } = req.params;
			const createdBy = alias(schema.users, "created_by");
			const updatedBy = alias(schema.users, "updated_by");

			const [result] = await db
				.select({
					process: schema.processes,
					client: schema.clients,
					status: schema.status,
					court: schema.courts,
					courtType: schema.courtTypes,
					competence: schema.competencies,
					jurisdiction: schema.jurisdictions,
					proceduralStage: schema.proceduralStages,
					createdBy: createdBy,
					lastUpdatedBy: updatedBy,
				})
				.from(schema.processes)
				.leftJoin(
					schema.clients,
					eq(schema.processes.client, schema.clients.id),
				)
				.leftJoin(schema.status, eq(schema.processes.status, schema.status.id))
				.leftJoin(schema.courts, eq(schema.processes.court, schema.courts.id))
				.leftJoin(
					schema.courtTypes,
					eq(schema.processes.courtType, schema.courtTypes.id),
				)
				.leftJoin(
					schema.competencies,
					eq(schema.processes.competence, schema.competencies.id),
				)
				.leftJoin(
					schema.jurisdictions,
					eq(schema.processes.jurisdiction, schema.jurisdictions.id),
				)
				.leftJoin(
					schema.proceduralStages,
					eq(schema.processes.proceduralStage, schema.proceduralStages.id),
				)
				.leftJoin(createdBy, eq(schema.processes.createdBy, createdBy.id))
				.leftJoin(updatedBy, eq(schema.processes.lastUpdatedBy, updatedBy.id))
				.where(eq(schema.processes.id, id))
				.orderBy(asc(schema.processes.lastUpdatedAt));

			const [contract] = await db
				.select()
				.from(schema.contracts)
				.where(eq(schema.contracts.process, id));

			const expenses = await db
				.select()
				.from(schema.expenses)
				.where(eq(schema.expenses.process, id))
				.orderBy(asc(schema.expenses.createdAt));

			const notifications = await db
				.select()
				.from(schema.notifications)
				.where(eq(schema.notifications.process, id))
				.orderBy(asc(schema.notifications.createdAt));

			const notes = await db
				.select()
				.from(schema.notes)
				.where(eq(schema.notes.process, id))
				.orderBy(asc(schema.notes.createdAt));

			const process = {
				...result.process,
				client: result.client ?? null,
				status: result.status
					? { id: result.status.id, name: result.status.name }
					: null,
				court: result.court
					? { id: result.court.id, name: result.court.name }
					: null,
				courtType: result.courtType
					? { id: result.courtType.id, name: result.courtType.name }
					: null,
				competence: result.competence
					? { id: result.competence.id, name: result.competence.name }
					: null,
				jurisdiction: result.jurisdiction
					? { id: result.jurisdiction.id, name: result.jurisdiction.name }
					: null,
				proceduralStage: result.proceduralStage
					? { id: result.proceduralStage.id, name: result.proceduralStage.name }
					: null,
				contract,
				expenses,
				notifications,
				notes,
				createdBy: result.createdBy
					? { id: result.createdBy.id, name: result.createdBy.name }
					: null,

				lastUpdatedBy: result.lastUpdatedBy
					? { id: result.lastUpdatedBy.id, name: result.lastUpdatedBy.name }
					: null,
			};

			reply.send(process);
		},
	);

	app.post(
		"/processes",
		{
			//@ts-ignore
			preHandler: [app.authenticate],
			schema: {
				body: z.object({
					process: processDTO,
					notifications: z.array(notificationDTO).optional(),
					expenses: z.array(expenseDTO).optional(),
				}),
			} as const,
		},
		async (req, reply) => {
			const result = await db.transaction(async (tx) => {
				const [process] = await tx
					.insert(schema.processes)
					.values({
						...req.body.process,
						createdBy: req.user.id,
						lastUpdatedBy: req.user.id,
					})
					.returning();

				if (process.note) {
					await tx.insert(schema.notes).values({
						process: process.id,
						content: process.note,
						createdBy: req.user.id,
					});
				}

				if (req.body.notifications) {
					const notifications = req.body.notifications.map((item) => ({
						type: item.type,
						sentAt: item.sentAt,
						receivedAt: item.receivedAt,
						notes: item.notes,
						process: process.id,
						createdBy: req.user.id,
						lastUpdatedBy: req.user.id,
					}));
					await tx.insert(schema.notifications).values(notifications);
				}

				if (req.body.expenses) {
					const expenses = req.body.expenses.map((item) => ({
						amount: item.amount,
						purpose: item.purpose,
						process: process.id,
						createdBy: req.user.id,
						lastUpdatedBy: req.user.id,
					}));
					await tx.insert(schema.expenses).values(expenses);
				}

				return {
					process,
				};
			});

			reply.code(200).send(result);
		},
	);

	app.patch(
		"/processes/:id",
		{
			preHandler: [app.authenticate],
			schema: {
				body: z.object({
					process: processDTO,
					notifications: z.array(notificationDTO).optional(),
					expenses: z.array(expenseDTO).optional(),
				}),
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { id } = req.params;
			const result = await db.transaction(async (tx) => {
				const [process] = await tx
					.update(schema.processes)
					.set({
						...req.body.process,
						lastUpdatedBy: req.user.id,
						lastUpdatedAt: new Date(),
					})
					.where(eq(schema.processes.id, id))
					.returning();

				const { notifications } = req.body;
				if (notifications && Array.isArray(notifications)) {
					// --- 1. Split new vs existing items ---
					const newItems = notifications.filter((item) => !item.id);
					const existingItems = notifications.filter((item) => item.id);

					// --- 2. Insert new notifications ---
					if (newItems.length > 0) {
						const insertPayload = newItems.map((item) => ({
							type: item.type,
							sentAt: item.sentAt,
							receivedAt: item.receivedAt,
							notes: item.notes,
							process: process.id,
							createdBy: req.user.id,
							lastUpdatedBy: req.user.id,
						}));

						await tx.insert(schema.notifications).values(insertPayload);
					}

					// --- 3. Update existing notifications ---
					if (existingItems.length > 0) {
						// Use Promise.all to ensure updates finish
						await Promise.all(
							existingItems.map((item) =>
								item.id &&
								tx
									.update(schema.notifications)
									.set({
										type: item.type,
										sentAt: item.sentAt,
										receivedAt: item.receivedAt,
										notes: item.notes,
										lastUpdatedBy: req.user.id,
										lastUpdatedAt: new Date(),
									})
									.where(eq(schema.notifications.id, item.id)),
							),
						);
					}
				}

				const { expenses } = req.body;
				if (expenses && Array.isArray(expenses)) {
					// --- 1. Split new vs existing items ---
					const newItems = expenses.filter((item) => !item.id);
					const existingItems = expenses.filter((item) => item.id);

					// --- 2. Insert new expenses ---
					if (newItems.length > 0) {
						const insertPayload = newItems.map((item) => ({
							amount: item.amount,
							purpose: item.purpose,
							process: process.id,
							createdBy: req.user.id,
							lastUpdatedBy: req.user.id,
						}));

						await tx.insert(schema.expenses).values(insertPayload);
					}

					// --- 3. Update existing expenses ---
					if (existingItems.length > 0) {
						// Use Promise.all to ensure updates finish
						await Promise.all(
							existingItems.map((item) =>
								item.id &&
								tx
									.update(schema.expenses)
									.set({
										amount: item.amount,
										purpose: item.purpose,
										lastUpdatedBy: req.user.id,
										lastUpdatedAt: new Date(),
									})
									.where(eq(schema.expenses.id, item.id)),
							),
						);
					}
				}

				return {
					process,
				};
			});

			reply.code(200).send(result);
		},
	);
};
