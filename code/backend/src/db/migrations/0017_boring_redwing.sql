ALTER TABLE "competence" RENAME TO "competencies";--> statement-breakpoint
ALTER TABLE "court" RENAME TO "courts";--> statement-breakpoint
ALTER TABLE "jurisdiction" RENAME TO "jurisdictions";--> statement-breakpoint
ALTER TABLE "procedural_stage" RENAME TO "procedural_stages";--> statement-breakpoint
ALTER TABLE "competencies" DROP CONSTRAINT "competence_last_updated_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "competencies" DROP CONSTRAINT "competence_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "courts" DROP CONSTRAINT "court_last_updated_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "courts" DROP CONSTRAINT "court_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "jurisdictions" DROP CONSTRAINT "jurisdiction_last_updated_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "jurisdictions" DROP CONSTRAINT "jurisdiction_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "procedural_stages" DROP CONSTRAINT "procedural_stage_last_updated_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "procedural_stages" DROP CONSTRAINT "procedural_stage_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_court_court_id_fk";
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_court_type_court_id_fk";
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_jurisdiction_jurisdiction_id_fk";
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_competence_competence_id_fk";
--> statement-breakpoint
ALTER TABLE "processes" DROP CONSTRAINT "processes_procedural_stage_procedural_stage_id_fk";
--> statement-breakpoint
ALTER TABLE "competencies" ADD CONSTRAINT "competencies_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competencies" ADD CONSTRAINT "competencies_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courts" ADD CONSTRAINT "courts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jurisdictions" ADD CONSTRAINT "jurisdictions_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jurisdictions" ADD CONSTRAINT "jurisdictions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procedural_stages" ADD CONSTRAINT "procedural_stages_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "procedural_stages" ADD CONSTRAINT "procedural_stages_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_court_courts_id_fk" FOREIGN KEY ("court") REFERENCES "public"."courts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_court_type_courts_id_fk" FOREIGN KEY ("court_type") REFERENCES "public"."courts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_jurisdiction_jurisdictions_id_fk" FOREIGN KEY ("jurisdiction") REFERENCES "public"."jurisdictions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_competence_competencies_id_fk" FOREIGN KEY ("competence") REFERENCES "public"."competencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_procedural_stage_procedural_stages_id_fk" FOREIGN KEY ("procedural_stage") REFERENCES "public"."procedural_stages"("id") ON DELETE no action ON UPDATE no action;