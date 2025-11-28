CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client" uuid NOT NULL,
	"zip_code" char(10) NOT NULL,
	"state" char(2) NOT NULL,
	"city" text NOT NULL,
	"street" text NOT NULL,
	"number" text NOT NULL,
	"complement" text
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"cpf" char(14) NOT NULL,
	"email" text NOT NULL,
	"phones" jsonb,
	"birth_date" date NOT NULL,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "cpf" SET DATA TYPE char(14);--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_client_clients_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;