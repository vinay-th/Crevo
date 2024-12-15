ALTER TABLE "project" ALTER COLUMN "isTemplate" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "isPro" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "updatedAt" timestamp NOT NULL;