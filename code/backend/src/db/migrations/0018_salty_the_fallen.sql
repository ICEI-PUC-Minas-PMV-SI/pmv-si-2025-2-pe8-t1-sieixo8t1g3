CREATE TABLE "court_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"active" boolean NOT NULL,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_court_type_courts_id_fk";
--> statement-breakpoint
ALTER TABLE "courts" ADD COLUMN "court_type" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "court_types" ADD CONSTRAINT "court_types_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_types" ADD CONSTRAINT "court_types_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_court_type_court_types_id_fk" FOREIGN KEY ("court_type") REFERENCES "public"."court_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_court_type_court_types_id_fk" FOREIGN KEY ("court_type") REFERENCES "public"."court_types"("id") ON DELETE no action ON UPDATE no action;