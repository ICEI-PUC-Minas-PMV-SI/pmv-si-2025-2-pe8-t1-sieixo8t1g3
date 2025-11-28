ALTER TABLE "contracts" ALTER COLUMN "contract_percentage" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contracts" ALTER COLUMN "amount_to_receive" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contracts" ADD COLUMN "contract_template" text;