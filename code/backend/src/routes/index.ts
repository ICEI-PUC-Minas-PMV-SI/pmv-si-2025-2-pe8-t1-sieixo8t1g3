import { authRoutes } from "./auth.ts";
import { clientsRoutes } from "./clients.ts";
import { competenciesRoutes } from "./competencies.ts";
import { contractsRoutes } from "./contracts.ts";
import { courtTypesRoutes } from "./courtTypes.ts";
import { courtsRoutes } from "./courts.ts";
import { jurisdictionsRoutes } from "./jurisdictions.ts";
import { proceduralStagesRoutes } from "./proceduralStages.ts";
import { processesRoutes } from "./processes.ts";
import { statusRoutes } from "./status.ts";
import { usersRoutes } from "./users.ts";

export const routes = {
	authRoutes,
	clientsRoutes,
	competenciesRoutes,
	contractsRoutes,
	courtTypesRoutes,
	courtsRoutes,
	jurisdictionsRoutes,
	proceduralStagesRoutes,
	processesRoutes,
	statusRoutes,
	usersRoutes,
};
