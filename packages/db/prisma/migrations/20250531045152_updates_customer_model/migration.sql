/*
  Warnings:

  - A unique constraint covering the columns `[notification_preferences_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "notification_preferences_id" TEXT;

-- CreateTable
CREATE TABLE "notification_preferences" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "email" BOOLEAN NOT NULL DEFAULT true,
    "sms" BOOLEAN NOT NULL DEFAULT false,
    "marketing" BOOLEAN NOT NULL DEFAULT true,
    "order_updates" BOOLEAN NOT NULL DEFAULT true,
    "promotions" BOOLEAN NOT NULL DEFAULT true,
    "newsletters" BOOLEAN NOT NULL DEFAULT true,
    "feedback_requests" BOOLEAN NOT NULL DEFAULT true,
    "account_notifications" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_preferences_customer_id_key" ON "notification_preferences"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_notification_preferences_id_key" ON "customers"("notification_preferences_id");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_notification_preferences_id_fkey" FOREIGN KEY ("notification_preferences_id") REFERENCES "notification_preferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
