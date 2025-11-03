CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"process" uuid NOT NULL,
	"content" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client" uuid NOT NULL,
	"process_number" text,
	"distribution_date" date,
	"lawyer" text,
	"procedural_hub" text,
	"opposing_party" text,
	"lawsuit_type" text,
	"value" numeric,
	"object" text,
	"court" uuid NOT NULL,
	"court_type" uuid NOT NULL,
	"state" text,
	"district" text,
	"branch" text,
	"jurisdiction" uuid NOT NULL,
	"competence" uuid NOT NULL,
	"status" uuid NOT NULL,
	"procedural_stage" uuid NOT NULL,
	"priority" text,
	"next_deadline" timestamp,
	"process_link" text,
	"note" text,
	"fee_agreement_number" text,
	"fee_agreement_value" numeric,
	"fee_agreement_percentage" numeric,
	"attorney_fees" numeric,
	"losing_party_legal_fees" numeric,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_process_processes_id_fk" FOREIGN KEY ("process") REFERENCES "public"."processes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_client_clients_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_court_court_id_fk" FOREIGN KEY ("court") REFERENCES "public"."court"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_court_type_court_id_fk" FOREIGN KEY ("court_type") REFERENCES "public"."court"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_jurisdiction_jurisdiction_id_fk" FOREIGN KEY ("jurisdiction") REFERENCES "public"."jurisdiction"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_competence_competence_id_fk" FOREIGN KEY ("competence") REFERENCES "public"."competence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_status_status_id_fk" FOREIGN KEY ("status") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_procedural_stage_procedural_stage_id_fk" FOREIGN KEY ("procedural_stage") REFERENCES "public"."procedural_stage"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;