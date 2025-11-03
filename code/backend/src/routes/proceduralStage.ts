import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const proceduralStageRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/procedural-stage",
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

			const [proceduralStage] = await db
				.insert(schema.proceduralStage)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send({ id: proceduralStage.id, name: proceduralStage.name, active: proceduralStage.active });
		},
	);

	app.patch(
		"/procedural-stage/:id",
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

			const [proceduralStage] = await db
				.update(schema.proceduralStage)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.proceduralStage.id, id))
				.returning();

			reply.code(200).send({ id: proceduralStage.id, name: proceduralStage.name, active: proceduralStage.active });
		},
	);

	app.get("/procedural-stage", { preHandler: [app.authenticate] }, async (req, reply) => {
		const proceduralStage = await db.select().from(schema.proceduralStage);
		reply.send({ proceduralStage: proceduralStage });
	});

	app.get(
		"/procedural-stage/:id",
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
			const [proceduralStage] = await db
				.select()
				.from(schema.proceduralStage)
				.where(eq(schema.proceduralStage.id, id));
			reply.send(proceduralStage);
		},
	);
};
