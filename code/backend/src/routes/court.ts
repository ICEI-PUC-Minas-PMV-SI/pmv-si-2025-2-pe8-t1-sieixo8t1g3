import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const courtRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/court",
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

			const [court] = await db
				.insert(schema.court)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send({ id: court.id, name: court.name, active: court.active });
		},
	);

	app.patch(
		"/court/:id",
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

			const [court] = await db
				.update(schema.court)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.court.id, id))
				.returning();

			reply.code(200).send({ id: court.id, name: court.name, active: court.active });
		},
	);

	app.get("/court", { preHandler: [app.authenticate] }, async (req, reply) => {
		const court = await db.select().from(schema.court);
		reply.send({ court: court });
	});

	app.get(
		"/court/:id",
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
			const [court] = await db
				.select()
				.from(schema.court)
				.where(eq(schema.court.id, id));
			reply.send(court);
		},
	);
};
