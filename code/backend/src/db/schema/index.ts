import { addresses, clients } from "./clients.ts";
import { competencies } from "./competencies.ts";
import { contracts } from "./contracts.ts";
import { courts } from "./courts.ts";
import { courtTypes } from "./courtTypes.ts";
import { jurisdictions } from "./jurisdictions.ts";
import { proceduralStages } from "./proceduralStages.ts";
import { expenses, notes, notifications, processes } from "./processes.ts";
import { roles } from "./roles.ts";
import { status } from "./status.ts";
import { users } from "./users.ts";

export const schema = {
	addresses,
	clients,
	courtTypes,
	courts,
	contracts,
	competencies,
	jurisdictions,
	roles,
	status,
	proceduralStages,
	processes,
	expenses,
	notifications,
	notes,
	users,
};
