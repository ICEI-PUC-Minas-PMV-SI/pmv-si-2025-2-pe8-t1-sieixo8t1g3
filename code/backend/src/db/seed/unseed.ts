import { db } from "../connection.ts"; // your drizzle db instance
import {schema} from "../schema/index.ts"; // adjust the path to your schema files

async function unseed() {
  console.log("🔄 Clearing database…");

  // IMPORTANT: delete tables in reverse dependency order
  // So FK references don’t break.

  await db.delete(schema.addresses);
  await db.delete(schema.processes);
  await db.delete(schema.proceduralStages);
  await db.delete(schema.status);
  await db.delete(schema.competencies);
  await db.delete(schema.jurisdictions);
  await db.delete(schema.courts);
  await db.delete(schema.clients);
  await db.delete(schema.users);
  await db.delete(schema.roles);

  console.log("✔ Database is empty.");
}

unseed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
