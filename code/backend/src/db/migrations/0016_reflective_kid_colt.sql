ALTER TABLE "addresses" DROP CONSTRAINT "addresses_client_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_client_clients_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;