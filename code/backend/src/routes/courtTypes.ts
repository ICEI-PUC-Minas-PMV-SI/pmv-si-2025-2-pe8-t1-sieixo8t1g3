import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const courtTypesRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/courtTypes",
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

			const [courtType] = await db
				.insert(schema.courtTypes)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply
				.code(200)
				.send({
					id: courtType.id,
					name: courtType.name,
					active: courtType.active,
				});
		},
	);

	app.patch(
		"/courtTypes/:id",
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

			const [courtType] = await db
				.update(schema.courtTypes)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date(),
				})
				.where(eq(schema.courtTypes.id, id))
				.returning();

			reply
				.code(200)
				.send({
					id: courtType.id,
					name: courtType.name,
					active: courtType.active,
				});
		},
	);

	app.get(
		"/courtTypes",
		{ preHandler: [app.authenticate] },
		async (req, reply) => {
			const courtTypes = await db.select().from(schema.courtTypes);
			reply.send(courtTypes);
		},
	);

	app.get(
		"/courtTypes/:id",
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
			const [courtType] = await db
				.select()
				.from(schema.courtTypes)
				.where(eq(schema.courtTypes.id, id));
			reply.send(courtType);
		},
	);
};
