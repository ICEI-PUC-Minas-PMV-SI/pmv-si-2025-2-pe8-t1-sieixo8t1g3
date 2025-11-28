import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const jurisdictionsRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/jurisdictions",
		{
			preHandler: [app.authenticate],
			schema: {
				body: z.object({
					name: z.string().min(1),
					active: z.boolean(),
				}),
			},
		},
		async (req, reply) => {
			const { name, active } = req.body;

			const [jurisdiction] = await db
				.insert(schema.jurisdictions)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send({ id: jurisdiction.id, name: jurisdiction.name, active: jurisdiction.active });
		},
	);

	app.patch(
		"/jurisdictions/:id",
		{
			preHandler: [app.authenticate],
			schema: {
				body: z.object({
					name: z.string().min(1),
					active: z.boolean(),
				}),
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (req, reply) => {
			const { name, active } = req.body;
			const { id } = req.params;

			const [jurisdiction] = await db
				.update(schema.jurisdictions)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.jurisdictions.id, id))
				.returning();

			reply.code(200).send({ id: jurisdiction.id, name: jurisdiction.name, active: jurisdiction.active });
		},
	);

	app.get("/jurisdictions", { preHandler: [app.authenticate] }, async (req, reply) => {
		const jurisdictions = await db.select().from(schema.jurisdictions);
		reply.send(jurisdictions);
	});

	app.get(
		"/jurisdictions/:id",
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
			const [jurisdiction] = await db
				.select()
				.from(schema.jurisdictions)
				.where(eq(schema.jurisdictions.id, id));
			reply.send(jurisdiction);
		},
	);
};
