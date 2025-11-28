import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "./env.ts";
import { plugins } from "./plugins/index.ts";
import { routes } from "./routes/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: env.WEB_URL,
	credentials: true,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(plugins.cookiePlugin);
app.register(plugins.jwtPlugin);

app.get("/health", () => {
	return "Ok";
});

app.register(routes.authRoutes);
app.register(routes.contractsRoutes);
app.register(routes.courtsRoutes);
app.register(routes.courtTypesRoutes);
app.register(routes.clientsRoutes);
app.register(routes.proceduralStagesRoutes);
app.register(routes.jurisdictionsRoutes);
app.register(routes.competenciesRoutes);
app.register(routes.processesRoutes);
app.register(routes.usersRoutes);
app.register(routes.statusRoutes);

app.listen({ port: env.PORT });
