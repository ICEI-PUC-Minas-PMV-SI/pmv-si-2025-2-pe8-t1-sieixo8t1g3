import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const usersRoutes: FastifyPluginCallbackZod = (app) => {
  // app.patch(
  //   "/users/:id",
  //   {
  //     preHandler: [app.authenticate],
  //     schema: {
  //       body: z.object({
  //         name: z.string().min(1),
  //         active: z.boolean(),
  //       }),
  //       params: z.object({
  //         id: z.string(),
  //       }),
  //     },
  //   },
  //   async (req, reply) => {
  //     const { name, active } = req.body;
  //     const { id } = req.params;
  //
  //     const [court] = await db
  //       .update(schema.court)
  //       .set({
  //         name,
  //         active,
  //         lastUpdatedBy: req.user.id,
  //         lastUpdatedAt: new Date()
  //       })
  //       .where(eq(schema.court.id, id))
  //       .returning();
  //
  //     reply.code(200).send({ id: court.id, name: court.name, active: court.active });
  //   },
  // );

  app.get("/users",
    { preHandler: [app.authenticate] },
    async (req, reply) => {
      const users = await db.select().from(schema.users);
      reply.send(users);
    });

  app.get(
    "/users/:id",
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
      const [user] = await db
        .select()
        .from(schema.court)
        .where(eq(schema.court.id, id));
      reply.send(user);
    },
  );
};

