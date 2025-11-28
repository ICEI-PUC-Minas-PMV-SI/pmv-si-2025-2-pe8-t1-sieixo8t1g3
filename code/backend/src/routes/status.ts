import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const statusRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/status",
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

			const [status] = await db
				.insert(schema.status)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send({ id: status.id, name: status.name, active: status.active });
		},
	);

	app.patch(
		"/status/:id",
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

			const [status] = await db
				.update(schema.status)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.status.id, id))
				.returning();

			reply.code(200).send({ id: status.id, name: status.name, active: status.active });
		},
	);

	app.get("/status", { preHandler: [app.authenticate] }, async (req, reply) => {
		const status = await db.select().from(schema.status);
		reply.send(status);
	});

	app.get(
		"/status/:id",
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
			const [status] = await db
				.select()
				.from(schema.status)
				.where(eq(schema.status.id, id));
			reply.send(status);
		},
	);
};
