-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_notification_preferences_id_fkey";

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_notification_preferences_id_fkey" FOREIGN KEY ("notification_preferences_id") REFERENCES "notification_preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
