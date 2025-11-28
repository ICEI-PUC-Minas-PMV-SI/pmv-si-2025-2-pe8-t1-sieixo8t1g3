import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const courtsRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/courts",
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
				.insert(schema.courts)
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
		"/courts/:id",
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
				.update(schema.courts)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.courts.id, id))
				.returning();

			reply.code(200).send({ id: court.id, name: court.name, active: court.active });
		},
	);

	app.get("/courts", { preHandler: [app.authenticate] }, async (req, reply) => {
		const courts = await db.select().from(schema.courts);
		reply.send(courts);
	});

	app.get(
		"/courts/:id",
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
				.from(schema.courts)
				.where(eq(schema.courts.id, id));
			reply.send(court);
		},
	);
};
