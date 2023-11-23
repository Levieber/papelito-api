-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
