import { authRoutes } from "./auth.ts";
import { clientsRoutes } from "./clients.ts";
import { competenceRoutes } from "./competence.ts";
import { courtRoutes } from "./court.ts";
import { jurisdictionRoutes } from "./jurisdiction.ts";
import { proceduralStageRoutes } from "./proceduralStage.ts";
import { processesRoutes } from "./processes.ts";
import { statusRoutes } from "./status.ts";
import { usersRoutes } from "./users.ts";

export const routes = {
  authRoutes,
  clientsRoutes,
  competenceRoutes,
  courtRoutes,
  jurisdictionRoutes,
  proceduralStageRoutes,
  processesRoutes,
  statusRoutes,
  usersRoutes
};
