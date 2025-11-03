import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

export const processesRoutes: FastifyPluginCallbackZod = (app) => {
  app.get("/processes",
    { preHandler: [app.authenticate] },
    async (_req, reply) => {
      const processes = await db.select().from(schema.processes);

      reply.send({ processes: processes });
    });

  app.get(
    "/processes/:id",
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
      const [process] = await db
        .select()
        .from(schema.processes)
        .where(eq(schema.processes.id, id));
      reply.send(process);
    },
  );

  app.post(
    "/processes",
    {
      preHandler: [app.authenticate],
      schema: {
        body: z.object({
          client: z.uuid(),
          processNumber: z.string().optional(),
          distributionDate: z.string().optional(),
          lawyer: z.string().optional(),
          proceduralHub: z.string().optional(),
          opposingParty: z.string().optional(),
          lawsuitType: z.string().optional(),
          value: z.string().optional(),
          object: z.string().optional(),
          court: z.uuid().optional(),
          courtType: z.uuid().optional(),
          state: z.string().optional(),
          district: z.string().optional(),
          branch: z.string().optional(),
          jurisdiction: z.string().optional(),
          competence: z.string().optional(),
          status: z.string().optional(),
          proceduralStage: z.string().optional(),
          priority: z.string().optional(),
          nextDeadline: z.date().optional(),
          processLink: z.url().optional(),
          note: z.string().optional(),
          feeAgreementNumber: z.string().optional(),
          feeAgreementValue: z.string().optional(),
          feeAgreementPercentage: z.string().optional(),
          attorneyFees: z.string().optional(),
          losingPartyLegalFees: z.string().optional(),
        }),
      } as const,
    },
    async (req, reply) => {
      const {
        client,
        processNumber,
        distributionDate,
        lawyer,
        proceduralHub,
        opposingParty,
        lawsuitType,
        value,
        object,
        court,
        courtType,
        state,
        district,
        branch,
        jurisdiction,
        competence,
        status,
        proceduralStage,
        priority,
        nextDeadline,
        processLink,
        note,
        feeAgreementNumber,
        feeAgreementValue,
        feeAgreementPercentage,
        attorneyFees,
        losingPartyLegalFees,
      } = req.body;

      const [process] = await db
        .insert(schema.processes)
        .values({
          client,
          processNumber,
          distributionDate,
          lawyer,
          proceduralHub,
          opposingParty,
          lawsuitType,
          value,
          object,
          court,
          courtType,
          state,
          district,
          branch,
          jurisdiction,
          competence,
          status,
          proceduralStage,
          priority,
          nextDeadline,
          processLink,
          note,
          feeAgreementNumber,
          feeAgreementValue,
          feeAgreementPercentage,
          attorneyFees,
          losingPartyLegalFees,
          createdBy: req.user.id,
          lastUpdatedBy: req.user.id,
        })
        .returning();

      reply
        .code(200)
        .send(process);
    },
  );

  app.patch(
    "/processes/:id",
    {
      preHandler: [app.authenticate],
      schema: {
        body: z.object({
          client: z.uuid(),
          processNumber: z.string().optional(),
          distributionDate: z.string().optional(),
          lawyer: z.string().optional(),
          proceduralHub: z.string().optional(),
          opposingParty: z.string().optional(),
          lawsuitType: z.string().optional(),
          value: z.string().optional(),
          object: z.string().optional(),

          court: z.uuid().optional(),
          courtType: z.uuid().optional(),

          state: z.string().optional(),
          district: z.string().optional(),
          branch: z.string().optional(),

          jurisdiction: z.string().optional(),
          competence: z.string().optional(),
          status: z.string().optional(),
          proceduralStage: z.string().optional(),

          priority: z.string().optional(),
          nextDeadline: z.date().optional(),
          processLink: z.url().optional(),
          note: z.string().optional(),

          feeAgreementNumber: z.string().optional(),
          feeAgreementValue: z.string().optional(),
          feeAgreementPercentage: z.string().optional(),
          attorneyFees: z.string().optional(),
          losingPartyLegalFees: z.string().optional(),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (req, reply) => {
      const {
        client,
        processNumber,
        distributionDate,
        lawyer,
        proceduralHub,
        opposingParty,
        lawsuitType,
        value,
        object,
        court,
        courtType,
        state,
        district,
        branch,
        jurisdiction,
        competence,
        status,
        proceduralStage,
        priority,
        nextDeadline,
        processLink,
        note,
        feeAgreementNumber,
        feeAgreementValue,
        feeAgreementPercentage,
        attorneyFees,
        losingPartyLegalFees,
      } = req.body;
      const { id } = req.params;

      const [process] = await db
        .update(schema.processes)
        .set({
          client,
          processNumber,
          distributionDate,
          lawyer,
          proceduralHub,
          opposingParty,
          lawsuitType,
          value,
          object,
          court,
          courtType,
          state,
          district,
          branch,
          jurisdiction,
          competence,
          status,
          proceduralStage,
          priority,
          nextDeadline,
          processLink,
          note,
          feeAgreementNumber,
          feeAgreementValue,
          feeAgreementPercentage,
          attorneyFees,
          losingPartyLegalFees,
          lastUpdatedBy: req.user.id,
          lastUpdatedAt: new Date()
        })
        .where(eq(schema.processes.id, id))
        .returning();

      reply.code(200).send(process);
    },
  );

};
