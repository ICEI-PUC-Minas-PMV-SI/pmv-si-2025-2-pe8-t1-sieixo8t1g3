import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const competenciesRoutes: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/competencies",
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

			const [competence] = await db
				.insert(schema.competencies)
				.values({
					name,
					active,
					createdBy: req.user.id,
					lastUpdatedBy: req.user.id,
				})
				.returning();

			reply.code(200).send({ id: competence.id, name: competence.name, active: competence.active });
		},
	);

	app.patch(
		"/competencies/:id",
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

			const [competence] = await db
				.update(schema.competence)
				.set({
					name,
					active,
					lastUpdatedBy: req.user.id,
					lastUpdatedAt: new Date()
				})
				.where(eq(schema.competencies.id, id))
				.returning();

			reply.code(200).send({ id: competence.id, name: competence.name, active: competence.active });
		},
	);

	app.get("/competencies", { preHandler: [app.authenticate] }, async (req, reply) => {
		const competencies = await db.select().from(schema.competencies);
		reply.send(competencies);
	});

	app.get(
		"/competencies/:id",
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
			const [competence] = await db
				.select()
				.from(schema.competencies)
				.where(eq(schema.competencies.id, id));
			reply.send(competence);
		},
	);
};
