-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('Active', 'Inactive', 'Banned', 'Suspended', 'Deleted');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Refunded');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'Refunded', 'Partially_Refunded', 'Failed');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'UPI', 'Net_Banking', 'Credit_Card', 'Debit_Card', 'Wallet', 'EMI', 'Gift_Card');

-- CreateEnum
CREATE TYPE "ShippingCarrier" AS ENUM ('FedEx', 'UPS', 'USPS', 'DHL', 'BlueDart', 'Delhivery', 'Custom', 'Porter', 'Other');

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cognito_id" TEXT NOT NULL,
    "phone" TEXT,
    "is_guest" BOOLEAN NOT NULL DEFAULT false,
    "status" "CustomerStatus" NOT NULL DEFAULT 'Active',
    "last_login" TIMESTAMP(3),
    "total_spent" DECIMAL(65,30) DEFAULT 0,
    "order_count" INTEGER DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "recipient_name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "is_default" BOOLEAN DEFAULT false,
    "type" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "total_amount" DECIMAL(65,30) NOT NULL,
    "shipping_address" JSONB NOT NULL,
    "billing_address" JSONB,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "payment_method" "PaymentMethod" NOT NULL,
    "shipping_cost" DECIMAL(65,30) NOT NULL,
    "tax_amount" DECIMAL(65,30) NOT NULL,
    "discount_amount" DECIMAL(65,30),
    "tracking_number" TEXT,
    "carrier" "ShippingCarrier",
    "notes" TEXT,
    "estimated_delivery" TIMESTAMP(3),
    "coupon_code" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_at_purchase" DECIMAL(65,30) NOT NULL,
    "variant_sku" TEXT NOT NULL,
    "variant_attributes" JSONB NOT NULL,
    "refunded_quantity" INTEGER,
    "refund_amount" DECIMAL(65,30),

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_cognito_id_key" ON "customers"("cognito_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
