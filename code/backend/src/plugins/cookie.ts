import cookie from "@fastify/cookie";
import fp from "fastify-plugin";

import { env } from "../env.ts";

export default fp(async (app) => {
	app.register(cookie, {
		secret: env.COOKIE_SECRET,
	});
});
