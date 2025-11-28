import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

const ADMIN_ID = randomUUID();

async function seedTable(
	tableName: string,
	tableSchema: any,
	fileName: string,
) {
	const records = await db.select().from(tableSchema);
	if (records.length === 0) {
		const filePath = join(process.cwd(), "src/db/seed/data", fileName);
		const data = JSON.parse(readFileSync(filePath, "utf-8"));
		const now = new Date();

		let items = [];

		if (tableName === "courts") {
			items = data.map(
				(item: {
					id: string;
					name: string;
					courtType?: string;
					active: boolean;
				}) => ({
					id: item.id,
					name: item.name,
					courtType: item.courtType,
					active: item.active,
					createdBy: ADMIN_ID,
					createdAt: now,
					lastUpdatedBy: ADMIN_ID,
					lastUpdatedAt: now,
				}),
			);
		} else {
			items = data.map(
				(item: { id: string; name: string; active: boolean }) => ({
					id: item.id,
					name: item.name,
					active: item.active,
					createdBy: ADMIN_ID,
					createdAt: now,
					lastUpdatedBy: ADMIN_ID,
					lastUpdatedAt: now,
				}),
			);
		}

		await db.insert(tableSchema).values(items);
		console.log(`✅ Inserted ${items.length} records into ${tableName}`);
	} else {
		console.log(`ℹ️ ${tableName} already has data, skipping...`);
	}
}

async function seed() {
	console.log("Starting database seed...");

	const roles = await db.select().from(schema.roles);

	if (roles.length === 0) {
		console.log("Creating roles...");

		await db.insert(schema.roles).values([
			{ name: "Administrador", identifier: "admin" },
			{ name: "Advogado", identifier: "lawyer" },
		]);

		console.log("Roles created successfully!");
	} else {
		console.log("Roles already exist, skipping...");
	}

	const [adminRole] = await db
		.select()
		.from(schema.roles)
		.where(eq(schema.roles.identifier, "admin"));
	const [lawyerRole] = await db
		.select()
		.from(schema.roles)
		.where(eq(schema.roles.identifier, "lawyer"));

	const users = await db.select().from(schema.users);

	if (users.length === 0) {
		console.log("Creating users...");

		const adminPwd = await bcrypt.hash("juris.admin", 12);
		const lawyerPwd = await bcrypt.hash("juris.advogado", 12);

		await db.insert(schema.users).values([
			{
				id: ADMIN_ID,
				name: "Administrador",
				cpf: "000.000.000-00",
				email: "admin@juris.com.br",
				password: adminPwd,
				role: adminRole.id,
			},
			{
				name: "Advogado",
				cpf: "111.111.111-11",
				email: "advogado@juris.com.br",
				password: lawyerPwd,
				role: lawyerRole.id,
			},
		]);

		console.log("Users created successfully!");
	} else {
		console.log("Users already exist, skipping...");
	}

	await seedTable("competencies", schema.competencies, "competencies.json");
	await seedTable("courtTypes", schema.courtTypes, "courtTypes.json");
	await seedTable("courts", schema.courts, "courts.json");
	await seedTable("jurisdictions", schema.jurisdictions, "jurisdictions.json");
	await seedTable(
		"proceduralStages",
		schema.proceduralStages,
		"proceduralStages.json",
	);
	await seedTable("status", schema.status, "status.json");

	console.log("Seed completed!");

	process.exit(0);
}

seed().catch((err) => {
	console.error("Seed failed: ", err);
	process.exit(1);
});
