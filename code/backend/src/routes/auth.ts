import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

const SALT_ROUNDS = 12;

export const authRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/register",
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          cpf: z.string().length(14),
          email: z.email(),
          password: z.string().min(1),
          role: z.uuid(),
        }),
      },
    },
    async (req, reply) => {
      const { name, cpf, email, password, role } = req.body;

      const emailInUse = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email));
      if (emailInUse.length > 0) {
        return reply.code(400).send({ message: "O e-mail já está em uso!" });
      }

      const cpfInUse = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.cpf, cpf));
      if (cpfInUse.length > 0) {
        return reply.code(400).send({ message: "O CPF já está em uso!" });
      }

      const hashPwd = await bcrypt.hash(password, SALT_ROUNDS);

      const [user] = await db
        .insert(schema.users)
        .values({
          name,
          cpf,
          email,
          password: hashPwd,
          role,
        })
        .returning();

      reply.code(200).send({ id: user.id, email: user.email });
    },
  );

  app.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string().min(1),
        }),
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;
      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email));

      const [role] = await db
        .select()
        .from(schema.roles)
        .where(eq(schema.roles.id, user.role));

      if (!user) {
        return reply.code(401).send({ message: "E-mail ou senha inválidos!" });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return reply.code(401).send({ message: "E-mail ou senha inválidos!" });
      }

      const token = app.jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: role.identifier,
      });

      reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        })
        // .send({ message: "Usuário autorizado com sucesso!" });
        .send({ id: user.id, name: user.name, email: user.email, role: role.identifier });
    },
  );

  app.post("/logout", async (_req, reply) => {
    reply
      .clearCookie("token")
      .send({ message: "Usuário desconectado com sucesso!" });
  });

  app.get("/user", { preHandler: [app.authenticate] }, async (req, reply) => {
    reply.send(req.user);
  });
};
