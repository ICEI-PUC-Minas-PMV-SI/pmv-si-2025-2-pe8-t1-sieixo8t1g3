import jwt from "@fastify/jwt";
import fp from "fastify-plugin";

import { env } from "../env.ts";

export default fp(async (app) => {
	app.register(jwt, {
		secret: env.JWT_SECRET,
		cookie: {
			cookieName: "token",
			signed: false,
		},
	});

	app.decorate("authenticate", async (req: any, reply: any) => {
		try {
			await req.jwtVerify();
		} catch (_) {
			reply.code(401).send({ messaage: "Não autorizado!" });
		}
	});
});
