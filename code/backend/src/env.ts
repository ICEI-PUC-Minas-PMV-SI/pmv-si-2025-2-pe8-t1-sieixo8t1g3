import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(4000),
	DATABASE_URL: z.url().startsWith("postgresql://"),
	WEB_URL: z.url(),
	JWT_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
