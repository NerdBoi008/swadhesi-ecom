-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_attribute_id_fkey";

-- AddForeignKey
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
