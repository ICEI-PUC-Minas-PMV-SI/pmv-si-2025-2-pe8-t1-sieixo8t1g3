import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

const contractDTO = z.object({
	process: z.uuid(),

	contractNumber: z.string().nullable(),
	contractValue: z.string().nullable(),
	contractPercentage: z.string().nullable(),
	attorneyFees: z.string().nullable(),
	sucumbencyFees: z.string().nullable(),

	amountToReceive: z.string().nullable(),
	dueDate: z.string().nullable(),
	paymentMethod: z.string().nullable(),
	financialStatus: z.string().nullable(),
	installmentsNumber: z.string().nullable(),
	paymentDate: z.string().nullable(),

	contractTemplate: z.string().nullable(),
});

export const contractsRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/contracts",
		{
			preHandler: [app.authenticate],
			schema: {
				body: contractDTO,
			},
		},
		async (req, reply) => {
			const [contract] = await db
				.insert(schema.contracts)
				.values({
					...req.body,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send(contract);
		},
	);

	app.patch(
		"/contracts/:id",
		{
			preHandler: [app.authenticate],
			schema: {
				body: contractDTO,
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { id } = req.params;

			const [contract] = await db
				.update(schema.contracts)
				.set({
					...req.body,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date(),
				})
				.where(eq(schema.contracts.id, id))
				.returning();

			reply.code(200).send(contract);
		},
	);

	app.get(
		"/contracts",
		{ preHandler: [app.authenticate] },
		async (req, reply) => {
			const contracts = await db.select().from(schema.contracts);
			reply.send(contracts);
		},
	);

	app.get(
		"/contracts/:id",
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
			const [contract] = await db
				.select()
				.from(schema.contracts)
				.where(eq(schema.contracts.id, id));
			reply.send(contract);
		},
	);
};
