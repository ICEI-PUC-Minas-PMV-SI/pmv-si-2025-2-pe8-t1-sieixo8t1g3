import { eq, like } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";
import { alias } from "drizzle-orm/pg-core";

export const clientsRoutes: FastifyPluginCallbackZod = (app) => {
  app.get("/clients",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: z.object({
          name: z.string().optional(),
          document: z.string().optional(),
        }),
      },
    }, async (req, reply) => {
      const { name, document } = req.query;

      const address = alias(schema.addresses, "address");
      const query = db.select().from(schema.clients)
        .leftJoin(
          address,
          eq(address.client, schema.clients.id)
        );

      if (name) {
        query.where(like(schema.clients.name, `%${name}%`));
      }

      if (document) {
        query.where(eq(schema.clients.document, document));
      }

      const clients = await query;

      reply.send(clients.map(({ clients, address }) => ({ ...clients, address })));
    });

  app.get(
    "/clients/:id",
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
      const [client] = await db
        .select()
        .from(schema.clients)
        .where(eq(schema.clients.id, id));
      reply.send(client);
    },
  );

  app.post(
    "/clients",
    {
      preHandler: [app.authenticate],
      schema: {
        body: z.object({
          id: z.uuid().optional(),
          type: z.string().min(1).max(4),
          document: z.string().max(14).optional().nullable(),
          name: z.string().min(1),

          // Person fields
          birthDate: z.string().optional().nullable(),
          maritalStatus: z.string().optional().nullable(),
          nationality: z.string().optional().nullable(),
          occupation: z.string().optional().nullable(),

          // Enterprise fields
          fantasyName: z.string().optional().nullable(),
          representativeName: z.string().optional().nullable(),

          // Contact fields
          email: z.email(),
          phones: z
            .union([
              z.array(z.string()),
              z.record(z.string(), z.string()),
              z.null(),
            ])
            .optional()
            .nullable(),

          // System fields
          address: z.object({
            zipCode: z.string().max(10),
            state: z.string().min(2).max(2),
            city: z.string().min(3),
            street: z.string().min(3),
            number: z.string().min(1),
            complement: z.string().optional(),
          }),
        }),
      } as const,
    },
    async (req, reply) => {
      const {
        type,
        document,
        name,
        birthDate,
        maritalStatus,
        nationality,
        occupation,
        fantasyName,
        representativeName,
        email,
        phones,
        address
      } = req.body;

      const [client] = await db
        .insert(schema.clients)
        .values({
          type,
          document,
          name,
          email,
          phones,
          birthDate,
          maritalStatus,
          nationality,
          occupation,
          fantasyName,
          representativeName,
          createdBy: req.user.id,
          lastUpdatedBy: req.user.id,
        })
        .returning();

      await db.insert(schema.addresses).values({
        client: client.id,
        zipCode: address.zipCode,
        state: address.state,
        city: address.city,
        street: address.street,
        number: address.number,
        complement: address.complement,
      });

      reply
        .code(200)
        .send(client);
    },
  );

  app.patch(
    "/clients/:id",
    {
      preHandler: [app.authenticate],
      schema: {
        body: z.object({
          type: z.string().min(1).max(4),
          document: z.string().max(14).optional().nullable(),
          name: z.string().min(1),

          // Person fields
          birthDate: z.string().optional().nullable(),
          maritalStatus: z.string().optional().nullable(),
          nationality: z.string().optional().nullable(),
          occupation: z.string().optional().nullable(),

          // Enterprise fields
          fantasyName: z.string().optional().nullable(),
          representativeName: z.string().optional().nullable(),

          // Contact fields
          email: z.email(),
          phones: z
            .union([
              z.array(z.string()),
              z.record(z.string(), z.string()),
              z.null(),
            ])
            .optional()
            .nullable(),

          address: z.object({
            zipCode: z.string().max(10),
            state: z.string().min(2).max(2),
            city: z.string().min(3),
            street: z.string().min(3),
            number: z.string().min(1),
            complement: z.string().optional(),
          }),
        }),
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (req, reply) => {
      const {
        type,
        document,
        name,
        birthDate,
        maritalStatus,
        nationality,
        occupation,
        fantasyName,
        representativeName,
        email,
        phones,
        address
      } = req.body;
      const { id } = req.params;

      const [client] = await db
        .update(schema.clients)
        .set({
          type,
          document,
          name,
          birthDate,
          maritalStatus,
          nationality,
          occupation,
          fantasyName,
          representativeName,
          email,
          phones,
          lastUpdatedBy: req.user.id,
          lastUpdatedAt: new Date()
        })
        .where(eq(schema.clients.id, id))
        .returning();

      await db.update(schema.addresses).set({
        client: client.id,
        zipCode: address.zipCode,
        state: address.state,
        city: address.city,
        street: address.street,
        number: address.number,
        complement: address.complement,
      }).where(eq(schema.addresses.id, id));

      reply.code(200).send(client);
    },
  );

};
