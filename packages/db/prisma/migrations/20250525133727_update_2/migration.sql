-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_product_id_fkey";

-- AddForeignKey
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
