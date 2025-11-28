ALTER TABLE "processes" DROP CONSTRAINT "processes_contract_contracts_id_fk";
--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "process" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_process_processes_id_fk" FOREIGN KEY ("process") REFERENCES "public"."processes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "contract";