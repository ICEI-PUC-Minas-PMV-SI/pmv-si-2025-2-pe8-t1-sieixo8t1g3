ALTER TABLE "contracts" ALTER COLUMN "contract_value" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "attorney_fees" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "expenses" ALTER COLUMN "amount" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "claim_value" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "processes" ALTER COLUMN "next_deadline" SET DATA TYPE date;