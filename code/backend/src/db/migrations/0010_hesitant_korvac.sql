ALTER TABLE "clients" RENAME COLUMN "cpf" TO "document";--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "birth_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "type" varchar(4) NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "marital_status" text;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "nationality" text;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "fantasy_name" text;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "representative_name" text;