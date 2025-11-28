CREATE TABLE "contracts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contract_number" text,
	"contract_value" numeric,
	"contract_percentage" numeric,
	"attorney_fees" numeric,
	"sucumbency_fees" text,
	"amount_to_receive" numeric,
	"due_date" date,
	"payment_method" text,
	"financial_status" text,
	"installments_number" text,
	"payment_date" date,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"process" uuid NOT NULL,
	"amount" numeric,
	"purpose" text,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"process" uuid NOT NULL,
	"type" text,
	"sent_at" timestamp,
	"received_at" timestamp,
	"notes" text,
	"last_updated_by" uuid NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "processes" RENAME COLUMN "lawyer" TO "responsible_attorney";--> statement-breakpoint
ALTER TABLE "processes" RENAME COLUMN "lawsuit_type" TO "action_type";--> statement-breakpoint
ALTER TABLE "processes" RENAME COLUMN "object" TO "action_object";--> statement-breakpoint
ALTER TABLE "processes" RENAME COLUMN "value" TO "claim_value";--> statement-breakpoint
ALTER TABLE "processes" ADD COLUMN "contract" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_process_processes_id_fk" FOREIGN KEY ("process") REFERENCES "public"."processes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_process_processes_id_fk" FOREIGN KEY ("process") REFERENCES "public"."processes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" ADD CONSTRAINT "processes_contract_contracts_id_fk" FOREIGN KEY ("contract") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "fee_agreement_number";--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "fee_agreement_value";--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "fee_agreement_percentage";--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "attorney_fees";--> statement-breakpoint
ALTER TABLE "processes" DROP COLUMN "losing_party_legal_fees";