ALTER TABLE "processes" ALTER COLUMN "court" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "court_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "jurisdiction" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "competence" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "procedural_stage" DROP NOT NULL;